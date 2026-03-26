import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Reuse the repo's existing HTML implementation (no TS/JS rewrite).
// This exposes `HTML/js` at `/js` and `HTML/assets` at `/assets`.
export default defineConfig({
  plugins: [react()],
  publicDir: path.resolve(__dirname, '../HTML'),
  server: {
    fs: {
      allow: [path.resolve(__dirname, '..')],
    },
  },
})
