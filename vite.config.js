import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'

// Plugin pour copier 404.html dans dist/
const copy404Plugin = {
  name: 'copy-404',
  apply: 'build',
  generateBundle() {
    const source = path.resolve(__dirname, '404.html')
    const dest = path.resolve(__dirname, 'dist', '404.html')
    const content = fs.readFileSync(source, 'utf-8')
    this.emitFile({
      type: 'asset',
      fileName: '404.html',
      source: content
    })
  }
}

// Plugin pour injecter le serveur de prerendering en variable globale
const injectPrerenderServerPlugin = {
  name: 'inject-prerender-server',
  config(config, env) {
    return {
      define: {
        __PRERENDER_SERVER__: JSON.stringify(process.env.VITE_PRERENDER_SERVER || ''),
        __ENVIRONMENT__: JSON.stringify(process.env.VITE_ENVIRONMENT || 'development'),
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/EGENT_TOGO/',
  plugins: [vue(), copy404Plugin, injectPrerenderServerPlugin],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: 'terser',
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
})
