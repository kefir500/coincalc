import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';
import faviconPlugin from './plugins/favicon';

// https://vite.dev/config/
export default defineConfig({
  base: '/coincalc/',
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    faviconPlugin('src/assets/logo.svg', {
      appName: 'CoinCalc',
      appDescription: undefined,
      path: '/coincalc/',
      background: '#f4eab4',
      theme_color: '#f4eab4',
      icons: {
        android: [
          'android-chrome-192x192.png',
          'android-chrome-512x512.png',
        ],
        appleIcon: [
          // @ts-expect-error https://github.com/itgalaxy/favicons/issues/434
          {
            name: 'apple-touch-icon-180x180.png',
            offset: 16,
          },
        ],
        appleStartup: false,
        favicons: true,
        windows: false,
        yandex: false,
      },
      dir: undefined,
      lang: undefined,
      orientation: undefined,
      start_url: undefined,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
