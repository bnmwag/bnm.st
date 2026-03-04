import type { Metadata, NextPage } from "next";

import { Info } from "@/components/layout/info";
import { getProjects } from "@/data";
import { IndexPageClient } from "./page.client";

export const metadata: Metadata = {
	title: "Benjamin Wagner — Freelance Frontend Developer",
	description:
		"Freelance frontend & creative developer based in Austria. I build design-driven React & Next.js interfaces, WebGL experiences, and polished digital products for clients worldwide.",
	alternates: { canonical: "https://bnm.st" },
	openGraph: {
		url: "https://bnm.st",
		title: "Benjamin Wagner — Freelance Frontend Developer",
		description:
			"Freelance frontend & creative developer based in Austria. I build design-driven React & Next.js interfaces, WebGL experiences, and polished digital products for clients worldwide.",
	},
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Benjamin Wagner",
	url: "https://bnm.st",
	image: "https://bnm.st/og.jpg",
	jobTitle: "Freelance Frontend Developer",
	description:
		"Freelance frontend & creative developer based in Austria, building design-driven React & Next.js interfaces, WebGL experiences, and interactive digital products worldwide.",
	email: "hello@bnm.st",
	sameAs: ["https://github.com/bnmwag", "https://www.linkedin.com/in/benjamin-wagner-a102a0272/"],
	address: { "@type": "PostalAddress", addressCountry: "AT" },
	knowsAbout: ["React", "Next.js", "TypeScript", "WebGL", "Three.js", "GSAP", "UI Engineering", "Creative Development", "Figma"],
	hasOccupation: {
		"@type": "Occupation",
		name: "Frontend Developer",
		occupationLocation: { "@type": "Country", name: "Austria" },
		skills: "React, Next.js, TypeScript, WebGL, Three.js, GSAP, Tailwind CSS",
	},
};

const IndexPage: NextPage = async () => {
	const projects = await getProjects();

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<IndexPageClient projects={projects} />
			<Info />
		</>
	);
};

export default IndexPage;
