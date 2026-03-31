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
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Group heavy UI & Analytics together as they are often used together in Admin
            if (id.includes('chart.js') || id.includes('react-chartjs-2')) {
              return 'vendor-analytics';
            }
            // Keep core framework in its own chunk to avoid circularity with other vendors
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-core';
            }
            // Everything else can be handled by Vite's automatic chunking or group minor ones
            // Removing lucide-react and socket-io from manual chunks to avoid circularity blowing up their exports
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: true,
  },
})