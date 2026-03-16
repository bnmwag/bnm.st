import { defaultEntry, defaultExit, defaultSetInitialState } from "./animations/default";
import { projectEntry, projectExit, projectSetInitialState } from "./animations/project";

export interface TransitionDef {
	exit: (content: HTMLElement) => gsap.core.Tween;
	setInitialState: (content: HTMLElement) => void;
	entry: (tl: gsap.core.Timeline, content: HTMLElement) => void;
	skipWrapperHide?: boolean;
}

const DEFAULT_TRANSITION: TransitionDef = {
	exit: defaultExit,
	setInitialState: defaultSetInitialState,
	entry: defaultEntry,
};

const PROJECT_TRANSITION: TransitionDef = {
	exit: projectExit,
	setInitialState: projectSetInitialState,
	entry: projectEntry,
	skipWrapperHide: true,
};

const registry: Record<string, TransitionDef> = {
	"project-to-project": PROJECT_TRANSITION,
};

export const OVERLAY_ROUTES = ["/info", "/contact"];

export const isOverlayRoute = (pathname: string): boolean => OVERLAY_ROUTES.includes(pathname);

export const NAMESPACE_MAP: Record<string, string> = {
	"/": "home",
	"/info": "info",
	"/contact": "contact",
	"/resume": "resume",
	"/imprint": "imprint",
	"/privacy": "privacy",
};

export function getNamespace(pathname: string): string {
	if (pathname.startsWith("/p/")) return "project";
	return NAMESPACE_MAP[pathname] ?? "default";
}

export function getTransition(fromNamespace: string, toNamespace: string): TransitionDef {
	const key = `${fromNamespace}-to-${toNamespace}`;
	return registry[key] ?? DEFAULT_TRANSITION;
}
