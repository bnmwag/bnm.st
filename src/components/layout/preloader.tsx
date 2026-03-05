"use client";

import { gsap } from "@/lib/gsap";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const Preloader = () => {
	const ref = useRef<HTMLDivElement>(null);
	const [mounted, setMounted] = useState(false);
	const [visible, setVisible] = useState(true);

	useEffect(() => setMounted(true), []);

	useEffect(() => {
		if (!mounted || !ref.current) return;

		const tl = gsap.timeline({ onComplete: () => setVisible(false) });

		tl.to(ref.current, {
			clipPath: "inset(0 0 100% 0)",
			duration: 1,
			ease: "expo.inOut",
			delay: 0.8,
		});

		return () => {
			tl.kill();
		};
	}, [mounted]);

	if (!mounted || !visible) return null;

	return createPortal(
		<div
			ref={ref}
			className="fixed inset-0 z-[200] bg-foreground"
			style={{ clipPath: "inset(0 0 0% 0)" }}
		/>,
		document.body,
	);
};
