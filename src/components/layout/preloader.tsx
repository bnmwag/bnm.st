"use client";

import { useTransition } from "@/features/page-transitions/context/page-transition.context";
import { gsap } from "@/lib/gsap";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const NAME = "BENJAMIN WAGNER";
const WORDS = NAME.split(" ");

export const Preloader = () => {
	const overlayRef = useRef<HTMLDivElement>(null);
	const captionRef = useRef<HTMLSpanElement>(null);
	const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

	const [mounted, setMounted] = useState(false);
	const [visible, setVisible] = useState(true);

	const { notifyPreloaderDone } = useTransition();

	useEffect(() => setMounted(true), []);

	useEffect(() => {
		if (!mounted || !overlayRef.current || !captionRef.current) return;

		const tweens: gsap.core.Tween[] = [];
		const words = wordRefs.current.filter((el): el is HTMLSpanElement => el !== null);

		gsap.set(words, { opacity: 0 });
		gsap.set(captionRef.current, { opacity: 0 });

		// White bars on dark background — fixed so they sit outside the overlay stacking context
		const bars = words.map((wordEl) => {
			const rect = wordEl.getBoundingClientRect();
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
				zIndex: "201",
			});
			document.body.appendChild(bar);
			return bar;
		});

		const tl = gsap.timeline();

		// Bar wipes in from left → text revealed → bar exits right, staggered per word
		words.forEach((word, i) => {
			const bar = bars[i];
			const offset = i * 0.12;
			tl.to(bar, { scaleX: 1, duration: 0.55, ease: "expo.in" }, offset);
			tl.set(word, { opacity: 1 }, offset + 0.55);
			tl.set(bar, { transformOrigin: "right center" }, offset + 0.55);
			tl.to(bar, { scaleX: 0, duration: 0.65, ease: "expo.out" }, offset + 0.55);
		});

		// Caption fades in after the reveal
		tl.to(captionRef.current, { opacity: 0.5, duration: 0.5, ease: "power2.out" }, "-=0.3");

		// Hold
		tl.to({}, { duration: 0.5 });

		// Exit
		tl.add(() => {
			for (const bar of bars) bar.remove();
			notifyPreloaderDone();
			if (overlayRef.current) {
				tweens.push(
					gsap.to(overlayRef.current, {
						clipPath: "inset(0 0 100% 0)",
						duration: 1.2,
						ease: "expo.inOut",
						onComplete: () => setVisible(false),
					}),
				);
			}
		});

		return () => {
			tl.kill();
			for (const bar of bars) bar.remove();
			for (const tw of tweens) tw.kill();
		};
	}, [mounted, notifyPreloaderDone]);

	// Render a static cover before hydration so the first paint is never a flash of content
	if (!mounted) {
		return <div className="fixed inset-x-0 top-0 h-[100lvh] z-[200] bg-foreground" />;
	}

	if (!visible) return null;

	return createPortal(
		// 100lvh = large viewport height (no browser bars) — extends behind Safari's bottom bar when bars are visible
		<div
			ref={overlayRef}
			className="fixed inset-x-0 top-0 h-[100lvh] z-[200] bg-foreground"
			style={{ clipPath: "inset(0 0 0% 0)" }}
		>
			<div className="flex h-svh flex-col justify-between p-4">
				<span ref={captionRef} className="text-caption uppercase text-background/50">
					Freelance Creative Developer
				</span>

				<div
					className="text-[clamp(3rem,7vw,9rem)] uppercase leading-[.85] tracking-[-0.04em] text-background"
					aria-label={NAME}
				>
					{WORDS.map((word, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: static word list
						<span key={i}>
							<span
								ref={(el) => {
									wordRefs.current[i] = el;
								}}
								className="inline-block"
								aria-hidden="true"
							>
								{word}
							</span>
							{i < WORDS.length - 1 && <span className="inline-block">&nbsp;</span>}
						</span>
					))}
				</div>
			</div>
		</div>,
		document.body,
	);
};
