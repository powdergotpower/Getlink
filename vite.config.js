// Force Rollup/Vite to use JS-only builds to avoid Termux native binding errors
process.env.ROLLUP_PURE_JS = '1';

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // Use '@' to import from src
    }
  },
  server: {
    host: true, // So you can access the dev server on your LAN
    port: 5173  // Default Vite port
  },
  build: {
    outDir: 'dist', // Output folder for production build
    sourcemap: false // Optional: disable sourcemaps for smaller builds
  }
})
