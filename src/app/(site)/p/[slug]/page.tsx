import { Wrapper } from "@/components/layout";
import { ScrambleText } from "@/components/scramble-text";
import { getNextProject, getProjectBySlug, getProjects } from "@/data";
import type { Metadata, NextPage } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectBlocks } from "./blocks";
import { NextProjectCta } from "./next-project-cta";
import { ProjectHero } from "./project-hero";

interface IProjectPageProps {
	params: Promise<{ slug: string }>;
}

export const generateStaticParams = async () => {
	const projects = await getProjects();
	return projects.map((project) => ({ slug: project.slug }));
};

export const generateMetadata = async ({ params }: IProjectPageProps): Promise<Metadata> => {
	const { slug } = await params;
	const project = await getProjectBySlug(slug);

	if (!project) return {};

	const ogImage =
		project.image && typeof project.image === "object" && project.image.url
			? { url: project.image.url, width: 1200, height: 630, alt: `${project.name} — Benjamin Wagner` }
			: { url: "/og.jpg", width: 1200, height: 630, alt: `${project.name} — Benjamin Wagner` };

	return {
		title: project.name,
		description: `${project.name} — ${project.type} project by Benjamin Wagner (${project.year})`,
		alternates: { canonical: `https://bnm.st/p/${slug}` },
		openGraph: {
			url: `https://bnm.st/p/${slug}`,
			title: `${project.name} — Benjamin Wagner`,
			description: `${project.name} — ${project.type} project by Benjamin Wagner (${project.year})`,
			images: [ogImage],
		},
	};
};

const ProjectPage: NextPage<IProjectPageProps> = async ({ params }) => {
	const { slug } = await params;
	const project = await getProjectBySlug(slug);

	if (!project) notFound();

	const nextProject = await getNextProject(slug);

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		name: project.name,
		url: `https://bnm.st/p/${slug}`,
		author: { "@type": "Person", name: "Benjamin Wagner", url: "https://bnm.st" },
		dateCreated: project.year,
		description: `${project.name} — ${project.type} project by Benjamin Wagner (${project.year})`,
		...(project.image && typeof project.image === "object" && project.image.url
			? { image: project.image.url }
			: {}),
	};

	return (
		<Wrapper>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
			<article id="main-content" className="relative min-h-svh">
				<ProjectHero project={project} />
				<section className="layout-grid py-12">
					<div className="col-span-2 text-caption md:col-start-4">
						<Link
							href={project.url}
							className="group relative overflow-hidden bg-foreground px-2 py-0.5 font-medium text-[clamp(.625rem,.5vw,.75rem)] uppercase leading-none"
						>
							<span className="absolute inset-0 origin-right scale-x-0 bg-background transition-transform duration-short ease-default group-hover:origin-left group-hover:scale-x-100" />
							<ScrambleText className="text-background transition-colors duration-short ease-default group-hover:text-foreground">
								Visit Live
							</ScrambleText>
						</Link>
					</div>
					<div className="col-span-full col-start-6 space-y-2 text-caption md:col-span-4">
						{project.year && (
							<div className="flex items-center gap-x-2 text-caption">
								<p className="bg-foreground px-1 py-px text-background" aria-label="Year">
									YEAR
								</p>
								<p>{project.year}</p>
							</div>
						)}
						{project.awards?.length ? (
							<div className="flex items-center gap-x-2 text-caption">
								<p className="bg-foreground px-1 py-px text-background" aria-label="Awards">
									AWARDS
								</p>
								<p>{project.awards.join(", ")}</p>
							</div>
						) : null}
						{project.services?.length ? (
							<div className="flex items-center gap-x-2 text-caption">
								<p className="bg-foreground px-1 py-px text-background" aria-label="Services">
									SERVICES
								</p>
								<p>{project.services.join(", ")}</p>
							</div>
						) : null}
					</div>
				</section>
				{project.layout && project.layout.length > 0 && <ProjectBlocks blocks={project.layout} className="py-24" />}
				{nextProject && <NextProjectCta project={nextProject} />}
			</article>
		</Wrapper>
	);
};

export default ProjectPage;
