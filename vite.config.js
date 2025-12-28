import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/EGENT_TOGO/',
  plugins: [vue()],
  build: {
    // Configuration pour build optimisé
    minify: 'terser',
  },
})
