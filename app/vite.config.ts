import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'

export default defineConfig({
  plugins: [
    react(),
    electron([
      {
        // Main process
        entry: 'src/electron/main.ts',
        vite: {
          build: {
            outDir: 'dist-electron',
            rollupOptions: {
              external: ['electron', 'bufferutil', 'utf-8-validate']
            }
          }
        }
      },
      {
        // Preload — se copia tal cual
        entry: 'src/preload/preload.js',
        onstart(options) {
          options.reload()
        },
        vite: {
          build: {
            outDir: 'dist-preload',
            rollupOptions: {
              external: ['electron']
            }
          }
        }
      }
    ])
  ],
  base: './',
  build: {
    outDir: 'dist-react',
  },
  server: {
    port: 5123,
    strictPort: true,
  },
});