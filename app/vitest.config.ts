import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}'],
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
    },
  },
})