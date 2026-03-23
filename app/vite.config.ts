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
            minify: true,
            sourcemap: false,
            rollupOptions: {
              external: [
                'electron', 
                'bufferutil', 
                'utf-8-validate',
                'mqtt',
                'os-utils',
                'dotenv',
              ],
              output: {
                format: 'cjs'
              }
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
            minify: true,
            rollupOptions: {
              external: ['electron'],
              output: {
                format: 'cjs'
              }
            }
          }
        }
      }
    ])
  ],
  base: './',


  build: {
    outDir: 'dist-react',
    minify: true,              // Oxc — rápido y eficiente
    sourcemap: false,
    reportCompressedSize: false, // acelera el build (no calcula gzip al final)
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router'],
          'vendor-mui':   ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          'vendor-charts': ['recharts'],
        }
      }
    },
    chunkSizeWarningLimit: 800,
  },

  server: {
    port: 5123,
    strictPort: true,
  },
})