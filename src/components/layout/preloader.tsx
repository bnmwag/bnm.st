"use client";

import { useTransition } from "@/features/page-transitions/context/page-transition.context";
import { gsap } from "@/lib/gsap";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const NAME = "BENJAMIN WAGNER";

export const Preloader = () => {
	const overlayRef = useRef<HTMLDivElement>(null);
	const captionRef = useRef<HTMLSpanElement>(null);
	const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

	const [mounted, setMounted] = useState(false);
	const [visible, setVisible] = useState(true);

	const { notifyPreloaderDone } = useTransition();

	useEffect(() => setMounted(true), []);

	useEffect(() => {
		if (!mounted || !overlayRef.current || !captionRef.current) return;

		const tweens: gsap.core.Tween[] = [];
		const chars = charRefs.current.filter((el): el is HTMLSpanElement => el !== null);

		// transformPerspective bakes perspective into each element's own transform matrix —
		// CSS `perspective` on the overflow wrapper would be flattened by the stacking context.
		gsap.set(chars, { y: "100%", rotateX: 80, transformPerspective: 300, force3D: true });
		gsap.set(captionRef.current, { opacity: 0, y: 8 });

		const tl = gsap.timeline({
			onComplete: () => {
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
			},
		});

		tl.to(chars, { y: 0, rotateX: 0, duration: 1.2, stagger: 0.04, ease: "expo.out", force3D: true })
			.to(captionRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "<0.2")
			.to({}, { duration: 0.5 }); // hold before exit

		return () => {
			tl.kill();
			for (const tw of tweens) tw.kill();
		};
	}, [mounted, notifyPreloaderDone]);

	// Render a static cover before hydration so the first paint is never a flash of content
	if (!mounted) {
		return <div className="fixed inset-0 z-[200] bg-foreground" />;
	}

	if (!visible) return null;

	return createPortal(
		<div
			ref={overlayRef}
			className="fixed inset-0 z-[200] flex flex-col justify-between bg-foreground p-4"
			style={{ clipPath: "inset(0 0 0% 0)" }}
		>
			<span ref={captionRef} className="text-caption uppercase text-background/50">
				Freelance Creative Developer
			</span>

			<div
				className="text-[clamp(3rem,7vw,9rem)] uppercase leading-[.85] tracking-[-0.04em] text-background"
				aria-label={NAME}
			>
				{NAME.split("").map((char, i) =>
					char === " " ? (
						<span key={i} className="inline-block">&nbsp;</span>
					) : (
						<span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
							<span
								ref={(el) => {
									charRefs.current[i] = el;
								}}
								className="inline-block"
								aria-hidden="true"
							>
								{char}
							</span>
						</span>
					),
				)}
			</div>
		</div>,
		document.body,
	);
};
