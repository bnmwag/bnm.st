import { Scene } from "@/components/gl/scene";
import { getProjects } from "@/data/get-projects";
import type { Metadata, NextPage } from "next";
import Link from "next/link";

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
		<main className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12 pt-[50svh] pb-[15svh] gap-x-5 px-5 z-10 relative">
			<div className="xl:col-start-2 md:col-span-2 max-md:absolute max-md:top-5 max-md:left-5 max-md:w-full max-md:h-full">
				<div className="fixed left-0 top-0 right-0 h-44 bg-gradient-to-b from-background to-transparent" />
				<h1 className="sticky top-12">Benjamin Wagner</h1>
			</div>
			<div className="md:col-start-3 xl:col-start-4 md:col-span-3 space-y-36">
				<div className="space-y-12 max-md:max-w-md">
					<h2>Frontend developer</h2>
					<p className="text-foreground-muted">
						Hi! I&apos;m Benjamin Wagner, a frontend developer based in Linz,
						Austria. I am passionate about building intuitive and user-centric
						digital experiences.
						<br />
						<br />
						With expertise in PayloadCMS and Stripe, I'd love to help bring your
						online vision to life. Let's connect!
					</p>
				</div>
				<div className="space-y-12 max-md:max-w-md">
					<h2>Projects</h2>
					<div className="space-y-4">
						{projects.map((project) => {
							return (
								<Link
									key={project.name}
									href={project.url}
									target="_blank"
									rel="noopener noreferrer"
									className="project block relative group"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										className="absolute left-0 top-1/2 group-hover:-translate-y-1/2 translate-y-1/2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 ease-cubic duration-300 transition-all"
									>
										<title>Arrow</title>
										<path
											fill="currentColor"
											d="M6 6v2h8.59L5 17.59L6.41 19L16 9.41V18h2V6z"
										/>
									</svg>
									<p className="group-hover:pl-8 ease-cubic duration-300 transition-all flex items-center gap-x-4">
										<span>{project.name}</span>
										<span className="text-foreground-muted text-xs">
											{project.type.toUpperCase()} | {project.year}
										</span>
									</p>
								</Link>
							);
						})}
					</div>
				</div>
				<div className="space-y-12 max-md:max-w-md">
					<h2>Contact</h2>
					<p className="space-y-4 flex flex-col items-start">
						<Link
							className="text-foreground-muted hover:text-white transition-colors duration-500 inline-link inline-block"
							href="mailto:bnm.wag@gmail.com"
						>
							bnm.wag@gmail.com
						</Link>
						<Link
							className="text-foreground-muted hover:text-white transition-colors duration-500 inline-link inline-block"
							href="https://github.com/bnmwag"
						>
							github.com/bnmwag
						</Link>
					</p>
				</div>
			</div>
			<Scene />
		</main>
	);
};

export default IndexPage;
