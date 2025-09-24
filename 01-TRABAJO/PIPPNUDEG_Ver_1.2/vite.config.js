import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/inicio.html'),
        index: resolve(__dirname, 'src/index.html'),
        ofertas: resolve(__dirname, 'src/ofertas.html'),
        entidades: resolve(__dirname, 'src/entidades.html'),
        requisitos: resolve(__dirname, 'src/requisitos.html'),
        formacion: resolve(__dirname, 'src/formacion.html')
      }
    },
    minify: 'terser',
    sourcemap: true,
    cssMinify: true,
    reportCompressedSize: true
  },
  server: {
    port: 3000,
    open: '/inicio.html'
  },
  optimizeDeps: {
    include: []
  },
  css: {
    devSourcemap: true
  }
});