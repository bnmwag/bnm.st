"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { useEffect, useLayoutEffect } from "react";
import Tempus from "tempus";

export function GSAP() {
	useLayoutEffect(() => {
		gsap.defaults({ ease: "none" });

		gsap.ticker.lagSmoothing(0);
		gsap.ticker.remove(gsap.updateRoot);
		Tempus?.add((time: number) => {
			gsap.updateRoot(time / 1000);
		});
	}, []);

	useLayoutEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		ScrollTrigger.clearScrollMemory("manual");
	}, []);

	const lenis = useLenis(ScrollTrigger.update);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => ScrollTrigger.refresh(), [lenis]);

	return null;
}
