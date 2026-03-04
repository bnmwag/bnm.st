"use client";

import { useCallback, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const FRAMES_PER_CHAR = 4;
const TARGET_DURATION = 600; // ms — fixed total, so all words take the same time

export function useScramble(original: string) {
	const [display, setDisplay] = useState(original);
	const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const scramble = useCallback(() => {
		if (rafRef.current) clearTimeout(rafRef.current);

		let frame = 0;
		const totalFrames = original.length * FRAMES_PER_CHAR;
		const frameInterval = TARGET_DURATION / totalFrames;

		const tick = () => {
			const resolved = Math.floor(frame / FRAMES_PER_CHAR);
			const next = original
				.split("")
				.map((char, i) => {
					if (i < resolved) return char;
					return CHARS[Math.floor(Math.random() * CHARS.length)];
				})
				.join("");

			setDisplay(next);
			frame++;

			if (frame <= totalFrames) {
				rafRef.current = setTimeout(tick, frameInterval);
			} else {
				setDisplay(original);
			}
		};

		tick();
	}, [original]);

	const reset = useCallback(() => {
		if (rafRef.current) clearTimeout(rafRef.current);
		setDisplay(original);
	}, [original]);

	return { display, scramble, reset };
}
