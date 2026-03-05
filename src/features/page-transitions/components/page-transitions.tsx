"use client";

import {
	type TimelineAnimationFn,
	useTransition,
} from "@/features/page-transitions/context/page-transition.context";
import {
	type TransitionDef,
	getNamespace,
	getTransition,
} from "@/features/page-transitions/registry";
import { gsap } from "@/lib/gsap";
import { usePathname, useRouter } from "next/navigation";
import {
	type FC,
	type PropsWithChildren,
	useEffect,
	useLayoutEffect,
	useRef,
} from "react";

const LOCK_DURATION = 800;
const PAGE_ANIM_DELAY = 0.4;

interface IPageTransitionProps extends PropsWithChildren {}

export const PageTransition: FC<IPageTransitionProps> = ({ children }) => {
	const router = useRouter();
	const pathname = usePathname();
	const isTransitioning = useRef(false);
	const { getEntryAnimations, onPreloaderReady } = useTransition();

	// activeTransitionRef is set in the click handler before router.push.
	// Both useLayoutEffect and useEffect use it to detect a real navigation
	// (vs initial mount or Strict Mode re-invocation).
	const activeTransitionRef = useRef<TransitionDef | null>(null);

	const ghostRef = useRef<HTMLElement | null>(null);
	const exitTweenRef = useRef<gsap.core.Tween | null>(null);
	const prevPathnameRef = useRef(pathname);

	// ─── Pre-paint: hide new content before first frame ──────────────────────
	// Fires synchronously after React commits the DOM but before the browser
	// paints. Sets the new page's clip-path/z-index so it's hidden behind the
	// ghost (z-index:1) from the very first frame — no flash possible.
	useLayoutEffect(() => {
		if (pathname === "/info") return;
		// Coming back from /info — the page was already visible underneath,
		// no transition needed so don't hide the wrapper.
		if (prevPathnameRef.current === "/info") return;

		const content = document.querySelector<HTMLElement>(".page-content");
		if (!content) return;

		// Reset wrapper — GSAP inline opacity:1 from the previous navigation
		// overrides the Tailwind opacity-0 class, so new content would flash
		// visible before the entry animation fires.
		const wrapper = content.querySelector<HTMLElement>("[data-page-wrapper]");
		if (wrapper) gsap.set(wrapper, { opacity: 0 });

		if (!activeTransitionRef.current) return;

		// Clear residual transform/clip props from any interrupted previous
		// entry animation (covers popstate and rapid navigation).
		gsap.set(content, { clearProps: "clipPath,x,y,scale,opacity" });
		activeTransitionRef.current.setInitialState(content);
	}, [pathname]);

	// ─── Entry animation ──────────────────────────────────────────────────────
	useEffect(() => {
		const prevPathname = prevPathnameRef.current;
		prevPathnameRef.current = pathname;

		const content = document.querySelector<HTMLElement>(".page-content");
		if (!content) return;

		// /info renders its own fixed overlay. Kill any running entry animation
		// and clear position/zIndex from .page-content — if left set, it creates
		// a stacking context that traps the Info panel below the nav.
		if (pathname === "/info") {
			gsap.killTweensOf(content);
			gsap.set(content, { clearProps: "clipPath,position,zIndex" });
			const wrapper = content.querySelector<HTMLElement>("[data-page-wrapper]");
			if (wrapper) gsap.set(wrapper, { opacity: 1 });
			return;
		}

		// Coming back from /info — page was already visible, just ensure wrapper
		// is visible and skip all transition/entry animations.
		if (prevPathname === "/info") {
			const wrapper = content.querySelector<HTMLElement>("[data-page-wrapper]");
			if (wrapper) gsap.set(wrapper, { opacity: 1 });
			return;
		}

		const entryTl = gsap.timeline();

		// Transition clip/slide only runs on real navigations, not initial load.
		if (activeTransitionRef.current) {
			activeTransitionRef.current.entry(entryTl, content);
		}

		let cancelled = false;

		const runPageAnimation = () => {
			if (cancelled) return;

			const fn = getEntryAnimations();
			const wrapper = content.querySelector<HTMLElement>("[data-page-wrapper]");

			if (fn) {
				if (fn.length > 0) {
					// TimelineAnimationFn: fn runs synchronously, adding tweens to pageTl.
					// Reveal wrapper after fn so any initial-state sets in fn fire first.
					const pageTl = gsap.timeline();
					(fn as TimelineAnimationFn)(pageTl);
					entryTl.add(pageTl, `<${PAGE_ANIM_DELAY}`);
					if (wrapper)
						entryTl.call(() => {
							gsap.set(wrapper, { opacity: 1 });
						});
				} else {
					// FreeAnimationFn: fn runs inside a GSAP call on the first tick.
					// Reveal wrapper after fn so SplitText chars are at y:100% before
					// wrapper becomes visible — prevents a flash of unsplit text.
					entryTl.call(
						() => {
							(fn as () => void)();
							if (wrapper) gsap.set(wrapper, { opacity: 1 });
						},
						[],
						`<${PAGE_ANIM_DELAY}`,
					);
				}
			} else if (wrapper) {
				// No page animation registered — just reveal the wrapper.
				gsap.set(wrapper, { opacity: 1 });
			}
		};

		// On initial hard load (no active transition): wait for the preloader to
		// signal before revealing the page — so content animates in as the
		// overlay wipes away. On internal navigation the preloader is already
		// done, so onPreloaderReady fires the callback synchronously.
		if (!activeTransitionRef.current) {
			onPreloaderReady(runPageAnimation);
		} else {
			runPageAnimation();
		}

		return () => {
			cancelled = true;
			entryTl.kill();
		};
	}, [pathname]);

	// ─── Exit animation (ghost clone) ────────────────────────────────────────
	useEffect(() => {
		const handleClick = (e: Event) => {
			const anchor = e.currentTarget as HTMLAnchorElement;
			const href = anchor.getAttribute("href");
			if (!href) return;

			const url = new URL(href, window.location.origin).pathname;
			if (url === pathname || isTransitioning.current) return;

			e.preventDefault();
			isTransitioning.current = true;

			// Clean up any ghost from an aborted transition.
			if (ghostRef.current) {
				exitTweenRef.current?.kill();
				exitTweenRef.current = null;
				ghostRef.current.remove();
				ghostRef.current = null;
			}

			const fromNs = getNamespace(pathname);
			const toNs = getNamespace(url);
			const transition = getTransition(fromNs, toNs);
			activeTransitionRef.current = transition;

			const content = document.querySelector<HTMLElement>(".page-content");
			if (content) {
				// Kill any ongoing entry animation and reset only transition-level
				// inline styles on the wrapper. Using clearProps:"all" would wipe
				// child elements GSAP styles (hero_content opacity, char transforms)
				// making the ghost look wrong. Only clear what the transition set
				// on the wrapper itself.
				gsap.killTweensOf(content);
				gsap.set(content, {
					clearProps: "clipPath,x,y,scale,opacity,position,zIndex",
				});

				// Snapshot the current page. The ghost sits at z-index:1 so the
				// incoming page (z-index:2, set by useLayoutEffect) renders on top.
				const ghost = content.cloneNode(true) as HTMLElement;
				Object.assign(ghost.style, {
					position: "fixed",
					top: `-${window.scrollY}px`,
					left: "0",
					width: `${content.offsetWidth}px`,
					height: `${content.offsetHeight}px`,
					zIndex: "1",
					pointerEvents: "none",
					margin: "0",
					overflow: "hidden",
				});
				document.body.appendChild(ghost);
				ghostRef.current = ghost;

				// Hide original immediately via direct style — not just GSAP — so
				// it is invisible even if React 18 concurrent mode paints before
				// useLayoutEffect fires. Both are cleared by clearProps in
				// useLayoutEffect before setInitialState re-applies the correct hide.
				content.style.opacity = "0";
				content.style.clipPath = "inset(0% 0% 100% 0%)";

				const exitTween = transition.exit(ghost);
				exitTween.eventCallback("onComplete", () => {
					if (ghostRef.current === ghost) {
						ghost.remove();
						ghostRef.current = null;
					}
				});
				exitTweenRef.current = exitTween;
			}

			// Navigate immediately — exit and entry run in parallel.
			router.push(url);

			setTimeout(() => {
				isTransitioning.current = false;
			}, LOCK_DURATION);
		};

		const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]');
		for (const link of links) link.addEventListener("click", handleClick);
		return () => {
			for (const link of links) link.removeEventListener("click", handleClick);
		};
	});

	return <>{children}</>;
};
