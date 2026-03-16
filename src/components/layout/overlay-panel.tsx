"use client";

import { gsap } from "gsap";
import Lenis from "lenis";
import { usePathname, useRouter } from "next/navigation";
import { type FC, type PropsWithChildren, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface IOverlayPanelProps extends PropsWithChildren {
	route: string;
	closeEvent: string;
	heading: string;
	headingId: string;
}

export const OverlayPanel: FC<IOverlayPanelProps> = ({ route, closeEvent, heading, headingId, children }) => {
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
		if (pathname === route) {
			triggerRef.current = document.activeElement;
			const timer = setTimeout(
				() => {
					content.current?.focus();
				},
				window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 300,
			);
			return () => clearTimeout(timer);
		}
		(triggerRef.current as HTMLElement | null)?.focus();
	}, [mounted, pathname, route]);

	// ─── Lenis scroll inside panel ────────────────────────────────────────────
	useEffect(() => {
		if (!scrollWrapper.current || !mounted || pathname !== route) return;

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
	}, [mounted, pathname, route]);

	// ─── Body scroll lock ─────────────────────────────────────────────────────
	useEffect(() => {
		if (!mounted) return;
		if (pathname === route) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [mounted, pathname, route]);

	// ─── Open / close driven by pathname ─────────────────────────────────────
	useEffect(() => {
		if (!mounted) return;

		if (pathname === route) {
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
	}, [mounted, pathname, route]);

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

	// ─── Close via custom event ─────────────────────────────────────────────
	useEffect(() => {
		window.addEventListener(closeEvent, handleBack);
		return () => window.removeEventListener(closeEvent, handleBack);
	});

	if (!mounted) return null;

	return createPortal(
		<div>
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
				aria-label={`Close ${heading.toLowerCase()} panel`}
				className="max-md:-bottom-64 pointer-events-none fixed inset-0 z-30 opacity-0 backdrop-blur-3xl"
			/>

			<aside
				ref={content}
				data-lenis-prevent
				aria-modal="true"
				aria-labelledby={headingId}
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
						id={headingId}
						className="-translate-x-1.5 text-[clamp(2em,3.8vw,5em)] text-foreground uppercase leading-[.8] tracking-[-.04em]"
					>
						{heading}
					</h2>
				</div>
				<div ref={scrollWrapper} className="h-full overflow-y-auto">
					<div data-lenis-content className="px-2 pt-2 pb-48">
						{children}
					</div>
				</div>
			</aside>
		</div>,
		document.body,
	);
};
