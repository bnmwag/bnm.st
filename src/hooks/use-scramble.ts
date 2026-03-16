"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "\u2599\u259A\u259Eakiedzek\u259D\u2580\u2596\u259C\u259B\u259F\u2599\u259A\u259E\u259D\u2580\u2596akiedzek";
const FRAMES_PER_CHAR = 4;
const TARGET_DURATION = 600;

export function useScramble(original: string) {
	const [display, setDisplay] = useState(original);
	const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const safetyRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const genRef = useRef(0);

	const clearTimers = () => {
		if (rafRef.current) clearTimeout(rafRef.current);
		if (safetyRef.current) clearTimeout(safetyRef.current);
		rafRef.current = null;
		safetyRef.current = null;
	};

	const reset = useCallback(() => {
		genRef.current++;
		clearTimers();
		setDisplay(original);
	}, [original]);

	useEffect(() => {
		reset();
	}, [reset]);

	const scramble = useCallback(() => {
		clearTimers();
		const gen = ++genRef.current;

		let frame = 0;
		const totalFrames = original.length * FRAMES_PER_CHAR;
		const frameInterval = TARGET_DURATION / totalFrames;

		const tick = () => {
			if (genRef.current !== gen) return;

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
				rafRef.current = null;
				if (safetyRef.current) clearTimeout(safetyRef.current);
				safetyRef.current = null;
			}
		};

		safetyRef.current = setTimeout(() => {
			if (genRef.current === gen) {
				setDisplay(original);
			}
		}, TARGET_DURATION + 200);

		tick();
	}, [original]);

	return { display, scramble, reset };
}
