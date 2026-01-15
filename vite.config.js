import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isProd = mode === 'production'

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@api': path.resolve(__dirname, './src/api'),
        '@components': path.resolve(__dirname, './src/components'),
        '@config': path.resolve(__dirname, './src/config'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@assets': path.resolve(__dirname, './src/assets'),
      },
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isProd,
          drop_debugger: isProd,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-ui': ['react-bootstrap', 'bootstrap'],
            'vendor-forms': ['react-hook-form'],
            'vendor-utils': ['axios', 'date-fns', 'jwt-decode'],
            'vendor-toast': ['react-hot-toast'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      reportCompressedSize: false,
    },
    server: {
      port: 5173,
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api/, ''),
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'axios', 'react-hot-toast'],
    },
  }
})
