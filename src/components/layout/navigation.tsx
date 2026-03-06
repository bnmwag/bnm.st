"use client";

import { Link } from "@/components/layout";
import { ScrambleText } from "@/components/scramble-text";
import { useScramble } from "@/hooks/use-scramble";
import cn from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { type ComponentProps, type FC, useEffect, useRef } from "react";
import { defaultPatterns } from "web-haptics";
import { useWebHaptics } from "web-haptics/react";

interface INavigationProps extends ComponentProps<"div"> {}

export const Navigation: FC<INavigationProps> = ({ className, ...props }) => {
	const router = useRouter();
	const pathname = usePathname();
	const age = Math.floor((Date.now() - new Date("2005-06-28").getTime()) / (1000 * 60 * 60 * 24 * 365.25));

	const isInfoOpen = pathname === "/info";
	const label = isInfoOpen ? "Back" : "Info";
	const { display: labelDisplay, scramble: labelScramble, reset: labelReset } = useScramble(label);
	const prevLabelRef = useRef(label);

	const { trigger } = useWebHaptics({ debug: true });

	// Scramble text whenever the label changes (Info ↔ Back)
	useEffect(() => {
		if (prevLabelRef.current !== label) {
			prevLabelRef.current = label;
			labelScramble();
		}
	}, [label, labelScramble]);

	const haptic = () => trigger(defaultPatterns.soft);

	const handleInfoClick = () => {
		haptic();
		if (isInfoOpen) {
			window.dispatchEvent(new CustomEvent("info:close"));
		} else {
			router.push("/info");
		}
	};

	return (
		<header className={cn("fixed inset-x-0 top-0 z-40 pt-8 text-background mix-blend-difference md:pt-4", className)} {...props}>
			<div className="layout-grid">
				<div className="col-span-4 flex items-start md:col-span-2">
					<Link
						href={"/"}
						onClick={haptic}
						className="relative inline-flex inline-block text-caption"
						aria-label="Home - Benjamin Wagner"
					>
						<ScrambleText className="transition-colors duration-short ease-default">Benjamin Wagner</ScrambleText>
					</Link>
				</div>
				<div className="col-span-2 max-md:hidden">
					<p className="text-caption">Based in austria,</p>
					<p className="text-caption">working worldwide.</p>
				</div>
				<div className="col-span-3 max-md:hidden">
					<p className="text-balance text-caption">
						{age}/yo frontend developer focused on crafting polished, high-quality digital experiences.
					</p>
				</div>
				<nav className="col-span-2 md:col-start-8" aria-label="Main navigation">
					<ul className="space-y-2">
						<li className="flex h-fit leading-none">
							<Link
								href="/resume"
								onClick={haptic}
								className="group relative inline-flex items-center overflow-hidden px-2 py-0.5 font-medium text-[clamp(.625rem,.5vw,.75rem)] uppercase leading-none"
							>
								<span className="absolute inset-0 origin-right scale-x-0 bg-background transition-transform duration-short ease-default group-hover:origin-left group-hover:scale-x-100" />
								<ScrambleText className="text-background transition-colors duration-short ease-default group-hover:text-foreground">
									Resume
								</ScrambleText>
							</Link>
						</li>
						<li className="flex h-fit leading-none">
							<Link
								href="/imprint"
								onClick={haptic}
								className="group relative inline-flex items-center overflow-hidden px-2 py-0.5 font-medium text-[clamp(.625rem,.5vw,.75rem)] uppercase leading-none"
							>
								<span className="absolute inset-0 origin-right scale-x-0 bg-background transition-transform duration-short ease-default group-hover:origin-left group-hover:scale-x-100" />
								<ScrambleText className="text-background transition-colors duration-short ease-default group-hover:text-foreground">
									Imprint
								</ScrambleText>
							</Link>
						</li>
						<li className="flex h-fit leading-none">
							<Link
								href="/privacy"
								onClick={haptic}
								className="group relative inline-flex items-center overflow-hidden px-2 py-0.5 font-medium text-[clamp(.625rem,.5vw,.75rem)] uppercase leading-none"
							>
								<span className="absolute inset-0 origin-right scale-x-0 bg-background transition-transform duration-short ease-default group-hover:origin-left group-hover:scale-x-100" />
								<ScrambleText className="text-background transition-colors duration-short ease-default group-hover:text-foreground">
									Privacy
								</ScrambleText>
							</Link>
						</li>
					</ul>
				</nav>
				<div className="col-span-4 col-start-9 flex items-start justify-end gap-x-4 md:col-span-2 md:col-start-11">
					<button
						type="button"
						onClick={handleInfoClick}
						onMouseEnter={labelScramble}
						onMouseLeave={labelReset}
						aria-label={isInfoOpen ? "Close info panel" : "Open info panel"}
						className="group relative overflow-hidden bg-background px-2 py-0.5 font-medium text-[clamp(.625rem,.5vw,.75rem)] uppercase leading-none"
					>
						<span className="absolute inset-0 origin-right scale-x-0 bg-foreground transition-transform duration-short ease-default group-hover:origin-left group-hover:scale-x-100" />
						{/* Invisible copy reserves the width of the longer word */}
						<span className="invisible" aria-hidden="true">
							Back
						</span>
						<span
							className="absolute inset-0 flex items-center justify-center text-foreground transition-colors duration-short ease-default group-hover:text-background"
							aria-label={label}
						>
							{labelDisplay}
						</span>
					</button>
					<Link
						href="/contact"
						onClick={haptic}
						className="group relative overflow-hidden bg-background px-2 py-0.5 font-medium text-[clamp(.625rem,.5vw,.75rem)] uppercase leading-none"
					>
						<span className="absolute inset-0 origin-right scale-x-0 bg-foreground transition-transform duration-short ease-default group-hover:origin-left group-hover:scale-x-100" />
						<ScrambleText className="text-foreground transition-colors duration-short ease-default group-hover:text-background">
							Contact
						</ScrambleText>
					</Link>
				</div>
			</div>
		</header>
	);
};
