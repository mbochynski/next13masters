/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
	},
	async redirects() {
		return [
			{
				source: "/categories/:slug",
				destination: "/categories/:slug/1",
				permanent: false,
			},
			{
				source: "/collections/:slug",
				destination: "/collections/:slug/1",
				permanent: false,
			},
		];
	},
};

module.exports = nextConfig;
