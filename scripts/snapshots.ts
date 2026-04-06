import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3"
import { readFileSync, mkdirSync, writeFileSync, unlinkSync } from "node:fs"
import { dirname, join } from "node:path"
import { Glob } from "bun"
import { execSync } from "node:child_process"

// ─── Config ──────────────────────────────────────────────────────────

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY
const BUCKET = process.env.R2_BUCKET ?? "substrateui-snapshots"
const ARCHIVE_KEY = "baselines/main/snapshots.tar.gz"

const VISUAL_DIR = join(process.cwd(), "tests/visual")
const ARCHIVE_PATH = join(VISUAL_DIR, "snapshots.tar.gz")

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
    forcePathStyle: true,
    credentials: {
      accessKeyId: ACCESS_KEY_ID!,
      secretAccessKey: SECRET_ACCESS_KEY!,
    },
  })
}

// ─── Download ────────────────────────────────────────────────────────

async function download() {
  requireEnv()
  const client = createClient()

  console.log("Downloading snapshot archive from R2...")

  const resp = await client.send(
    new GetObjectCommand({ Bucket: BUCKET, Key: ARCHIVE_KEY }),
  )

  if (!resp.Body) {
    console.log("No baseline archive found in R2.")
    return
  }

  const bytes = await resp.Body.transformToByteArray()
  mkdirSync(VISUAL_DIR, { recursive: true })
  writeFileSync(ARCHIVE_PATH, bytes)

  execSync(`tar xzf ${ARCHIVE_PATH}`, { cwd: VISUAL_DIR })
  unlinkSync(ARCHIVE_PATH)

  console.log("Snapshots extracted.")
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

  console.log(`Packing ${localFiles.length} snapshots into archive...`)

  mkdirSync(dirname(ARCHIVE_PATH), { recursive: true })
  execSync(
    `tar czf ${ARCHIVE_PATH} ${localFiles.map((f) => `'${f}'`).join(" ")}`,
    { cwd: VISUAL_DIR },
  )

  const body = readFileSync(ARCHIVE_PATH)
  console.log(
    `Uploading archive (${(body.length / 1024 / 1024).toFixed(1)} MB) to R2...`,
  )

  await client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: ARCHIVE_KEY,
      Body: body,
      ContentType: "application/gzip",
    }),
  )

  unlinkSync(ARCHIVE_PATH)
  console.log("Upload complete.")
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
