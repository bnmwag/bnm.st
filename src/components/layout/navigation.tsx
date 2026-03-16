"use client";

import { Link } from "@/components/layout";
import { ScrambleText } from "@/components/scramble-text";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useScramble } from "@/hooks/use-scramble";
import cn from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { type ComponentProps, type FC, useEffect, useRef } from "react";
import { defaultPatterns } from "web-haptics";
import { useWebHaptics } from "web-haptics/react";

const age = Math.floor((Date.now() - new Date("2005-06-28").getTime()) / (1000 * 60 * 60 * 24 * 365.25));

const NAV_LINKS = [
	{ href: "/resume", label: "Resume" },
	{ href: "/imprint", label: "Imprint" },
	{ href: "/privacy", label: "Privacy" },
] as const;

interface INavigationProps extends ComponentProps<"div"> {}

export const Navigation: FC<INavigationProps> = ({ className, ...props }) => {
	const router = useRouter();
	const pathname = usePathname();

	const isInfoOpen = pathname === "/info";
	const isContactOpen = pathname === "/contact";

	const infoLabel = isInfoOpen ? "Back" : "Info";
	const contactLabel = isContactOpen ? "Back" : "Contact";

	const { display: infoLabelDisplay, scramble: infoLabelScramble, reset: infoLabelReset } = useScramble(infoLabel);
	const { display: contactLabelDisplay, scramble: contactLabelScramble, reset: contactLabelReset } = useScramble(contactLabel);

	const prevInfoLabelRef = useRef(infoLabel);
	const prevContactLabelRef = useRef(contactLabel);
	const reducedMotion = useReducedMotion();

	const { trigger } = useWebHaptics();

	useEffect(() => {
		if (prevInfoLabelRef.current !== infoLabel) {
			prevInfoLabelRef.current = infoLabel;
			reducedMotion ? infoLabelReset() : infoLabelScramble();
		}
	}, [infoLabel, infoLabelScramble, infoLabelReset, reducedMotion]);

	useEffect(() => {
		if (prevContactLabelRef.current !== contactLabel) {
			prevContactLabelRef.current = contactLabel;
			reducedMotion ? contactLabelReset() : contactLabelScramble();
		}
	}, [contactLabel, contactLabelScramble, contactLabelReset, reducedMotion]);

	const haptic = () => trigger(defaultPatterns.soft);

	const handleOverlayClick = (
		isOpen: boolean,
		closeEvent: string,
		otherIsOpen: boolean,
		targetRoute: string,
		resetFn: () => void,
	) => {
		haptic();
		resetFn();
		if (isOpen) {
			window.dispatchEvent(new CustomEvent(closeEvent));
		} else if (otherIsOpen) {
			router.replace(targetRoute);
		} else {
			router.push(targetRoute);
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
						{NAV_LINKS.map(({ href, label }) => (
							<li key={href} className="flex h-fit leading-none">
								<Link
									href={href}
									onClick={haptic}
									className="group relative inline-flex items-center overflow-hidden px-2 py-0.5 font-medium text-[clamp(.625rem,.5vw,.75rem)] uppercase leading-none"
								>
									<span className="absolute inset-0 origin-right scale-x-0 bg-background transition-transform duration-short ease-default group-hover:origin-left group-hover:scale-x-100" />
									<ScrambleText className="text-background transition-colors duration-short ease-default group-hover:text-foreground">
										{label}
									</ScrambleText>
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<div className="col-span-4 col-start-9 flex items-start justify-end gap-x-4 md:col-span-2 md:col-start-11">
					<button
						type="button"
						onClick={() => handleOverlayClick(isInfoOpen, "info:close", isContactOpen, "/info", infoLabelReset)}
						onMouseEnter={reducedMotion ? undefined : infoLabelScramble}
						onMouseLeave={reducedMotion ? undefined : infoLabelReset}
						aria-label={isInfoOpen ? "Close info panel" : "Open info panel"}
						className="group relative overflow-hidden bg-background px-2 py-0.5 font-medium text-[clamp(.625rem,.5vw,.75rem)] uppercase leading-none"
					>
						<span className="absolute inset-0 origin-right scale-x-0 bg-foreground transition-transform duration-short ease-default group-hover:origin-left group-hover:scale-x-100" />
						<span className="invisible" aria-hidden="true">
							Back
						</span>
						<span
							className="absolute inset-0 flex items-center justify-center text-foreground transition-colors duration-short ease-default group-hover:text-background"
							aria-label={infoLabel}
						>
							{infoLabelDisplay}
						</span>
					</button>
					<button
						type="button"
						onClick={() => handleOverlayClick(isContactOpen, "contact:close", isInfoOpen, "/contact", contactLabelReset)}
						onMouseEnter={reducedMotion ? undefined : contactLabelScramble}
						onMouseLeave={reducedMotion ? undefined : contactLabelReset}
						aria-label={isContactOpen ? "Close contact panel" : "Open contact panel"}
						className="group relative overflow-hidden bg-background px-2 py-0.5 font-medium text-[clamp(.625rem,.5vw,.75rem)] uppercase leading-none"
					>
						<span className="absolute inset-0 origin-right scale-x-0 bg-foreground transition-transform duration-short ease-default group-hover:origin-left group-hover:scale-x-100" />
						<span className="invisible" aria-hidden="true">
							Contact
						</span>
						<span
							className="absolute inset-0 flex items-center justify-center text-foreground transition-colors duration-short ease-default group-hover:text-background"
							aria-label={contactLabel}
						>
							{contactLabelDisplay}
						</span>
					</button>
				</div>
			</div>
		</header>
	);
};
