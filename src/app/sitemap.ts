import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	return [
		{
			url: "https://bnm.st",
			lastModified: now,
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: "https://bnm.st/contact",
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: "https://bnm.st/resume",
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.7,
		},
	];
}
