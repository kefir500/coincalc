import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
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
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'CoinCalc',
        short_name: 'CoinCalc',
        description: 'Calculate coin stack height, weight, and more',
        theme_color: '#f4eab4',
        background_color: '#f7f7f0',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
