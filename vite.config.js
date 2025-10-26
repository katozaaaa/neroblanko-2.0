import { defineConfig } from 'vite';
import { viteConvertPugInHtml } from './plugins/viteConvertPugInHtml.js';
import { resolve, basename, extname } from 'path';
import { glob } from 'glob';
import { normalizePath, } from 'vite';

export default defineConfig({
  root: 'src',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@components': resolve(__dirname, 'src/components'),
      '@scripts': resolve(__dirname, 'src/scripts'),
    },
  },
  plugins: [
    viteConvertPugInHtml()
  ],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        styles: resolve(__dirname, 'src/main.scss'),
        ...Object.fromEntries(
          glob.sync('src/pages/**/*.js').map((file) => {
            const extension = extname(file);
            const filename = basename(file, extension);
            return [
              filename + '.bundle' + extension,
              normalizePath(resolve(__dirname, file)),
            ]
          })
        )
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.names.every((name) => name.endsWith('.css'))) {
            return 'css/[name].min[extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name.endsWith('.js')) {
            return 'js/[name]';
          }
          return '[name].js';
        }
      }
    }
  }
});