import { defineConfig } from 'vite';
import { viteConvertPugInHtml } from './plugins/viteConvertPugInHtml.ts';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons-ng';
import { resolve, basename, extname } from 'path';
import { glob } from 'glob';
import { normalizePath } from 'vite';

export default defineConfig({
  root: 'src',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@components': resolve(__dirname, 'src/components'),
      '@scripts': resolve(__dirname, 'src/scripts')
    }
  },
  plugins: [
    viteConvertPugInHtml({
      defaultPage: 'home'
    }),
    createSvgIconsPlugin({
      iconDirs: [
        resolve(__dirname, 'src/assets/icons')
      ],
      symbolId: 'icon-[name]',
      inject: 'body-last'
    })
  ],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        styles: resolve(__dirname, 'src/main.scss'),
        ...Object.fromEntries(
          glob.sync('src/pages/**/*.+(js|ts)').map((file) => {
            const extension = extname(file);
            const filename = basename(file, extension);
            return [
              filename + '.bundle.js',
              normalizePath(resolve(__dirname, file))
            ];
          })
        )
      },
      output: {
        chunkFileNames: 'js/[name]-[hash].chunk.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.names.every((name) => name.endsWith('.css'))) {
            return 'css/[name].min[extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        entryFileNames: (chunkInfo) => {
          console.log(chunkInfo.name);
          if (chunkInfo.name.endsWith('.js')) {
            return 'js/[name]';
          }
          return '[name].js';
        }
      }
    }
  }
});