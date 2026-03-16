import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		formats: ["image/avif", "image/webp"],
		qualities: [75],
		minimumCacheTTL: 60 * 60 * 24 * 30,
		remotePatterns: [
			{ hostname: "localhost" },
			{ hostname: "**.vercel.app" },
			{ hostname: "bnm.st" },
		],
	},
	async rewrites() {
		return [
			{
				source: "/api/c15t/:path*",
				destination: `${process.env.NEXT_PUBLIC_C15T_URL}/:path*`,
			},
		];
	},
};

export default withPayload(nextConfig);
