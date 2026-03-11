"use client";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { CookieBanner } from "@c15t/react";
import cn from "clsx";
import { type FC, useCallback, useEffect, useRef } from "react";

const SCRAMBLE_CHARS = "\u2599\u259A\u259E\u259D\u2580\u2596\u259C\u259B\u259F";
const SCRAMBLE_DURATION = 400;
const SCRAMBLE_FRAMES_PER_CHAR = 4;

interface IBannerButtonProps {
	label: string;
	variant: "primary" | "secondary";
}

const BannerButton: FC<IBannerButtonProps> = ({ label, variant }) => {
	const textRef = useRef<HTMLSpanElement>(null);
	const btnRef = useRef<HTMLSpanElement>(null);
	const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const reducedMotion = useReducedMotion();

	useEffect(() => {
		const el = btnRef.current;
		if (!el) return;
		el.style.width = `${el.offsetWidth}px`;
	}, []);

	const runScramble = useCallback(() => {
		if (reducedMotion) return;
		const el = textRef.current;
		if (!el) return;
		if (rafRef.current) clearTimeout(rafRef.current);

		let frame = 0;
		const totalFrames = label.length * SCRAMBLE_FRAMES_PER_CHAR;
		const frameInterval = SCRAMBLE_DURATION / totalFrames;

		const tick = () => {
			const resolved = Math.floor(frame / SCRAMBLE_FRAMES_PER_CHAR);
			el.textContent = label
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
				el.textContent = label;
			}
		};
		tick();
	}, [label, reducedMotion]);

	return (
		<span
			ref={btnRef}
			onMouseEnter={runScramble}
			className={cn(
				"group relative inline-flex cursor-pointer items-center overflow-hidden whitespace-nowrap px-2 py-0.5 font-medium text-[clamp(.625rem,.5vw,.75rem)] uppercase leading-none",
				variant === "primary" ? "bg-foreground text-background" : "border border-foreground/20 text-foreground",
			)}
		>
			<span
				className={cn(
					"absolute inset-0 transition-transform duration-short ease-default",
					variant === "primary"
						? "origin-right scale-x-0 bg-background group-hover:origin-left group-hover:scale-x-100"
						: "origin-right scale-x-0 bg-foreground group-hover:origin-left group-hover:scale-x-100",
				)}
			/>
			<span
				ref={textRef}
				className={cn(
					"relative transition-colors duration-short ease-default",
					variant === "primary" ? "group-hover:text-foreground" : "group-hover:text-background",
				)}
			>
				{label}
			</span>
		</span>
	);
};

export const CustomCookieBanner: FC = () => {
	return (
		<CookieBanner.Root className="w-full!">
			<CookieBanner.Card className="border! fixed! transform-none! right-2! bottom-2! left-auto! z-500! w-auto! max-w-sm! rounded-none! border-foreground/10! bg-background! p-0! shadow-none!">
				<CookieBanner.Header className="space-y-2! bg-transparent! p-2! pb-2!">
					<CookieBanner.Title className="uppercase! m-0! font-medium! text-[clamp(.625rem,.5vw,.75rem)]! text-foreground! leading-none! tracking-normal!">
						Your Privacy is Valuable
					</CookieBanner.Title>
					<CookieBanner.Description className="mt-2! text-caption! text-foreground/50! leading-normal!">
						This site uses cookies for analytics. No tracking, no ads — just understanding what works.
					</CookieBanner.Description>
				</CookieBanner.Header>
				<CookieBanner.Footer className="flex! items-center! gap-2! border-0! bg-transparent! p-2!">
					<CookieBanner.RejectButton
						themeKey="banner.footer.reject-button"
						className="m-0! border-0! bg-transparent! p-0! shadow-none!"
					>
						<BannerButton label="Decline" variant="secondary" />
					</CookieBanner.RejectButton>
					<CookieBanner.AcceptButton
						themeKey="banner.footer.accept-button"
						className="m-0! border-0! bg-transparent! p-0! shadow-none!"
					>
						<BannerButton label="Accept" variant="primary" />
					</CookieBanner.AcceptButton>
					<CookieBanner.CustomizeButton
						themeKey="banner.footer.customize-button"
						className="m-0! ml-auto! border-0! bg-transparent! p-0! shadow-none!"
					>
						<BannerButton label="Manage" variant="secondary" />
					</CookieBanner.CustomizeButton>
				</CookieBanner.Footer>
			</CookieBanner.Card>
		</CookieBanner.Root>
	);
};
