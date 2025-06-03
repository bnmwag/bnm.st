import type { Metadata, NextPage } from "next";
import Link from "next/link";

import { getProjects } from "@/data";
import { Scene } from "@/components/gl";

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
		<main className="relative z-10 grid grid-cols-1 gap-x-5 px-5 pt-[50svh] pb-[15svh] md:grid-cols-6 xl:grid-cols-12">
			<div className="max-md:absolute max-md:top-5 max-md:left-5 max-md:h-full max-md:w-[calc(100%-40px)] md:col-span-2 xl:col-start-2">
				<div className="fixed top-0 right-0 left-0 h-44 bg-gradient-to-b from-background to-transparent" />
				<h1 className="sticky top-12">Benjamin Wagner</h1>
			</div>
			<div className="space-y-36 md:col-span-3 md:col-start-3 xl:col-start-4">
				<div className="space-y-12 max-md:max-w-md">
					<h2>Frontend developer</h2>
					<p className="text-foreground-muted">
						Hi! I&apos;m Benjamin Wagner, a frontend developer based in Linz, Austria. I am passionate about building intuitive
						and user-centric digital experiences.
						<br />
						<br />
						With expertise in PayloadCMS and Stripe, I'd love to help bring your online vision to life. Let's connect!
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
									className="project group relative block"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										className="group-hover:-translate-y-1/2 -translate-x-4 absolute top-1/2 left-0 translate-y-1/2 opacity-0 transition-all duration-300 ease-cubic group-hover:translate-x-0 group-hover:opacity-100"
									>
										<title>Arrow</title>
										<path fill="currentColor" d="M6 6v2h8.59L5 17.59L6.41 19L16 9.41V18h2V6z" />
									</svg>
									<p className="flex items-center gap-x-4 transition-all duration-300 ease-cubic group-hover:pl-8">
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
					<p className="flex flex-col items-start space-y-4">
						<Link
							className="inline-link inline-block text-foreground-muted transition-colors duration-500 hover:text-white"
							href="mailto:bnm.wag@gmail.com"
						>
							bnm.wag@gmail.com
						</Link>
						<Link
							className="inline-link inline-block text-foreground-muted transition-colors duration-500 hover:text-white"
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
