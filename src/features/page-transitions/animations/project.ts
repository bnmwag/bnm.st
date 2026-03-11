import { gsap } from "@/lib/gsap";

const DURATION = 0.8;
const EASE = "expo.inOut";

export function projectExit(ghost: HTMLElement): gsap.core.Tween {
	return gsap.to(ghost, {
		opacity: 0,
		duration: DURATION,
		ease: EASE,
	});
}

export function projectSetInitialState(content: HTMLElement): void {
	gsap.set(content, {
		position: "relative",
		zIndex: 2,
		opacity: 0,
	});
}

export function projectEntry(tl: gsap.core.Timeline, content: HTMLElement): void {
	gsap.set(content, { opacity: 0 });
	tl.to(content, {
		opacity: 1,
		duration: DURATION,
		ease: EASE,
		onComplete: () => {
			gsap.set(content, { clearProps: "opacity,position,zIndex" });
		},
	});
}
