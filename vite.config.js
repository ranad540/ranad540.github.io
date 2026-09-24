import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Relative base so the built site works both at username.github.io/
  // and at username.github.io/repo-name/ without any config change.
  base: './',

  build: {
    // The hero's three.js chunk is ~530 kB raw / ~130 kB gzipped. It is loaded
    // lazily and never blocks first paint, so the default 500 kB warning is
    // noise here rather than a problem to fix.
    chunkSizeWarningLimit: 700,
  },
})
