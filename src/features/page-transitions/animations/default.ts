import { gsap } from "@/lib/gsap";

const EASE = "expo.inOut";
const DURATION = 1.2;

export function defaultExit(content: HTMLElement): gsap.core.Tween {
	return gsap.to(content, {
		y: -window.innerHeight * 0.3,
		opacity: 0,
		scale: 0.8,
		transformOrigin: "top center",
		duration: DURATION,
		force3D: true,
		ease: EASE,
	});
}

// Called in useLayoutEffect (before paint) so the new page is hidden
// before the browser paints — no flash even with ghost behind.
export function defaultSetInitialState(content: HTMLElement): void {
	gsap.set(content, {
		position: "relative",
		zIndex: 2,
		clipPath: "inset(100svh 0% 0% 0%)",
	});
}

export function defaultEntry(tl: gsap.core.Timeline, content: HTMLElement): void {
	// Always reset to start state before animating.
	// This ensures Strict Mode's 2nd invocation starts from 100svh even if
	// the 1st invocation's tween was killed mid-flight.
	gsap.set(content, { clipPath: "inset(100svh 0% 0% 0%)" });
	tl.to(content, {
		clipPath: "inset(0svh 0% 0% 0%)",
		duration: DURATION,
		force3D: true,
		ease: EASE,
		onComplete: () => {
			gsap.set(content, { clearProps: "clipPath,position,zIndex" });
		},
	});
}
