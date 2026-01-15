import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/tests/',
        '**/*.spec.ts',
        '**/*.test.ts',
        '**/*.spec.tsx',
        '**/*.test.tsx',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@api': path.resolve(__dirname, './src/api/'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@config': path.resolve(__dirname, './src/config/'),
      '@hooks': path.resolve(__dirname, './src/hooks/'),
      '@utils': path.resolve(__dirname, './src/utils/'),
      '@assets': path.resolve(__dirname, './src/assets/'),
    },
  },
})
