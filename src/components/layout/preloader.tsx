"use client";

import { useTransition } from "@/features/page-transitions/context/page-transition.context";
import { SplitText, gsap } from "@/lib/gsap";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const Preloader = () => {
	const overlayRef = useRef<HTMLDivElement>(null);
	const nameRef = useRef<HTMLDivElement>(null);
	const captionRef = useRef<HTMLSpanElement>(null);
	const [mounted, setMounted] = useState(false);
	const [visible, setVisible] = useState(true);

	const { notifyPreloaderDone } = useTransition();

	useEffect(() => setMounted(true), []);

	useEffect(() => {
		if (!mounted || !overlayRef.current || !nameRef.current || !captionRef.current) return;

		const split = new SplitText(nameRef.current, {
			type: "lines,chars",
			aria: "none",
			mask: "lines",
			linesClass: "perspective-distant",
		});

		gsap.set(split.chars, { y: "100%", rotateX: 60, force3D: true });
		gsap.set(captionRef.current, { opacity: 0, y: 6 });

		const tl = gsap.timeline({ onComplete: () => setVisible(false) });

		// name chars flip up with 3D rotateX
		tl.to(split.chars, {
			rotateX: 0,
			y: 0,
			duration: 1.4,
			stagger: 0.025,
			delay: 0.3,
			ease: "expo.out",
			force3D: true,
		});

		// caption fades in
		tl.to(captionRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "<0.2");

		// hold
		tl.addLabel("exit", "+=0.5");

		// notify at wipe start — page entry animation runs simultaneously
		tl.call(notifyPreloaderDone, [], "exit");

		// wipe overlay upward
		tl.to(overlayRef.current, { clipPath: "inset(0 0 100% 0)", duration: 1.2, ease: "expo.inOut" }, "exit");

		return () => {
			tl.kill();
			split.revert();
		};
	}, [mounted]);

	if (!mounted || !visible) return null;

	return createPortal(
		<div
			ref={overlayRef}
			className="fixed inset-0 z-200 flex flex-col justify-between p-4 bg-foreground"
			style={{ clipPath: "inset(0 0 0% 0)" }}
		>
			<span ref={captionRef} className="text-caption uppercase text-background/50 opacity-0">
				Freelance Creative Developer
			</span>

			<div ref={nameRef} className="uppercase leading-[.85] tracking-[-0.04em] text-background text-[clamp(3rem,7vw,9rem)]">
				Benjamin Wagner
			</div>
		</div>,
		document.body,
	);
};
