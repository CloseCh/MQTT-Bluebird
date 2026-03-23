import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'

export default defineConfig({
  plugins: [
    react(),
    electron([
      {
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
              ],
              output: {
                format: 'cjs'
              }
            }
          }
        }
      },
      {
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
    minify: true,
    sourcemap: false,
    reportCompressedSize: false,
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