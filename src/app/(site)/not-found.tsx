"use client";

import { Wrapper } from "@/components/layout";
import { ScrambleText } from "@/components/scramble-text";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import Link from "next/link";
import { type FC, useCallback, useEffect, useRef } from "react";
import { defaultPatterns } from "web-haptics";
import { useWebHaptics } from "web-haptics/react";

const SCRAMBLE_CHARS = "\u2599\u259A\u259E\u259D\u2580\u2596\u259C\u259B\u259F";
const SCRAMBLE_DURATION = 600;
const SCRAMBLE_INTERVAL = 3000;

const ScrambleTextInfinite: FC<{ text: string; className?: string }> = ({ text, className }) => {
	const ref = useRef<HTMLSpanElement>(null);
	const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const reducedMotion = useReducedMotion();

	const scramble = useCallback(() => {
		if (reducedMotion) return;
		const el = ref.current;
		if (!el) return;
		if (rafRef.current) clearTimeout(rafRef.current);

		const framesPerChar = 4;
		const totalFrames = text.length * framesPerChar;
		const frameInterval = SCRAMBLE_DURATION / totalFrames;
		let frame = 0;

		const tick = () => {
			const resolved = Math.floor(frame / framesPerChar);
			el.textContent = text
				.split("")
				.map((c, i) => {
					if (c === " ") return " ";
					if (i < resolved) return c;
					return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
				})
				.join("");
			frame++;
			if (frame <= totalFrames) {
				rafRef.current = setTimeout(tick, frameInterval);
			} else {
				el.textContent = text;
			}
		};
		tick();
	}, [text, reducedMotion]);

	useEffect(() => {
		scramble();
		const interval = setInterval(scramble, SCRAMBLE_INTERVAL);
		return () => {
			clearInterval(interval);
			if (rafRef.current) clearTimeout(rafRef.current);
		};
	}, [scramble]);

	return (
		<span ref={ref} className={className}>
			{text}
		</span>
	);
};

export default function NotFound() {
	const { trigger } = useWebHaptics({ debug: true });
	const haptic = () => trigger(defaultPatterns.soft);

	return (
		<Wrapper>
			<article id="main-content" className="relative h-svh pt-[25vh] pb-[25vh] md:pb-4">
				<div className="layout-grid h-full items-start gap-y-16">
					<div className="col-span-6 flex h-full items-end gap-6">
						<div className="space-y-5">
							<p className="text-left text-caption leading-relaxed">
								The page you&apos;re looking for doesn&apos;t exist or has been moved.
							</p>
							<h1 className="text-[clamp(2em,5vw,5.5em)] uppercase leading-[.85] tracking-[-0.04em]">
								<ScrambleTextInfinite text="Not Found" />
							</h1>
						</div>
					</div>
					<div className="col-span-6 flex h-full items-end justify-end">
						<Link
							href="/"
							onClick={haptic}
							className="group relative block overflow-hidden bg-background px-[0.6em] py-[0.15em] font-medium text-[clamp(2rem,5vw,3.5rem)] uppercase leading-none"
						>
							<span className="absolute inset-0 origin-right scale-x-0 bg-foreground transition-transform duration-short ease-default group-hover:origin-left group-hover:scale-x-100" />
							<ScrambleText className="text-foreground transition-colors duration-short ease-default group-hover:text-background">
								Back to Home
							</ScrambleText>
						</Link>
					</div>
				</div>
			</article>
		</Wrapper>
	);
}
