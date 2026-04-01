import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        // Removing manualChunks to prevent circular dependency issues in React 19 production builds
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: true,
  },
})