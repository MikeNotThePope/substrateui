import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/unit/setup.ts'],
    globals: true,
    css: true,
    include: ['tests/unit/**/*.test.{ts,tsx}'],
    // Node's own localStorage/sessionStorage globals throw without --localstorage-file
    // and shadow jsdom's (vitest skips window keys that already exist on globalThis).
    execArgv: ['--no-experimental-webstorage'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
