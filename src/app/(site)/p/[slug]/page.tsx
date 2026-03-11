import { Media, Wrapper } from "@/components/layout";
import { getProjectBySlug, getProjects } from "@/data";
import type { Metadata, NextPage } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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

const AWARD_LABELS: Record<string, string> = {
	hr: "Honorable Mention",
	sotd: "Site of the Day",
	sotm: "Site of the Month",
	soty: "Site of the Year",
};

const SERVICE_LABELS: Record<string, string> = {
	dev: "Development",
	design: "Design",
	infra: "Infrastructure",
};

const ProjectPage: NextPage<IProjectPageProps> = async ({ params }) => {
	const { slug } = await params;
	const project = await getProjectBySlug(slug);

	if (!project) notFound();

	return (
		<Wrapper>
			<article id="main-content" className="relative min-h-svh">
				<section className="relative h-svh p-4">
					{project.image && (
						<div className="absolute inset-2">
							<Media resource={project.image} className="h-full w-full" imgClassName="h-full w-full object-cover" priority />
							{project.copyright && (
								<div className="absolute right-2 bottom-2 flex items-center gap-x-2 pr-2 text-background text-caption mix-blend-difference">
									<p className="bg-white px-1 py-px text-black" aria-label="Image credit">
										IMG BY
									</p>
									<p>{project.copyright}</p>
								</div>
							)}
						</div>
					)}
					<div className="layout-grid relative z-10 h-full text-background mix-blend-difference">
						<div className="col-span-6 self-end">
							<h1 className="text-[clamp(2em,5vw,5.5em)] uppercase leading-[.85] tracking-[-0.04em]">{project.name}</h1>
						</div>
					</div>
				</section>
				<section className="py-12 layout-grid"></section>
			</article>
		</Wrapper>
	);
};

export default ProjectPage;
