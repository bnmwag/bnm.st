"use client";

import { Media } from "@/components/layout";
import { useTransition } from "@/features/page-transitions/context/page-transition.context";
import { gsap } from "@/lib/gsap";
import type { Project } from "@/payload-types";
import { type ComponentProps, type FC, useEffect, useRef } from "react";

interface IProjectHeroProps extends ComponentProps<"section"> {
	project: Project;
}

export const ProjectHero: FC<IProjectHeroProps> = ({ project, ...props }) => {
	const titleRef = useRef<HTMLHeadingElement>(null);
	const imageContainerRef = useRef<HTMLDivElement>(null);
	const { setEntryAnimations } = useTransition();

	useEffect(() => {
		setEntryAnimations(() => {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

			const title = titleRef.current;
			const imageContainer = imageContainerRef.current;

			if (!title) return;

			gsap.set(title, { opacity: 0 });

			if (imageContainer) {
				gsap.set(imageContainer, { filter: "blur(120px)", opacity: 0 });
			}

			const rect = title.getBoundingClientRect();
			const bar = document.createElement("div");
			Object.assign(bar.style, {
				position: "fixed",
				top: `${rect.top}px`,
				left: `${rect.left}px`,
				width: `${rect.width}px`,
				height: `${rect.height}px`,
				background: "var(--background)",
				transformOrigin: "left center",
				transform: "scaleX(0)",
				pointerEvents: "none",
				zIndex: "50",
			});
			document.body.appendChild(bar);

			const tl = gsap.timeline({
				onComplete: () => {
					bar.remove();
					gsap.set(title, { clearProps: "opacity" });
					if (imageContainer) gsap.set(imageContainer, { clearProps: "filter,opacity" });
				},
			});

			if (imageContainer) {
				tl.to(imageContainer, {
					filter: "blur(0px)",
					opacity: 1,
					delay: 0.25,
					duration: 0.64,
					ease: "expo.out",
				});
			}

			tl.to(bar, { scaleX: 1, duration: 0.55, ease: "expo.in" }, 0.15);
			tl.set(title, { opacity: 1 }, 0.7);
			tl.set(bar, { transformOrigin: "right center" }, 0.7);
			tl.to(bar, { scaleX: 0, duration: 0.65, ease: "expo.out" }, 0.7);
		});
	}, [setEntryAnimations]);

	return (
		<section className="relative h-svh p-4" {...props}>
			{project.image && (
				<div ref={imageContainerRef} className="absolute inset-2">
					<Media resource={project.image} className="h-full w-full" imgClassName="h-full w-full object-cover" priority />
				</div>
			)}
			<div className="layout-grid relative z-10 mx-0 h-full text-background mix-blend-difference">
				<div className="col-span-full self-end">
					<h1 ref={titleRef} className="w-fit text-[clamp(2em,5vw,5.5em)] uppercase leading-[.85] tracking-[-0.04em]">
						{project.name}
					</h1>
				</div>
			</div>
		</section>
	);
};
