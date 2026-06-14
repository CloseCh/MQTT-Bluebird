import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  main: {
    build: {
      outDir: 'dist-electron',
      minify: true,
      sourcemap: false,
      rollupOptions: {
        external: (id) => {
          return (
            id === 'electron' ||
            id === 'bufferutil' ||
            id === 'utf-8-validate'
          );
        }
      },
      lib: {
        entry: 'src/electron/main.ts'
      }
    }
  },

  preload: {
    build: {
      outDir: 'dist-preload',
      minify: true,
      sourcemap: false,
      rollupOptions: {
        external: ['electron'], 
        output: {
          format: 'cjs',
          entryFileNames: 'preload.js'
        }
      },
      lib: {
        entry: 'src/electron/preload/preload.js'
      }
    }
  },

  renderer: {
    base: './',
    root: '.',
    plugins: [react()],

    server: {
      port: 5123,
      strictPort: true,
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/ui'),
        '@features': path.resolve(__dirname, './src/ui/features'),
        '@pages': path.resolve(__dirname, './src/ui/pages'),
        '@layout': path.resolve(__dirname, './src/ui/layout'),
        '@shared': path.resolve(__dirname, './src/ui/shared'),
        '@stores': path.resolve(__dirname, './src/ui/stores'),
        '@transport': path.resolve(__dirname, './src/ui/transport'),
        '@assets': path.resolve(__dirname, './src/ui/assets'),
      }
    },
    
    build: {
      outDir: 'dist-react',
      chunkSizeWarningLimit: 500,
      minify: true,
      sourcemap: false,
      reportCompressedSize: false,
      rollupOptions: {
        input: path.resolve(__dirname, 'index.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'vendor-react';
              }
              if (id.includes('@mui/icons-material')) {
                return 'vendor-mui-icons';
              }
              if (id.includes('@mui/x-data-grid')) {
                return 'vendor-mui-datagrid';
              }
              if (id.includes('@mui/material') || id.includes('@emotion')) {
                return 'vendor-mui';
              }
              if (id.includes('recharts')) {
                return 'vendor-charts';
              }
              if (id.includes('mqtt')) {
                return 'vendor-mqtt';
              }
              if (id.includes('react-hook-form')) {
                return 'vendor-forms';
              }
              return 'vendor-misc';
            }
          }
        }
      }
    }
  }
})