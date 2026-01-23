import { useTransitionState } from "@/lib/transitions";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export const useRevealer = () => {
	const { startTransition, endTransition, isTransitioning } = useTransitionState();
	const scope = useRef<HTMLDivElement | null>(null);

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
			const revealer = document.querySelector(".revealer") as HTMLElement;
			if (!revealer) return;

			if (!isTransitioning) {
				gsap.set(revealer, { y: "-100%" });
				return;
			}

			const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });

			tl.set(revealer, { y: "0%" });

			tl.to(revealer, {
				y: "-100%",
				duration: 2,
				delay: 1,
			});

			tl.call(() => endTransition(), undefined, "<50.33%");

			return () => tl.kill();
		},
		{ scope, dependencies: [isTransitioning] },
	);

	return { scope };
};
