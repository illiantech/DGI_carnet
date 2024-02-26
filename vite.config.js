import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			includeAssets: ['favicon.ico', 'favicon-16x16.png', 'favicon-32x32.png', 'apple-touch-icon.png'],
			manifest: {
				display: 'standalone',
				display_override: ['window-controls-overlay'],
				lang: 'es',
				name: 'DGI Carnets',
				short_name: 'Carnets',
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
	test: {
		environment: 'happy-dom'
	},
	base: './'
});
