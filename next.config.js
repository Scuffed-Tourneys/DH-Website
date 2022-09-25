/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
	images: {
		domains: ['files.catbox.moe', 'de.catbox.moe', 'cdn.discordapp.com', 'api.dailies.tk'],
	},
};

module.exports = nextConfig;
