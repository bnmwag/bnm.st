"use client";

import { Media } from "@/components/layout/render-media";
import type { Project } from "@/payload-types";
import cn from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "next-view-transitions";
import { type ComponentProps, type FC, useEffect, useRef, useState } from "react";

interface IIndexPageClientProps extends ComponentProps<"div"> {
	projects: Project[];
}

export const IndexPageClient: FC<IIndexPageClientProps> = ({ projects, className, ...props }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const stackCounterRef = useRef(0);
	const [hoverStack, setHoverStack] = useState<Array<{ id: number; key: string }>>([]);

	const handleEnter = (id: number) => {
		if (leaveTimeoutRef.current) {
			clearTimeout(leaveTimeoutRef.current);
			leaveTimeoutRef.current = null;
		}

		setHoverStack((prev) => {
			if (prev.length > 0 && prev[prev.length - 1].id === id) {
				return prev;
			}

			stackCounterRef.current += 1;
			const newItem = { id, key: `${id}-${stackCounterRef.current}` };

			return [...prev, newItem].slice(-5);
		});
	};

	const handleLeave = () => {
		if (leaveTimeoutRef.current) {
			clearTimeout(leaveTimeoutRef.current);
		}

		leaveTimeoutRef.current = setTimeout(() => {
			if (containerRef.current) {
				const links = containerRef.current.querySelectorAll(".project-link");
				const isAnyLinkHovered = Array.from(links).some((link) => link.matches(":hover"));

				if (!isAnyLinkHovered) {
					setHoverStack([]);
				}
			}

			leaveTimeoutRef.current = null;
		}, 80);
	};

	useEffect(() => {
		return () => {
			if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
		};
	}, []);

	const getProjectById = (id: number) => projects.find((p) => p.id === id);

	return (
		<section ref={containerRef} className={cn("h-svh", className)} {...props}>
			<motion.div
				animate={{
					opacity: hoverStack.length > 0 ? 1 : 0,
					pointerEvents: hoverStack.length > 0 ? "auto" : "none",
				}}
				transition={{
					duration: 0.4,
					ease: [0.87, 0, 0.13, 1],
				}}
				className="fixed inset-2 overflow-hidden"
			>
				<AnimatePresence initial={false}>
					{hoverStack.map((item, index) => {
						const project = getProjectById(item.id);

						if (!project) return null;

						return (
							<motion.div
								key={item.key}
								className="absolute inset-0"
								style={{ zIndex: index }}
								initial={{
									scale: 1.15,
									clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
								}}
								animate={{
									scale: 1,
									clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
								}}
								exit={{
									opacity: 0,
								}}
								transition={{
									duration: 0.64,
									ease: [0.87, 0, 0.13, 1],
								}}
							>
								<Media resource={project.image} className="h-full w-full" imgClassName="h-full w-full object-cover" />
							</motion.div>
						);
					})}
				</AnimatePresence>
			</motion.div>
			<div className="layout-grid z-20 h-full py-4 mix-blend-difference ">
				<div className="col-span-6 flex flex-wrap gap-4 self-end">
					{projects.map((project) => (
						<Link
							key={project.id}
							href={project.url}
							target="_blank"
							rel="noopener noreferrer"
							onMouseEnter={() => handleEnter(project.id)}
							onMouseLeave={handleLeave}
							className="project-link | after:-inset-y-2 after:-left-2 after:-right-2 relative text-[clamp(2em,3.8vw,5em)] uppercase leading-[.8] tracking-[-.04em] after:absolute after:inset-x-0 after:origin-right after:scale-x-0 after:bg-foreground after:mix-blend-difference after:transition-transform after:duration-long after:ease-default hover:after:origin-left hover:after:scale-x-100"
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
							animate={hoverStack[hoverStack.length - 1]?.id === project.id ? "show" : "hidden"}
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
