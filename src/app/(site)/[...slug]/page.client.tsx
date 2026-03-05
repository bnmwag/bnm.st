"use client";

import { Media, Wrapper } from "@/components/layout";
import { ProgressiveBlur } from "@/components/progressive-blur";
import { useTransition } from "@/features/page-transitions/context/page-transition.context";
import { useTouchDevice } from "@/hooks/use-touch-device";
import { gsap } from "@/lib/gsap";
import type { Project } from "@/payload-types";
import cn from "clsx";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { type ComponentProps, type FC, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

interface IIndexPageClientProps extends ComponentProps<"div"> {
	projects: Project[];
}

export const IndexPageClient: FC<IIndexPageClientProps> = ({ projects, className, ...props }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const stackCounterRef = useRef(0);

	const [hoverStack, setHoverStack] = useState<Array<{ id: number; key: string }>>([]);
	const [clickedProjectId, setClickedProjectId] = useState<number | null>(null);

	const isTouchDevice = useTouchDevice();
	const isMobile = useMediaQuery("(max-width: 767px)");
	const { setEntryAnimations } = useTransition();

	// Preload all project hover images in the background so they're in cache on first hover
	useEffect(() => {
		projects.forEach((project) => {
			const img = project.image;
			if (img && typeof img === "object" && img.url) {
				const el = new window.Image();
				el.src = img.url;
			}
		});
	}, [projects]);

	useEffect(() => {
		setEntryAnimations(() => {
			const links = containerRef.current?.querySelectorAll<HTMLElement>(".project-link");
			if (!links?.length) return;

			// Wrap each link in a temporary overflow-hidden clip — never touch the
			// link's own DOM so the ::after hover bar is never affected.
			const wrappers = Array.from(links).map((link) => {
				const wrap = document.createElement("div");
				wrap.style.cssText = "overflow:hidden;";
				link.parentElement!.insertBefore(wrap, link);
				wrap.appendChild(link);
				return wrap;
			});

			gsap.set(Array.from(links), { y: "100%", rotateX: 80, transformPerspective: 300, force3D: true });

			const tl = gsap.timeline({
				onComplete: () => {
					gsap.set(Array.from(links), { clearProps: "all" });
					for (const wrap of wrappers) {
						wrap.parentElement!.insertBefore(wrap.firstElementChild!, wrap);
						wrap.remove();
					}
				},
			});

			tl.to(Array.from(links), { rotateX: 0, y: 0, duration: 1.2, stagger: 0.07, ease: "expo.out", force3D: true });
		});
	}, [setEntryAnimations]);

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

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, projectId: number) => {
		if (isTouchDevice) {
			if (clickedProjectId === projectId) {
				return;
			}

			e.preventDefault();
			setClickedProjectId(projectId);
			handleEnter(projectId);
		}
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (isTouchDevice && clickedProjectId !== null && containerRef.current) {
				const linksContainer = containerRef.current.querySelector(".links-container");
				if (linksContainer && !linksContainer.contains(e.target as Node)) {
					setClickedProjectId(null);
					setHoverStack([]);
				}
			}
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
			if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
		};
	}, [isTouchDevice, clickedProjectId]);

	const getProjectById = (id: number) => projects.find((p) => p.id === id);
	const age = Math.floor((Date.now() - new Date("2005-06-28").getTime()) / (1000 * 60 * 60 * 24 * 365.25));

	if (isMobile) {
		return (
			<Wrapper lenis={{ options: { infinite: true, syncTouch: true, touchMultiplier: 1 } }}>
				<div id="main-content" className={cn("", className)} {...props}>
					<section className="layout-grid h-svh items-center py-52" aria-label="Introduction">
						<div className="col-span-4 row-start-1 row-end-1">
							<p className="text-caption">Based in austria,</p>
							<p className="text-caption">working worldwide.</p>
						</div>
						<div className="col-span-6 col-start-6 row-start-2 row-end-2">
							<p className="text-balance text-caption">
								{age}/yo frontend developer focused on crafting polished, high-quality digital experiences.
							</p>
						</div>
					</section>
					{projects.map((project, index) => (
						<section
							key={`${project.id}-${index}`}
							className="relative flex h-[150vh] items-end"
							aria-label={`Project: ${project.name}`}
						>
							<div className="absolute inset-0" aria-hidden="true">
								<Media resource={project.image} className="h-full w-full" imgClassName="h-full w-full object-cover" />
							</div>

							<div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" aria-hidden="true" />
							<ProgressiveBlur className="absolute! inset-x-0 bottom-0 h-1/2" blurIntensity={1} />

							<div className="relative z-10 w-full p-6 pb-12 text-white">
								<Link
									href={project.url}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`Visit ${project.name} website`}
									className="mb-4 inline-block text-[clamp(2em,8vw,4em)] uppercase leading-[.8] tracking-[-.04em]"
								>
									{project.name}
								</Link>

								<div className="space-y-2">
									{project.year && (
										<div className="flex items-center gap-x-2 text-caption">
											<p className="bg-white px-1 py-px text-black" aria-label="Year">
												YEAR
											</p>
											<p>{project.year}</p>
										</div>
									)}
									{project.copyright && (
										<div className="flex items-center gap-x-2 text-caption">
											<p className="bg-white px-1 py-px text-black" aria-label="Image credit">
												IMG BY
											</p>
											<p>{project.copyright}</p>
										</div>
									)}
									{project.awards?.length ? (
										<div className="flex items-center gap-x-2 text-caption">
											<p className="bg-white px-1 py-px text-black" aria-label="Awards">
												AWARDS
											</p>
											<p>{project.awards.join(", ")}</p>
										</div>
									) : null}
									{project.services?.length ? (
										<div className="flex items-center gap-x-2 text-caption">
											<p className="bg-white px-1 py-px text-black" aria-label="Services">
												SERVICES
											</p>
											<p>{project.services.join(", ")}</p>
										</div>
									) : null}
								</div>
							</div>
						</section>
					))}
					<section className="layout-grid h-svh items-center py-52" aria-label="Closing statement">
						<div className="col-span-4 row-start-1 row-end-1">
							<p className="text-caption">Based in austria,</p>
							<p className="text-caption">working worldwide.</p>
						</div>
						<div className="col-span-6 col-start-6 row-start-2 row-end-2">
							<p className="text-balance text-caption">
								{age}/yo frontend developer focused on crafting polished, high-quality digital experiences.
							</p>
						</div>
					</section>
				</div>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<section id="main-content" ref={containerRef} className={cn("h-svh", className)} aria-label="Portfolio projects" {...props}>
				<motion.div
					animate={{
						filter: hoverStack.length > 0 ? "blur(0px)" : "blur(120px)",
						opacity: hoverStack.length > 0 ? 1 : 0,
						pointerEvents: hoverStack.length > 0 ? "auto" : "none",
					}}
					transition={{
						duration: 0.64,
						ease: [0.87, 0, 0.13, 1],
					}}
					className="fixed inset-2 overflow-hidden"
					aria-hidden="true"
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
				<div className="layout-grid z-20 h-full py-4 text-background mix-blend-difference ">
					<nav className="links-container col-span-6 flex flex-wrap gap-4 self-end" aria-label="Project links">
						{projects.map((project) => (
							<div key={project.id} className="relative">
								<Link
									href={project.url}
									target="_blank"
									rel="noopener noreferrer"
									onClick={(e) => handleClick(e, project.id)}
									onMouseEnter={() => !isTouchDevice && handleEnter(project.id)}
									onMouseLeave={() => !isTouchDevice && handleLeave()}
									aria-label={`Visit ${project.name} website`}
									className={cn(
										"project-link | after:-left-2 after:-right-2 after:-top-1.5 after:-bottom-1.5 relative inline-flex text-[clamp(2em,3.8vw,5em)] uppercase leading-[.8] tracking-[-.04em] after:absolute after:inset-x-0 after:origin-right after:scale-x-0 after:bg-background after:mix-blend-difference after:transition-transform after:duration-long after:ease-default hover:after:origin-left hover:after:scale-x-100",
										{ "project-link--active": clickedProjectId === project.id && isTouchDevice },
									)}
								>
									{project.name}
								</Link>
							</div>
						))}
					</nav>
					<div className="col-span-2 col-start-8 self-end" aria-live="polite">
						{isTouchDevice ? (
							<>
								<p className="text-caption">Tap to preview</p>
								<p className="text-caption">Tap again to visit</p>
							</>
						) : (
							<>
								<p className="text-caption">Hover to preview</p>
								<p className="text-caption">Click to visit</p>
							</>
						)}
					</div>
					<aside className="col-span-2 col-start-10 space-y-12 self-end" aria-label="Project details">
						<div className="flex flex-col justify-center gap-y-12">
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
									aria-label={`Details for ${project.name}`}
								>
									{project.year && (
										<div className="flex items-center gap-x-2 text-caption">
											<p className="bg-background px-1 py-px text-foreground" aria-label="Year">
												YEAR
											</p>
											<p>{project.year}</p>
										</div>
									)}
									{project.copyright && (
										<div className="flex items-center gap-x-2 text-caption">
											<p className="bg-background px-1 py-px text-foreground" aria-label="Image credit">
												IMG BY
											</p>
											<p>{project.copyright}</p>
										</div>
									)}
									{project.awards?.length ? (
										<div className="flex items-center gap-x-2 text-caption">
											<p className="bg-background px-1 py-px text-foreground" aria-label="Awards">
												AWARDS
											</p>
											<p>{project.awards.join(", ")}</p>
										</div>
									) : null}
									{project.services?.length ? (
										<div className="flex items-center gap-x-2 text-caption">
											<p className="bg-background px-1 py-px text-foreground" aria-label="Services">
												SERVICES
											</p>
											<p>{project.services.join(", ")}</p>
										</div>
									) : null}
								</motion.div>
							))}
						</div>
						{!isTouchDevice && (
							<div className="col-span-8 col-start-10 self-end">
								<p className="text-caption">press shift + G</p>
								<p className="text-caption">to show layout grid</p>
							</div>
						)}
					</aside>
				</div>
			</section>
		</Wrapper>
	);
};
