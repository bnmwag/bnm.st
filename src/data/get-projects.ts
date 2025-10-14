import config from "@/payload.config";
import { unstable_cache as cache } from "next/cache";
import { getPayload } from "payload";

export const getProjects = cache(
	async () => {
		const payload = await getPayload({ config });

		const { docs } = await payload.find({
			collection: "projects",
			sort: "-year",
		});

		return docs;
	},
	["projects"],
	{ tags: ["projects"] },
);
