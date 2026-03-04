"use client";

import { useScramble } from "@/hooks/use-scramble";
import cn from "clsx";
import { type FC, useEffect, useRef } from "react";

interface ScrambleTextProps {
	children: string;
	className?: string;
}

export const ScrambleText: FC<ScrambleTextProps> = ({ children, className }) => {
	const ref = useRef<HTMLSpanElement>(null);
	const { display, scramble, reset } = useScramble(children);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const parent = el.parentElement;
		if (!parent) return;
		parent.addEventListener("mouseenter", scramble);
		parent.addEventListener("mouseleave", reset);
		return () => {
			parent.removeEventListener("mouseenter", scramble);
			parent.removeEventListener("mouseleave", reset);
		};
	}, [scramble, reset]);

	return (
		<>
			<span className="invisible" aria-hidden="true">{children}</span>
			<span
				ref={ref}
				className={cn("absolute inset-0 flex items-center justify-center", className)}
				aria-hidden="true"
			>
				{display}
			</span>
		</>
	);
};
