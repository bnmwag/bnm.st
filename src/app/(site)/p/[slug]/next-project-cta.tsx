"use client";

import { Media } from "@/components/layout";
import { gsap } from "@/lib/gsap";
import type { Project } from "@/payload-types";
import { useLenis } from "lenis/react";
import { type ComponentProps, type FC, useRef } from "react";

interface INextProjectCtaProps extends ComponentProps<"div"> {
	project: Project;
}

const SCROLL_DISTANCE = 3;

export const NextProjectCta: FC<INextProjectCtaProps> = ({ project, ...props }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const barRef = useRef<HTMLDivElement>(null);
	const labelRef = useRef<HTMLParagraphElement>(null);
	const linkRef = useRef<HTMLAnchorElement>(null);
	const hasNavigated = useRef(false);

	useLenis((lenis) => {
		const container = containerRef.current;
		const overlay = overlayRef.current;
		const bar = barRef.current;
		if (!container || !overlay || !bar) return;

		const rect = container.getBoundingClientRect();
		const viewportH = window.innerHeight;
		const scrollRange = viewportH * SCROLL_DISTANCE;

		if (rect.top > 0) {
			gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
			gsap.set(overlay, { opacity: 0.6 });
			return;
		}

		if (hasNavigated.current) return;

		const scrolled = -rect.top;
		const p = Math.min(Math.max(scrolled / scrollRange, 0), 1);

		gsap.set(bar, { scaleX: p, transformOrigin: "left center" });
		gsap.set(overlay, { opacity: 0.6 * (1 - p) });

		if (p >= 0.99) {
			hasNavigated.current = true;

			const link = linkRef.current;
			lenis.stop();

			const tl = gsap.timeline();

			tl.set(bar, { transformOrigin: "right center" });
			tl.to(bar, {
				scaleX: 0,
				duration: 0.65,
				ease: "expo.out",
			});

			tl.to(
				labelRef.current,
				{
					opacity: 0,
					duration: 0.3,
					ease: "power2.inOut",
				},
				"<",
			);

			tl.call(() => {
				link?.click();
			});
		}
	});

	return (
		<div ref={containerRef} className="relative" style={{ height: `${(SCROLL_DISTANCE + 1) * 100}svh` }} {...props}>
			<div className="sticky top-0 h-svh p-4">
				{project.image && (
					<div className="absolute inset-2">
						<Media resource={project.image} className="h-full w-full" imgClassName="h-full w-full object-cover" />
					</div>
				)}

				<div ref={overlayRef} className="absolute inset-2 z-10 bg-black" style={{ opacity: 0.6 }} />

				<div className="layout-grid relative z-20 mx-0 h-full text-background mix-blend-difference">
					<div className="col-span-full self-end">
						<p className="relative inline-block text-[clamp(2em,5vw,5.5em)] uppercase leading-[.85] tracking-[-0.04em]">
							{project.name}
							<span
								ref={barRef}
								className="-inset-2 absolute bg-background mix-blend-difference"
								style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
							/>
						</p>
					</div>
				</div>

				<p ref={labelRef} className="absolute right-4 bottom-4 z-20 text-caption text-white/50">
					Scroll to continue
				</p>
				<a ref={linkRef} href={`/p/${project.slug}`} className="sr-only" tabIndex={-1}>
					{project.name}
				</a>
			</div>
		</div>
	);
};
