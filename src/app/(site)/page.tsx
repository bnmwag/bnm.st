import type { Metadata, NextPage } from "next";

import { Wrapper } from "@/components/layout/wrapper";
import { getProjects } from "@/data";
import { IndexPageClient } from "./page.client";

export const metadata: Metadata = {
	title: "Benjamin Wagner :: Frontend Developer",
	description: "Frontend developer based in Linz, Austria",
	openGraph: {
		url: "https://bnm.st/",
		title: "Benjamin Wagner :: Frontend Developer",
		description: "Young Frontend Developer living in Linz, Austria.",
		images: [
			{
				url: "https://bnm.st/og.jpg",
				width: 800,
				height: 600,
				alt: "Benjamin Wagner :: Frontend Developer",
				type: "image/jpeg",
			},
		],
	},
};

const IndexPage: NextPage = async () => {
	const projects = await getProjects();

	return (
		<Wrapper>
			<IndexPageClient projects={projects} />
		</Wrapper>
	);
};

export default IndexPage;
