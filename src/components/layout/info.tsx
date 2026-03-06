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
			"Production-grade interfaces with React and Next.js. Fast, accessible, and built to last — without the boilerplate.",
	},
	{
		name: "Creative Development",
		description:
			"WebGL, Three.js, scroll-based storytelling, shaders. The stuff that makes a site feel alive rather than just functional.",
	},
	{
		name: "UI Engineering",
		description:
			"From Figma to pixel-perfect code. I close the gap between design intent and technical reality without cutting corners.",
	},
	{
		name: "Prototyping & Experiments",
		description:
			"Quick, focused builds to test ideas before they get expensive. Interactive proofs of concept that actually look good.",
	},
];

const process = [
	{
		step: "01",
		title: "Brief",
		description:
			"We start with a conversation. I want to understand the project, the goals, and what success looks like before anything gets built.",
	},
	{
		step: "02",
		title: "Direction",
		description:
			"Once I've got context, I map out the approach — architecture, tooling, motion language, anything that needs to be settled upfront so there are no surprises later.",
	},
	{
		step: "03",
		title: "Build",
		description:
			"Iterative development with regular check-ins. You see real progress, not a big reveal at the end. Feedback is a feature, not an interruption.",
	},
	{
		step: "04",
		title: "Polish",
		description:
			"The last 20% that makes the difference. Timing, easing, edge cases, accessibility. I don't ship things I wouldn't be proud to put my name on.",
	},
	{
		step: "05",
		title: "Handoff",
		description:
			"Clean code, clear documentation, and I stick around post-launch. A good project relationship doesn't end at deployment.",
	},
];

