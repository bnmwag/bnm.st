"use client";

import type { LenisOptions } from "lenis";
import "lenis/dist/lenis.css";
import type { LenisRef, LenisProps as ReactLenisProps } from "lenis/react";
import { ReactLenis } from "lenis/react";
import Snap from "lenis/snap";
import { useEffect, useRef, useState } from "react";
import { useTempus } from "tempus/react";

interface SnapConfig {
	enabled: boolean;
	selector?: string;
	align?: "start" | "center" | "end" | Array<"start" | "center" | "end">;
	type?: "proximity" | "mandatory" | "lock";
	debounce?: number;
}

interface LenisProps extends Omit<ReactLenisProps, "ref"> {
	root: boolean;
	options?: LenisOptions;
	children?: React.ReactNode;
	snap?: SnapConfig;
}

export function Lenis({ root, options, children, snap: snapConfig }: LenisProps) {
	const lenisRef = useRef<LenisRef>(null);
	const snapRef = useRef<Snap | null>(null);

	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReducedMotion(mq.matches);
		const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	useEffect(() => {
		if (!snapConfig?.enabled) return;

		const timer = setTimeout(() => {
			if (!lenisRef.current?.lenis) {
				console.log("Lenis not ready");
				return;
			}

			const selector = snapConfig.selector || ".project-section";
			const align = snapConfig.align || ["start", "end"];

			const snap = new Snap(lenisRef.current.lenis, {
				type: snapConfig.type || "proximity",
				debounce: snapConfig.debounce ?? 500,
			});
			snapRef.current = snap;

			const els = Array.from(document.querySelectorAll(selector)) as HTMLElement[];

			console.log("Found elements:", els.length);

			if (els.length > 0) {
				snap.addElements(els, { align });
				console.log("Snap initialized with", els.length, "elements");
			} else {
				console.warn("No elements found for selector:", selector);
			}
		}, 100);

		return () => {
			clearTimeout(timer);
			if (snapRef.current) {
				snapRef.current.stop();
				snapRef.current = null;
			}
		};
	}, [snapConfig]);

	useTempus((time: number) => {
		if (lenisRef.current?.lenis) {
			lenisRef.current.lenis.raf(time);
		}
	});

	return (
		<ReactLenis
			ref={lenisRef}
			root={root}
			options={{
				...options,
				lerp: prefersReducedMotion ? 1 : (options?.lerp ?? 0.125),
				autoRaf: false,
				anchors: true,
				prevent: (node: Element | null) => node?.nodeName === "VERCEL-LIVE-FEEDBACK" || node?.id === "theatrejs-studio-root",
			}}
		>
			{children}
		</ReactLenis>
	);
}
