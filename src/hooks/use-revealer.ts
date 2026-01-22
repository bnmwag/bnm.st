import { useTransitionState } from "@/lib/transitions";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export const useRevealer = () => {
	const { startTransition, endTransition, isTransitioning } = useTransitionState();
	const scope = useRef<HTMLDivElement | null>(null); // attach to a wrapper if you can

	// Re-trigger transitions when coming back via browser history or bfcache restore
	useEffect(() => {
		const onPageShow = (e: PageTransitionEvent) => {
			if (e.persisted) {
				startTransition?.();
			}
		};
		const onPopState = () => {
			startTransition?.();
		};

		window.addEventListener("pageshow", onPageShow);
		window.addEventListener("popstate", onPopState);
		return () => {
			window.removeEventListener("pageshow", onPageShow);
			window.removeEventListener("popstate", onPopState);
		};
	}, [startTransition]);

	useGSAP(
		(context) => {
			if (!isTransitioning) return;

			// make sure elements exist (prevents no-op on cached DOM changes)
			const revealer = document.querySelector(".revealer");
			if (!revealer) return;

			const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });

			tl.to(revealer, {
				y: "-100%",
				duration: 2,
				delay: 1,
			});

			tl.call(() => endTransition(), undefined, "<50.33%");

			// cleanup if this runs again
			return () => tl.kill();
		},
		{ scope, dependencies: [isTransitioning] },
	);

	return { scope }; // attach to a wrapper around your revealer DOM, e.g. <div ref={scope} />
};
