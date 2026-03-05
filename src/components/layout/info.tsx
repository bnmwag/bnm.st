"use client";

import { gsap } from "gsap";
import Lenis from "lenis";
import { usePathname, useRouter } from "next/navigation";
import { type FC, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Human } from "../gl/human";
import { ScrambleText } from "../scramble-text";

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

const InfoLink: FC<{ label: string; value: string; href: string }> = ({ label, value, href }) => {
	return (
		<div className="col-span-6 grid grid-cols-6 items-baseline">
			<p className="col-span-2 text-caption opacity-50">{label}</p>
			<a
				href={href}
				target="_blank"
				rel="noreferrer"
				className="group relative col-span-4 inline-flex w-fit overflow-hidden px-2 py-0.5 font-medium text-[clamp(.625rem,.5vw,.75rem)] uppercase leading-none"
			>
				<span className="absolute inset-0 origin-right scale-x-0 bg-background transition-transform duration-short ease-default group-hover:origin-left group-hover:scale-x-100" />
				<ScrambleText className="text-background transition-colors duration-short ease-default group-hover:text-foreground">
					{value}
				</ScrambleText>
			</a>
		</div>
	);
};

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

	const content = useRef<HTMLDivElement>(null);
	const scrollWrapper = useRef<HTMLDivElement>(null);
	const blend = useRef<HTMLDivElement>(null);

	const router = useRouter();
	const pathname = usePathname();
	const isAnimatingOut = useRef(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	// ─── Lenis scroll inside panel ────────────────────────────────────────────
	useEffect(() => {
		if (!scrollWrapper.current || !mounted) return;

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
	}, [mounted]);

	// ─── Open / close driven by pathname ─────────────────────────────────────
	// Using pathname (not just mounted) handles component reuse from Next.js
	// router cache — the instance stays alive across visits so we can't rely
	// on mount firing twice.
	useEffect(() => {
		if (!mounted) return;

		if (pathname === "/info") {
			// Opening — reset guard and ensure element starts from closed state
			// (GSAP may have left inline styles from a previous close animation).
			isAnimatingOut.current = false;
			gsap.set(content.current, { clipPath: "inset(0 0 100% 0)", pointerEvents: "none" });
			gsap.set(blend.current, { opacity: 0, pointerEvents: "none" });

			const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
			tl.to(blend.current, { opacity: 1, duration: 1 });
			tl.to(content.current, { clipPath: "inset(0 0 0% 0)", duration: 1.5 });
			tl.set([content.current, blend.current], { pointerEvents: "auto" });
			return () => {
				tl.kill();
			};
		}

		// Forward navigation away from /info — animate out without router.back()
		if (!isAnimatingOut.current) {
			isAnimatingOut.current = true;
			const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
			tl.to(content.current, { clipPath: "inset(100% 0 0 0)", duration: 0.9 });
			tl.to(blend.current, { opacity: 0, duration: 0.7 }, "-=0.4");
			tl.set([content.current, blend.current], { pointerEvents: "none" });
			return () => {
				tl.kill();
			};
		}
	}, [mounted, pathname]);

	// ─── Close (nav button / backdrop) ───────────────────────────────────────
	const handleBack = () => {
		if (isAnimatingOut.current) return;
		isAnimatingOut.current = true;
		const tl = gsap.timeline({
			defaults: { ease: "expo.inOut" },
			onComplete: () => router.back(),
		});
		tl.to(content.current, { clipPath: "inset(100% 0 0 0)", duration: 0.9 });
		tl.to(blend.current, { opacity: 0, duration: 0.7 }, "-=0.4");
		tl.set([content.current, blend.current], { pointerEvents: "none" });
	};

	// ─── Close via nav button custom event ───────────────────────────────────
	useEffect(() => {
		window.addEventListener("info:close", handleBack);
		return () => window.removeEventListener("info:close", handleBack);
	});

	if (!mounted) return null;

	return createPortal(
		<div>
			{/* Backdrop — z-30 sits below nav (z-40) */}
			<div
				ref={blend}
				onClick={handleBack}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
						e.preventDefault();
						handleBack();
					}
				}}
				role="button"
				tabIndex={0}
				aria-label="Close info panel"
				className="pointer-events-none fixed inset-x-0 top-0 -bottom-28 z-30 opacity-0 backdrop-blur-3xl"
			/>

			<aside
				ref={content}
				data-lenis-prevent
				aria-modal="true"
				aria-labelledby="info-heading"
				className="translate-z-0 pointer-events-none fixed inset-y-2 right-2 z-30 w-[calc(100%-1rem)] max-w-xl overflow-hidden bg-foreground text-background will-change-[clip-path] [clip-path:inset(0_0_100%_0)]"
			>
				<div className="absolute inset-x-2 top-2 z-10 mix-blend-difference">
					<h2
						id="info-heading"
						className="-translate-x-1.5 text-[clamp(2em,3.8vw,5em)] text-foreground uppercase leading-[.8] tracking-[-.04em]"
					>
						Info
					</h2>
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
									<InfoLink key={link.label} {...link} />
								))}
							</div>
						</div>
					</div>
				</div>
			</aside>
		</div>,
		document.body,
	);
};
