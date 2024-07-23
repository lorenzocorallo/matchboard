import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.PUBLIC_URL || "/",
  build: { outDir: "./dist" },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
