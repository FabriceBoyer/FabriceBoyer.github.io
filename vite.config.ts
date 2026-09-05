import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// User site (fabriceboyer.github.io) -> served from the domain root.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
          i18n: ['i18next', 'react-i18next'],
        },
      },
    },
  },
})
