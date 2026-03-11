import { Info } from "@/components/layout/info";
import { getProjects } from "@/data/get-projects";
import { IndexPageClient } from "@/app/(site)/[...slug]/page.client";

export const metadata = {
	title: "Info — Benjamin Wagner",
};

export default async function InfoPage() {
	const projects = await getProjects();

	return (
		<>
			<IndexPageClient projects={projects} />
			<Info />
		</>
	);
}
