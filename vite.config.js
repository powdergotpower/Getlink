import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // Use '@' to refer to the 'src' folder
    }
  },
  server: {
    host: true, // So you can access the dev server on your local network
    port: 5173  // Default Vite port
  },
  build: {
    outDir: 'dist', // Output folder for production build
    sourcemap: false // Optional: disable sourcemaps for smaller build
  }
})
