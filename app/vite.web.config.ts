import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/',
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/ui'),
    },
  },

  build: {
    outDir: 'dist-web',
    chunkSizeWarningLimit: 500,
    minify: true,
    sourcemap: false,
    reportCompressedSize: false,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) return 'vendor-react';
            if (id.includes('@mui/icons-material'))                                               return 'vendor-mui-icons';
            if (id.includes('@mui/x-data-grid'))                                                  return 'vendor-mui-datagrid';
            if (id.includes('@mui/material') || id.includes('@emotion'))                          return 'vendor-mui';
            if (id.includes('recharts'))                                                           return 'vendor-charts';
            if (id.includes('mqtt'))                                                               return 'vendor-mqtt';
            if (id.includes('react-hook-form'))                                                    return 'vendor-forms';
            return 'vendor-misc';
          }
        },
      },
    },
  },
});