export const Info: FC = () => {
	const since = Math.floor((Date.now() - new Date("2021-06-01").getTime()) / (1000 * 60 * 60 * 24 * 365.25));

	const content = useRef<HTMLDivElement>(null);
	const scrollWrapper = useRef<HTMLDivElement>(null);
	const blend = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<Element | null>(null);

	const router = useRouter();
	const pathname = usePathname();
	const isAnimatingOut = useRef(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	// ─── Focus management ─────────────────────────────────────────────────────
	useEffect(() => {
		if (!mounted) return;
		if (pathname === "/info") {
			triggerRef.current = document.activeElement;
			const timer = setTimeout(
				() => {
					content.current?.focus();
				},
				window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 300,
			);
			return () => clearTimeout(timer);
		} else {
			(triggerRef.current as HTMLElement | null)?.focus();
		}
	}, [mounted, pathname]);

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

	// ─── Body scroll lock ─────────────────────────────────────────────────────
	useEffect(() => {
		if (!mounted) return;
		if (pathname === "/info") {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [mounted, pathname]);

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

			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				gsap.set(content.current, { clipPath: "inset(0 0 0% 0)", pointerEvents: "auto" });
				gsap.set(blend.current, { opacity: 1, pointerEvents: "auto" });
				return;
			}

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

			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				gsap.set(content.current, { clipPath: "inset(0 0 100% 0)", pointerEvents: "none" });
				gsap.set(blend.current, { opacity: 0, pointerEvents: "none" });
				return;
			}

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

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			gsap.set(content.current, { clipPath: "inset(0 0 100% 0)", pointerEvents: "none" });
			gsap.set(blend.current, { opacity: 0, pointerEvents: "none" });
			router.back();
			return;
		}

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
				className="max-md:-bottom-64 pointer-events-none fixed inset-0 z-30 opacity-0 backdrop-blur-3xl"
			/>

			<aside
				ref={content}
				data-lenis-prevent
				aria-modal="true"
				aria-labelledby="info-heading"
				tabIndex={-1}
				className="translate-z-0 pointer-events-none fixed inset-y-2 right-2 z-30 w-[calc(100%-1rem)] max-w-xl overflow-hidden bg-foreground text-background will-change-[clip-path] [clip-path:inset(0_0_100%_0)]"
				onKeyDown={(e) => {
					if (e.key === "Escape") {
						e.preventDefault();
						handleBack();
						return;
					}
					if (e.key !== "Tab") return;
					const focusable = content.current?.querySelectorAll<HTMLElement>(
						'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
					);
					if (!focusable?.length) return;
					const first = focusable[0];
					const last = focusable[focusable.length - 1];
					if (e.shiftKey) {
						if (document.activeElement === first) {
							e.preventDefault();
							last.focus();
						}
					} else {
						if (document.activeElement === last) {
							e.preventDefault();
							first.focus();
						}
					}
				}}
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
					<div data-lenis-content className="space-y-48 px-2 pb-48 pt-2">
						<div className="h-[calc(100svh-32px)] flex flex-col justify-end gap-y-12">
							<div className="space-y-4">
								<h3 className="text-[clamp(1.5em,2.4vw,2.5em)] uppercase leading-[.9] tracking-[-0.04em]">
									Hey — I&apos;m Benjamin.
								</h3>
								<p className="text-caption leading-normal opacity-60">
									Frontend developer and creative builder based in Austria. I care about the craft — the kind of work where
									the interaction feels right, the layout breathes, and nothing is there without a reason.
								</p>
							</div>
							<div className="aspect-3/4 w-full border">
								<Human />
							</div>
						</div>
						<div className="space-y-12">
							<h3 className="text-[clamp(1.5em,2.4vw,2.5em)] uppercase leading-[.9] tracking-[-0.04em]">
								Good things get built by people who give a damn.
							</h3>
							<div className="space-y-4">
								<p className="text-left text-caption leading-normal">
									I&apos;ve been building for the web since 2021 — first in agencies, then on my own. Based in Austria, working
									with clients and studios worldwide.
								</p>
								<p className="text-right text-caption leading-normal opacity-60">
									{since} years in, and I still think the craft matters. The feel of an interaction, the weight of a typeface, the
									timing of a transition. These things aren&apos;t decoration — they&apos;re how a product communicates. I work
									best with teams who think the same way.
								</p>
							</div>
						</div>

						{/* Services */}
						<div className="space-y-12">
							<p className="text-caption opacity-60">What I do</p>
							{services.map((service) => (
								<div key={service.name} className="grid grid-cols-6">
									<div className="col-span-2">
										<p className="text-balance text-caption leading-normal opacity-60">{service.name}</p>
									</div>
									<div className="col-span-4">
										<p className="text-balance text-caption leading-normal">{service.description}</p>
									</div>
								</div>
							))}
						</div>

						<p className="text-caption leading-normal">
							<span className="opacity-60">There&apos;s a reason I lean minimal. As a solo developer, </span>
							speed and precision are the edge.
							<span className="opacity-60"> AI can generate interfaces fast — but it can&apos;t decide </span>
							what actually matters.
							<span className="opacity-60"> Stripping things down to what works, </span>
							shipping it clean
							<span className="opacity-60">, and moving without loose ends: that&apos;s the practice.</span>
						</p>

						{/* Process */}
						<div className="space-y-12">
							<p className="text-caption opacity-60">How I work</p>
							{process.map((item) => (
								<div key={item.step} className="grid grid-cols-6 items-baseline">
									<div className="col-span-2">
										<p className="text-caption leading-normal opacity-60">
											{item.step} — {item.title}
										</p>
									</div>
									<div className="col-span-4">
										<p className="text-balance text-caption leading-normal">{item.description}</p>
									</div>
								</div>
							))}
						</div>

						{/* Contact */}
						<div className="space-y-12" id="reach-out">
							<div className="space-y-6">
								<h3 className="text-[clamp(1.5em,2.4vw,2.5em)] uppercase leading-[.9] tracking-[-0.04em]">
									Have something in mind?
								</h3>
								<p className="max-w-md text-caption leading-normal opacity-70">
									Even if it&apos;s vague — a half-formed idea, a timeline, a budget question. I&apos;m easy to talk to and
									I&apos;ll tell you honestly if it&apos;s something I can help with.
								</p>
							</div>
							<a
								href="/contact"
								className="group relative block w-full overflow-hidden bg-background px-[0.6em] py-[0.15em] font-medium text-[clamp(2rem,5vw,3.5rem)] uppercase leading-none"
							>
								<span className="absolute inset-0 origin-right scale-x-0 bg-foreground transition-transform duration-short ease-default group-hover:origin-left group-hover:scale-x-100" />
								<ScrambleText className="text-foreground transition-colors duration-short ease-default group-hover:text-background">
									Get in touch
								</ScrambleText>
							</a>
						</div>
					</div>
				</div>
			</aside>
		</div>,
		document.body,
	);
};
