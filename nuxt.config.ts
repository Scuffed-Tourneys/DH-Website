import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	build: {
		postcss: {
			postcssOptions: require('./postcss.config'),
		},
	},
	css: ['@/assets/css/tailwind.css'],
});
