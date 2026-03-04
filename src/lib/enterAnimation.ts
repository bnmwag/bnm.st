import { gsap, SplitText } from "@/lib/gsap";

function wrapLines(lines: Element[]) {
	for (const line of lines) {
		const wrapper = document.createElement("div");
		wrapper.style.cssText =
			"overflow:hidden;line-height:100%;transform:translateZ(0);backface-visibility:hidden;margin-bottom:0.1rem;";
		line.parentNode?.insertBefore(wrapper, line);
		wrapper.appendChild(line);
	}
	gsap.set(lines, { y: "100%", force3D: true, willChange: "transform" });
}

export function enterAnimation(container: HTMLElement, delay = 0): () => void {
	const h1 = container.querySelector("h1");
	const content = container.querySelector(".hero_content");
	const linesRight = container.querySelectorAll(".inner_linesright");
	const linesLeft = container.querySelectorAll(".inner_linesleft");
	const ps = container.querySelectorAll(".anim_p");
	const ps2 = container.querySelectorAll(".anim_p2");

	if (!h1) return () => {};

	gsap.set(h1, { opacity: 1 });

	const splitH1 = new SplitText(h1, { type: "chars", aria: "none" });
	const splitPs = new SplitText(Array.from(ps) as HTMLElement[], {
		type: "lines",
		aria: "none",
	});
	const splitPs2 = new SplitText(Array.from(ps2) as HTMLElement[], {
		type: "lines",
		aria: "none",
	});

	gsap.set(splitH1.chars, { y: "100%", force3D: true, rotateX: 60 });
	wrapLines(splitPs.lines as Element[]);
	wrapLines(splitPs2.lines as Element[]);

	gsap.set(linesRight, {
		x: "-100%",
		force3D: true,
		backfaceVisibility: "hidden",
	});
	gsap.set(linesLeft, {
		x: "-100%",
		force3D: true,
		backfaceVisibility: "hidden",
	});

	if (content) gsap.set(content, { opacity: 1 });

	const tl = gsap.timeline({ defaults: { force3D: true, lazy: false } });

	tl.to(
		splitH1.chars,
		{ rotateX: 0, y: 0, duration: 2.1, stagger: 0.035, ease: "expo.out" },
		delay,
	)
		.to(
			splitPs.lines,
			{
				y: 0,
				duration: 1.65,
				stagger: { amount: 0.08, from: "end" },
				ease: "power3.out",
			},
			window.innerWidth < 900 ? delay : delay + 0.2,
		)
		.to(
			splitPs2.lines,
			{
				y: 0,
				duration: 1.65,
				stagger: { amount: 0.08, from: "end" },
				ease: "power3.out",
			},
			delay + 0.2,
		)
		.to(
			linesRight,
			{
				x: 0,
				duration: 1,
				stagger: { amount: 0.25, from: "start" },
				ease: "power2.inOut",
			},
			0,
		)
		.to(
			linesLeft,
			{
				x: 0,
				duration: 1,
				stagger: { amount: 0.25, from: "start" },
				ease: "power2.inOut",
			},
			0,
		);

	return () => {
		tl.kill();
		splitH1.revert();
		splitPs.revert();
		splitPs2.revert();
	};
}
