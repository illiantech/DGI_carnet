import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'favicon-16x16.png', 'favicon-32x32.png', 'apple-touch-icon.png'],
      manifest: {
        display: 'fullscreen',
        display_override: ['window-controls-overlay'],
        lang: 'es-ES',
        name: 'DGI Carnets',
        short_name: 'DGI Carnets',
        description: 'Registro de ususarios con o sin carnets',
        theme_color: '#262626',
        background_color: '#4d4d4d',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],

  build: {
    sourcemap: true
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      all: true,
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/'],
      include: ['src/**/*.jsx', 'src/**/*.js']
    }
  },
  base: '/DGI_carnet/'
});
