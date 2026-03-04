import { defaultEntry, defaultExit, defaultSetInitialState } from "./animations/default";

export interface TransitionDef {
	exit: (content: HTMLElement) => gsap.core.Tween;
	setInitialState: (content: HTMLElement) => void;
	entry: (tl: gsap.core.Timeline, content: HTMLElement) => void;
}

const DEFAULT_TRANSITION: TransitionDef = {
	exit: defaultExit,
	setInitialState: defaultSetInitialState,
	entry: defaultEntry,
};

const registry: Record<string, TransitionDef> = {};

export const NAMESPACE_MAP: Record<string, string> = {
	"/": "home",
	"/info": "info",
	"/resume": "resume",
	"/imprint": "imprint",
	"/privacy": "privacy",
};

export function getNamespace(pathname: string): string {
	return NAMESPACE_MAP[pathname] ?? "default";
}

export function getTransition(fromNamespace: string, toNamespace: string): TransitionDef {
	const key = `${fromNamespace}-to-${toNamespace}`;
	return registry[key] ?? DEFAULT_TRANSITION;
}
