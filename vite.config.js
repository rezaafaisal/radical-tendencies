import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
  //   resolve: {
  //   alias: {
  //     process: "process/browser",
  //     stream: "stream-browserify",
  //     zlib: "browserify-zlib",
  //     util: 'util',
  //     path: 'path-browserify',
  //   //   child_process:'process/browser'
  //   }
  // },
    optimizeDeps: {
        exclude: ['js-big-decimal']
    },
    
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
    ],
});
