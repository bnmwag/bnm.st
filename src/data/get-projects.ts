import config from "@/payload.config";
import { unstable_cache as cache } from "next/cache";
import { getPayload } from "payload";

export const getProjects = cache(
	async () => {
		const payload = await getPayload({ config });

		const { docs } = await payload.find({
			collection: "projects",
			where: { active: { equals: true } },
			sort: "-year",
		});

		return docs;
	},
	["projects"],
	{ tags: ["projects"] },
);

export const getProjectBySlug = (slug: string) =>
	cache(
		async () => {
			const payload = await getPayload({ config });

			const { docs } = await payload.find({
				collection: "projects",
				where: {
					slug: { equals: slug },
					active: { equals: true },
				},
				limit: 1,
			});

			return docs[0] ?? null;
		},
		[`project-by-slug-${slug}`],
		{ tags: ["projects", `project:${slug}`] },
	)();

export const getNextProject = (currentSlug: string) =>
	cache(
		async () => {
			const projects = await getProjects();
			const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
			if (currentIndex === -1) return projects[0] ?? null;

			return projects[(currentIndex + 1) % projects.length];
		},
		[`next-project-${currentSlug}`],
		{ tags: ["projects"] },
	)();
