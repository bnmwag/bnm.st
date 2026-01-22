"use client";

import { Media } from "@/components/layout/render-media";
import type { Project } from "@/payload-types";
import cn from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "next-view-transitions";
import { type ComponentProps, type FC, useState } from "react";

interface IIndexPageClientProps extends ComponentProps<"div"> {
	projects: Project[];
}

export const IndexPageClient: FC<IIndexPageClientProps> = ({ projects, className, ...props }) => {
	const [activeId, setActiveId] = useState<number | null>(null);
	const [prevId, setPrevId] = useState<number | null>(null);

	const handleEnter = (id: number) => {
		setPrevId(activeId);
		setActiveId(id);
	};

	const handleLeaveAll = () => {
		setActiveId(null);
	};

	const getProjectById = (id: number | null) => projects.find((p) => p.id === id);

	return (
		<section className={cn("h-svh", className)} {...props}>
			<div className="fixed inset-2 overflow-hidden">
				<AnimatePresence>
					{prevId !== null && prevId !== activeId && activeId !== null && (
						<motion.div
							key={`prev-${prevId}`}
							className="absolute inset-0 z-10"
							exit={{
								clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
							}}
							transition={{
								duration: 0.64,
								ease: [0.87, 0, 0.13, 1],
							}}
						>
							<Media
								resource={getProjectById(prevId)?.image}
								className="h-full w-full"
								imgClassName="h-full w-full object-cover"
							/>
						</motion.div>
					)}

					{activeId !== null && (
						<motion.div
							key={`active-${activeId}`}
							className="absolute inset-0 z-20"
							initial={{
								scale: 1.25,
								clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
							}}
							animate={{
								scale: 1,
								clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
							}}
							exit={{
								scale: 0.75,
								clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
							}}
							transition={{
								duration: 0.64,
								ease: [0.87, 0, 0.13, 1],
							}}
						>
							<Media
								resource={getProjectById(activeId)?.image}
								className="h-full w-full"
								imgClassName="h-full w-full object-cover"
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<div className="layout-grid z-20 h-full py-4 mix-blend-difference ">
				<div className="col-span-6 flex flex-wrap gap-4 self-end">
					{projects.map((project) => (
						<Link
							key={project.id}
							href={project.url}
							target="_blank"
							rel="noopener noreferrer"
							onMouseEnter={() => handleEnter(project.id)}
							onMouseLeave={handleLeaveAll}
							className="after:-inset-y-2 after:-left-2 after:-right-2 relative text-[clamp(2em,3.8vw,5em)] uppercase leading-[.8] tracking-[-.04em] after:absolute after:inset-x-0 after:origin-right after:scale-x-0 after:bg-foreground after:mix-blend-difference after:transition-transform after:duration-long after:ease-default hover:after:origin-left hover:after:scale-x-100"
						>
							{project.name}
						</Link>
					))}
				</div>
				<div className="col-span-2 col-start-8 self-end">
					<p className="text-caption">Hover to preview</p>
					<p className="text-caption">Click to visit</p>
				</div>
				<div className="col-span-2 col-start-10 space-y-12 self-center">
					{projects.map((project) => (
						<motion.div
							variants={{
								hidden: {
									opacity: 0,
									filter: "blur(12px)",
								},
								show: {
									opacity: 1,
									filter: "blur(0)",
								},
							}}
							initial="hidden"
							animate={activeId === project.id ? "show" : "hidden"}
							transition={{ duration: 0.64, ease: [0.87, 0, 0.13, 1] }}
							key={project.id}
							className="space-y-2"
						>
							{project.year && (
								<div className="flex items-center gap-x-2 text-caption">
									<p className="bg-foreground px-1 py-px text-background">YEAR</p>
									<p>{project.year}</p>
								</div>
							)}
							{project.copyright && (
								<div className="flex items-center gap-x-2 text-caption">
									<p className="bg-foreground px-1 py-px text-background">IMG BY</p>
									<p>{project.copyright}</p>
								</div>
							)}
							{project.awards?.length ? (
								<div className="flex items-center gap-x-2 text-caption">
									<p className="bg-foreground px-1 py-px text-background">AWARDS</p>
									<p>{project.awards.join(", ")}</p>
								</div>
							) : null}
							{project.services?.length ? (
								<div className="flex items-center gap-x-2 text-caption">
									<p className="bg-foreground px-1 py-px text-background">SERVICES</p>
									<p>{project.services.join(", ")}</p>
								</div>
							) : null}
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};
