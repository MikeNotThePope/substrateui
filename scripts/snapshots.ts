import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3"
import { readFileSync, mkdirSync, writeFileSync } from "node:fs"
import { basename, dirname, join, relative } from "node:path"
import { Glob } from "bun"

// ─── Config ──────────────────────────────────────────────────────────

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY
const BUCKET = process.env.R2_BUCKET ?? "substrateui-snapshots"
const PREFIX = "baselines/main/"

const VISUAL_DIR = join(process.cwd(), "tests/visual")

function requireEnv() {
  if (!ACCOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
    console.error(
      "Missing R2 credentials. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY.",
    )
    process.exit(1)
  }
}

function createClient(): S3Client {
  return new S3Client({
    region: "auto",
    endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: ACCESS_KEY_ID!,
      secretAccessKey: SECRET_ACCESS_KEY!,
    },
  })
}

// ─── List all keys under the prefix ──────────────────────────────────

async function listAllKeys(client: S3Client): Promise<string[]> {
  const keys: string[] = []
  let continuationToken: string | undefined

  do {
    const resp = await client.send(
      new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: PREFIX,
        ContinuationToken: continuationToken,
      }),
    )
    for (const obj of resp.Contents ?? []) {
      if (obj.Key) keys.push(obj.Key)
    }
    continuationToken = resp.IsTruncated
      ? resp.NextContinuationToken
      : undefined
  } while (continuationToken)

  return keys
}

// ─── Download ────────────────────────────────────────────────────────

async function download() {
  requireEnv()
  const client = createClient()
  const keys = await listAllKeys(client)

  if (keys.length === 0) {
    console.log("No baselines found in R2.")
    return
  }

  console.log(`Downloading ${keys.length} snapshots from R2...`)

  const CONCURRENCY = 20
  let completed = 0

  for (let i = 0; i < keys.length; i += CONCURRENCY) {
    const batch = keys.slice(i, i + CONCURRENCY)
    await Promise.all(
      batch.map(async (key) => {
        const relativePath = key.slice(PREFIX.length)
        const localPath = join(VISUAL_DIR, relativePath)
        mkdirSync(dirname(localPath), { recursive: true })

        const resp = await client.send(
          new GetObjectCommand({ Bucket: BUCKET, Key: key }),
        )
        const bytes = await resp.Body!.transformToByteArray()
        writeFileSync(localPath, bytes)
        completed++
      }),
    )
  }

  console.log(`Downloaded ${completed} snapshots.`)
}

// ─── Upload ──────────────────────────────────────────────────────────

async function upload() {
  requireEnv()
  const client = createClient()

  // Collect local snapshot files
  const glob = new Glob("**/*-snapshots/*.png")
  const localFiles: string[] = []
  for await (const path of glob.scan({ cwd: VISUAL_DIR })) {
    localFiles.push(path)
  }

  if (localFiles.length === 0) {
    console.error("No snapshot files found under tests/visual/.")
    process.exit(1)
  }

  console.log(`Uploading ${localFiles.length} snapshots to R2...`)

  const CONCURRENCY = 20
  const uploadedKeys = new Set<string>()
  let completed = 0

  for (let i = 0; i < localFiles.length; i += CONCURRENCY) {
    const batch = localFiles.slice(i, i + CONCURRENCY)
    await Promise.all(
      batch.map(async (filePath) => {
        const key = PREFIX + filePath
        const fullPath = join(VISUAL_DIR, filePath)
        const body = readFileSync(fullPath)

        await client.send(
          new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: body,
            ContentType: "image/png",
          }),
        )
        uploadedKeys.add(key)
        completed++
      }),
    )
  }

  console.log(`Uploaded ${completed} snapshots.`)

  // Delete stale keys that no longer exist locally
  const existingKeys = await listAllKeys(client)
  const staleKeys = existingKeys.filter((k) => !uploadedKeys.has(k))

  if (staleKeys.length > 0) {
    console.log(`Deleting ${staleKeys.length} stale snapshots from R2...`)
    // DeleteObjects accepts max 1000 keys per request
    for (let i = 0; i < staleKeys.length; i += 1000) {
      const batch = staleKeys.slice(i, i + 1000)
      await client.send(
        new DeleteObjectsCommand({
          Bucket: BUCKET,
          Delete: { Objects: batch.map((Key) => ({ Key })) },
        }),
      )
    }
    console.log(`Deleted ${staleKeys.length} stale snapshots.`)
  }
}

// ─── CLI ─────────────────────────────────────────────────────────────

const command = process.argv[2]

switch (command) {
  case "download":
    await download()
    break
  case "upload":
    await upload()
    break
  default:
    console.error("Usage: bun scripts/snapshots.ts <download|upload>")
    process.exit(1)
}
