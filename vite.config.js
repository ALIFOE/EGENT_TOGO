import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/EGENT_TOGO/',
  plugins: [vue()],
  build: {
    minify: 'terser',
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
})
