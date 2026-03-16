import { getProjects } from "@/data";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const now = new Date();
	const projects = await getProjects();

	const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
		url: `https://bnm.st/p/${project.slug}`,
		lastModified: now,
		changeFrequency: "monthly",
		priority: 0.8,
	}));

	return [
		{
			url: "https://bnm.st",
			lastModified: now,
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: "https://bnm.st/info",
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.9,
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
		...projectEntries,
	];
}
