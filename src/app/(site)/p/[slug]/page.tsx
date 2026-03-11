import { Media, Wrapper } from "@/components/layout";
import { ScrambleText } from "@/components/scramble-text";
import { getNextProject, getProjectBySlug, getProjects } from "@/data";
import type { Metadata, NextPage } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectBlocks } from "./blocks";

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

	return {
		title: project.name,
		description: `${project.name} — ${project.type} project by Benjamin Wagner (${project.year})`,
		alternates: { canonical: `https://bnm.st/p/${slug}` },
		openGraph: {
			url: `https://bnm.st/p/${slug}`,
			title: `${project.name} — Benjamin Wagner`,
			description: `${project.name} — ${project.type} project by Benjamin Wagner (${project.year})`,
		},
	};
};

const ProjectPage: NextPage<IProjectPageProps> = async ({ params }) => {
	const { slug } = await params;
	const project = await getProjectBySlug(slug);

	if (!project) notFound();

	const nextProject = await getNextProject(slug);

	return (
		<Wrapper>
			{/* bg-[#CE0F08] */}
			<article id="main-content" className="relative min-h-svh">
				<section className="relative h-svh p-4">
					{project.image && (
						<div className="absolute inset-2">
							<Media resource={project.image} className="h-full w-full" imgClassName="h-full w-full object-cover" priority />
						</div>
					)}
					<div className="layout-grid relative z-10 mx-0 h-full text-background mix-blend-difference">
						<div className="col-span-6 self-end">
							<h1 className="text-[clamp(2em,5vw,5.5em)] uppercase leading-[.85] tracking-[-0.04em]">{project.name}</h1>
						</div>
					</div>
				</section>
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
				{nextProject && (
					<Link href={`/p/${nextProject.slug}`} className="relative block h-svh p-4">
						{nextProject.image && (
							<div className="absolute inset-2">
								<Media
									resource={nextProject.image}
									className="h-full w-full"
									imgClassName="h-full w-full object-cover"
								/>
							</div>
						)}
						<div className="layout-grid relative z-10 mx-0 h-full text-background mix-blend-difference">
							<div className="col-span-6 self-end">
								<p className="text-[clamp(2em,5vw,5.5em)] uppercase leading-[.85] tracking-[-0.04em]">{nextProject.name}</p>
							</div>
						</div>
					</Link>
				)}
			</article>
		</Wrapper>
	);
};

export default ProjectPage;
