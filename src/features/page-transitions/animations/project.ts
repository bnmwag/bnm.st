import { gsap } from "@/lib/gsap";

export function projectExit(ghost: HTMLElement): gsap.core.Tween {
	return gsap.to(ghost, { opacity: 0, duration: 0 });
}

export function projectSetInitialState(content: HTMLElement): void {
	gsap.set(content, {
		position: "relative",
		zIndex: 2,
	});
}

export function projectEntry(_tl: gsap.core.Timeline, content: HTMLElement): void {
	gsap.set(content, { clearProps: "position,zIndex" });
}
