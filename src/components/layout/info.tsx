"use client";

import { useEntryAnimation, useTransitionNavigation } from "@/lib/transitions";
import { gsap } from "gsap";
import Lenis from "lenis";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC, useEffect, useRef } from "react";
import { Human } from "../gl/human";

const services = [
	{
		name: "Frontend Development",
		description:
			"Modern, performant interfaces built with React, Next.js, and a strong focus on maintainability and accessibility.",
	},
	{
		name: "Creative Development",
		description:
			"Scroll-based experiences, WebGL, Three.js, shaders, and motion systems that turn design into something tangible.",
	},
	{
		name: "UI Engineering",
		description: "Bridging design and code — translating complex Figma files into scalable, reusable frontend systems.",
	},
	{
		name: "Prototyping & Experiments",
		description: "Rapid experiments, interactive prototypes, and technical explorations to validate ideas early.",
	},
];

const links = [
	{
		label: "Email",
		value: "hello@bnm.st",
		href: "mailto:hello@bnm.st?subject=Hello%20Benjamin!&body=I%27d%20like%20to%20discuss%20a%20project%20with%20you.",
	},
	{ label: "GitHub", value: "github.com/bnmwag", href: "https://github.com/bnmwag" },
	{ label: "LinkedIn", value: "linkedin.com/in/bnm", href: "https://www.linkedin.com/in/benjamin-wagner-a102a0272/" },
];

export const Info: FC = () => {
	const since = Math.floor((Date.now() - new Date("2021-06-01").getTime()) / (1000 * 60 * 60 * 24 * 365.25));

	const scope = useRef<HTMLDivElement>(null);
	const content = useRef<HTMLDivElement>(null);
	const scrollWrapper = useRef<HTMLDivElement>(null);
	const blend = useRef<HTMLDivElement>(null);

	const pathname = usePathname();
	const router = useTransitionNavigation();

	useEffect(() => {
		if (!scrollWrapper.current || pathname !== "/info") return;

		const lenis = new Lenis({
			wrapper: scrollWrapper.current,
			content: scrollWrapper.current.querySelector("[data-lenis-content]") as HTMLElement,
			lerp: 0.1,
			syncTouch: true,
			touchMultiplier: 1,
			overscroll: true,
			smoothWheel: true,
		});

		let rafId: number;
		function raf(time: number) {
			lenis.raf(time);
			rafId = requestAnimationFrame(raf);
		}

		rafId = requestAnimationFrame(raf);

		return () => {
			cancelAnimationFrame(rafId);
			lenis.destroy();
		};
	}, [pathname]);

	useEntryAnimation(
		() => {
			if (pathname !== "/info") return;

			const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

			tl.to(blend.current, {
				opacity: 1,
				duration: 1,
			});

			tl.to(content.current, {
				clipPath: "inset(0 0 0% 0)",
				duration: 1.5,
			});

			tl.set([content.current, blend.current], {
				pointerEvents: "auto",
			});

			return () => tl.kill();
		},
		{ scope },
	);

	const handleBack = () => {
		const tl = gsap.timeline({
			defaults: { ease: "expo.inOut" },
			onComplete: () => {
				router.push("/", { withTransition: false });
			},
		});

		tl.to(content.current, {
			clipPath: "inset(100% 0 0 0)",
			duration: 0.9,
		});

		tl.to(blend.current, { opacity: 0, duration: 0.7 }, "-=0.4");

		tl.set([content.current, blend.current], {
			pointerEvents: "none",
		});
	};

	return (
		<div ref={scope}>
			<div
				ref={blend}
				onClick={handleBack}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
						e.preventDefault();
						handleBack();
					}
				}}
				className="pointer-events-none fixed inset-0 z-40 opacity-0 backdrop-blur-3xl"
			/>

			<div
				ref={content}
				data-lenis-prevent
				className="translate-z-0 pointer-events-none fixed inset-y-2 right-2 z-40 w-[calc(100%-1rem)] max-w-xl overflow-hidden bg-foreground text-background will-change-[clip-path] [clip-path:inset(0_0_100%_0)]"
			>
				<div className="absolute inset-x-2 top-2 z-10 flex items-start justify-between mix-blend-difference">
					<h2 className="-translate-x-1.5 text-[clamp(2em,3.8vw,5em)] text-foreground uppercase leading-[.8] tracking-[-.04em]">
						Info
					</h2>
					<button
						type="button"
						onClick={handleBack}
						className="w-fit bg-foreground px-2 py-0.5 text-left font-medium text-[clamp(.625rem,.5vw,.75rem)] text-background uppercase leading-none"
					>
						Back
					</button>
				</div>
				<div ref={scrollWrapper} className="h-full overflow-y-auto">
					<div data-lenis-content className="space-y-48 px-2 py-48">
						<div className="space-y-12">
							<div className="aspect-3/4 w-full border">
								<Human />
							</div>
							<p className="indent-12 text-caption">
								Working professionally for over {since} years — across freelance projects and agency environments — building
								design-driven websites and interactive products worldwide.
							</p>
						</div>
						<div className="space-y-12">
							{services.map((service) => (
								<div key={service.name} className="grid grid-cols-6">
									<div className="col-span-2">
										<p className="text-balance text-caption opacity-60">{service.name}</p>
									</div>
									<div className="col-span-4">
										<p className="text-balance text-caption">{service.description}</p>
									</div>
								</div>
							))}
						</div>
						<div className="space-y-12" id="reach-out">
							<div className="space-y-6">
								<h3 className="text-[clamp(1.5em,2.4vw,2.5em)] uppercase leading-[.9] tracking-[-0.04em]">
									Let&apos;s build something.
								</h3>

								<p className="max-w-md indent-24 text-caption opacity-70">
									Available for freelance work, collaborations, and interesting experiments. If you have an idea, a product, or
									just want to connect — reach out.
								</p>
							</div>

							<div className="grid grid-cols-6 gap-y-6">
								{links.map((link) => (
									<div key={link.label} className="col-span-6 grid grid-cols-6 items-baseline">
										<p className="col-span-2 text-caption opacity-50">{link.label}</p>

										<Link
											href={link.href}
											target="_blank"
											rel="noreferrer"
											className="-translate-x-1.75 hover:translate-0 relative col-span-4 inline-flex h-3 w-fit items-center text-caption transition-transform duration-short ease-default before:aspect-square before:h-1.75 before:rotate-90 before:scale-0 before:bg-background before:transition-all before:duration-short before:ease-default after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-background after:transition-transform after:duration-short after:ease-default hover:after:origin-left hover:after:scale-x-100 hover:before:mr-2 hover:before:rotate-0 hover:before:scale-100"
										>
											{link.value}
										</Link>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
