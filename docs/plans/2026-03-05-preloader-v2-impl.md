# Preloader v2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current preloader with a real asset-loading preloader: bold 3-digit counter (0→100), personal terminal-style lines appearing at 20% intervals, digit-column slide animation, and the same exit wipe.

**Architecture:** Single component rewrite. Real image preloading via DOM query + load events. GSAP animates digit slots on change and line entries. A GSAP proxy tween drives the smooth display counter toward the real load progress value. Minimum 800ms display time prevents flashing on fast connections.

**Tech Stack:** React, GSAP, Next.js portal, Tailwind

---

### Task 1: Rewrite `preloader.tsx`

**Files:**
- Modify: `src/components/layout/preloader.tsx`

Replace the entire file with the following:

```tsx
"use client";

import { useTransition } from "@/features/page-transitions/context/page-transition.context";
import { gsap } from "@/lib/gsap";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const LINES = [
	"Born 2005.",
	"Based in Austria.",
	"Obsessed with details.",
	"Builds for the web.",
	"Currently available.",
];

const MIN_DURATION = 800; // ms — never flash by on fast connections
const HOLD_AFTER_DONE = 300; // ms hold at 100% before exit wipe

export const Preloader = () => {
	const overlayRef = useRef<HTMLDivElement>(null);

	// Three digit slot refs: [hundreds, tens, ones]
	const digitRefs = useRef<(HTMLSpanElement | null)[]>([null, null, null]);
	const prevDigitsRef = useRef(["0", "0", "0"]);

	// Line refs for 3D flip-in animation
	const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
	lineRefs.current = [];

	const [mounted, setMounted] = useState(false);
	const [visible, setVisible] = useState(true);
	const [displayCount, setDisplayCount] = useState(0);
	const [visibleLines, setVisibleLines] = useState(0); // how many lines are shown (0–5)

	const { notifyPreloaderDone } = useTransition();

	useEffect(() => setMounted(true), []);

	// ── Digit slide animation whenever displayCount changes ───────────────────
	useEffect(() => {
		const curr = String(displayCount).padStart(3, "0").split("");
		const prev = prevDigitsRef.current;

		curr.forEach((digit, i) => {
			if (digit !== prev[i]) {
				const el = digitRefs.current[i];
				if (el) {
					gsap.fromTo(
						el,
						{ y: "100%" },
						{ y: 0, duration: 0.14, ease: "power3.out", force3D: true },
					);
				}
			}
		});

		prevDigitsRef.current = curr;
	}, [displayCount]);

	// ── Line flip-in when a new line becomes visible ──────────────────────────
	useEffect(() => {
		if (visibleLines === 0) return;
		const el = lineRefs.current[visibleLines - 1];
		if (!el) return;
		gsap.fromTo(
			el,
			{ y: "100%", rotateX: 80, transformPerspective: 300, force3D: true },
			{ y: 0, rotateX: 0, duration: 0.7, ease: "expo.out", force3D: true },
		);
	}, [visibleLines]);

	// ── Core preload logic ────────────────────────────────────────────────────
	useEffect(() => {
		if (!mounted || !overlayRef.current) return;

		const tweens: gsap.core.Tween[] = [];
		const startTime = Date.now();
		let cancelled = false;

		// Proxy object GSAP will animate — avoids manual RAF loop
		const proxy = { val: 0 };

		const setProgress = (target: number) => {
			gsap.killTweensOf(proxy);
			// Animate proxy toward new target; onUpdate drives React state
			tweens.push(
				gsap.to(proxy, {
					val: target,
					duration: 0.6,
					ease: "power2.out",
					onUpdate: () => {
						if (cancelled) return;
						const rounded = Math.min(100, Math.floor(proxy.val));
						setDisplayCount(rounded);
						// Reveal lines at 0%, 20%, 40%, 60%, 80% thresholds
						setVisibleLines(Math.min(LINES.length, Math.floor(rounded / 20) + 1));
					},
				}),
			);
		};

		// Start animating from 0
		setProgress(0);

		const exit = () => {
			if (cancelled) return;
			// Snap to exactly 100, hold, then wipe
			setDisplayCount(100);
			setVisibleLines(LINES.length);
			setTimeout(() => {
				if (cancelled) return;
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
			}, HOLD_AFTER_DONE);
		};

		const finish = () => {
			if (cancelled) return;
			const elapsed = Date.now() - startTime;
			const remaining = Math.max(0, MIN_DURATION - elapsed);
			// Animate to 100 over remaining time, then exit
			gsap.killTweensOf(proxy);
			tweens.push(
				gsap.to(proxy, {
					val: 100,
					duration: Math.max(0.3, remaining / 1000),
					ease: "power2.inOut",
					onUpdate: () => {
						if (cancelled) return;
						const rounded = Math.min(100, Math.floor(proxy.val));
						setDisplayCount(rounded);
						setVisibleLines(Math.min(LINES.length, Math.floor(rounded / 20) + 1));
					},
					onComplete: () => setTimeout(exit, 80),
				}),
			);
		};

		// Query all images that are not yet loaded
		const images = Array.from(document.querySelectorAll<HTMLImageElement>("img")).filter(
			(img) => !img.complete || !img.naturalWidth,
		);

		if (images.length === 0) {
			// Nothing to load — animate counter over MIN_DURATION then exit
			finish();
			return () => {
				cancelled = true;
				for (const tw of tweens) tw.kill();
			};
		}

		let loadedCount = 0;

		const onLoad = () => {
			if (cancelled) return;
			loadedCount++;
			const pct = (loadedCount / images.length) * 100;
			setProgress(pct);
			if (loadedCount >= images.length) finish();
		};

		for (const img of images) {
			img.addEventListener("load", onLoad, { once: true });
			img.addEventListener("error", onLoad, { once: true });
		}

		return () => {
			cancelled = true;
			for (const tw of tweens) tw.kill();
			for (const img of images) {
				img.removeEventListener("load", onLoad);
				img.removeEventListener("error", onLoad);
			}
		};
	}, [mounted, notifyPreloaderDone]);

	if (!mounted || !visible) return null;

	const digits = String(displayCount).padStart(3, "0").split("");

	return createPortal(
		<div
			ref={overlayRef}
			className="fixed inset-0 z-200 flex flex-col justify-between p-4 bg-foreground"
			style={{ clipPath: "inset(0 0 0% 0)" }}
		>
			{/* ── Terminal lines ── */}
			<div className="flex flex-col gap-y-1 pt-8">
				{LINES.slice(0, visibleLines).map((line, i) => (
					<div key={line} className="overflow-hidden">
						<span
							ref={(el) => {
								lineRefs.current[i] = el;
							}}
							className={`block text-caption ${
								i === visibleLines - 1 ? "text-background" : "text-background/30"
							}`}
						>
							{line}
						</span>
					</div>
				))}
			</div>

			{/* ── Counter + name ── */}
			<div>
				<div
					className="flex items-end gap-x-[0.05em] leading-none"
					aria-label={`Loading ${displayCount} percent`}
					aria-live="polite"
				>
					{digits.map((digit, i) => (
						<div key={i} className="overflow-hidden" style={{ lineHeight: 0.85 }}>
							<span
								ref={(el) => {
									digitRefs.current[i] = el;
								}}
								className="block text-background font-medium tabular-nums"
								style={{ fontSize: "clamp(5rem,10vw,13rem)" }}
								aria-hidden="true"
							>
								{digit}
							</span>
						</div>
					))}
					<span
						className="text-caption text-background/50 mb-[0.1em] ml-[0.15em]"
						aria-hidden="true"
					>
						%
					</span>
				</div>
				<p className="text-caption text-background/50 mt-3">Benjamin Wagner</p>
			</div>
		</div>,
		document.body,
	);
};
```

**Step 2: Check for TypeScript errors**

Run `mcp__ide__getDiagnostics` on the file. Fix any errors before committing.

**Step 3: Verify behaviour in browser**

- Hard-reload — counter should increment from 000 toward 100 tracking real image loads
- Terminal lines appear at ~0%, 20%, 40%, 60%, 80% load progress
- Each line flips in with 3D rotation
- Digit slots slide up when their value changes
- Exit wipes upward at 100%
- Page entry animation still fires correctly

**Step 4: Commit**

```bash
git add src/components/layout/preloader.tsx
git commit -m "feat: preloader v2 — real preload counter + terminal lines"
```
