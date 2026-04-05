import { execSync } from 'node:child_process'

const PATTERNS = [
  'DeprecationWarning',
  'is deprecated',
  'will be removed',
  'has been deprecated',
]

let output = ''
try {
  output = execSync('bun run build 2>&1', { encoding: 'utf-8' })
} catch (err) {
  const e = err as { stdout?: string; stderr?: string }
  output = (e.stdout ?? '') + (e.stderr ?? '')
  console.error('❌ Build failed during deprecation scan')
  console.error(output)
  process.exit(1)
}

const hits = PATTERNS.flatMap((pattern) =>
  output
    .split('\n')
    .filter((line) => line.toLowerCase().includes(pattern.toLowerCase()))
)

if (hits.length > 0) {
  console.error('❌ Deprecation warnings found in build output:')
  hits.forEach((hit) => console.error('  ' + hit))
  process.exit(1)
}

console.log('✅ No deprecation warnings in build output.')
