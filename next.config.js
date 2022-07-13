/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
	images: { domains: ['files.catbox.moe', 'cdn.discordapp.com', 'dailies.tk'] },
	/*async headers() {
		return [
			{
				source: '/',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
					{
						key: 'Access-Control-Allow-Origin',
						value: '*',
					},
				],
			},
		];
	},*/
};

module.exports = nextConfig;
