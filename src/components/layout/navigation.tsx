"use client";

import { Link } from "@/components/layout";
import { ScrambleText } from "@/components/scramble-text";
import cn from "clsx";
import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, FC } from "react";

interface INavigationProps extends ComponentProps<"div"> {}

export const Navigation: FC<INavigationProps> = ({ className, ...props }) => {
	const router = useRouter();
	const pathname = usePathname();
	const age = Math.floor((Date.now() - new Date("2005-06-28").getTime()) / (1000 * 60 * 60 * 24 * 365.25));

	return (
		<header className={cn("fixed inset-x-0 top-0 z-40 pt-4 text-background mix-blend-difference", className)} {...props}>
			<div className="layout-grid">
				<div className="col-span-4 flex items-start md:col-span-2">
					<Link href={"/"} className="inline-block text-caption" aria-label="Home - Benjamin Wagner">
						Benjamin Wagner
					</Link>
				</div>
				<div className="col-span-2 max-md:hidden" aria-label="Location">
					<p className="text-caption">Based in austria,</p>
					<p className="text-caption">working worldwide.</p>
				</div>
				<div className="col-span-3 max-md:hidden" aria-label="About">
					<p className="text-balance text-caption">
						{age}/yo frontend developer focused on crafting polished, high-quality digital experiences.
					</p>
				</div>
				<nav className="col-span-2 md:col-start-10" aria-label="Main navigation">
					<ul className="space-y-2">
						<li className="block h-fit leading-none">
							<Link
								href="/resume"
								className="group relative inline-flex items-center overflow-hidden px-2 py-0.5 font-medium text-[clamp(.625rem,.5vw,.75rem)] uppercase leading-none"
							>
								<span className="absolute inset-0 origin-right scale-x-0 bg-background transition-transform duration-short ease-default group-hover:origin-left group-hover:scale-x-100" />
								<ScrambleText className="text-background transition-colors duration-short ease-default group-hover:text-foreground">Resume</ScrambleText>
							</Link>
						</li>
						<li className="block h-fit leading-none">
							<Link
								href="/imprint"
								className="group relative inline-flex items-center overflow-hidden px-2 py-0.5 font-medium text-[clamp(.625rem,.5vw,.75rem)] uppercase leading-none"
							>
								<span className="absolute inset-0 origin-right scale-x-0 bg-background transition-transform duration-short ease-default group-hover:origin-left group-hover:scale-x-100" />
								<ScrambleText className="text-background transition-colors duration-short ease-default group-hover:text-foreground">Imprint</ScrambleText>
							</Link>
						</li>
						<li className="block h-fit leading-none">
							<Link
								href="/privacy"
								className="group relative inline-flex items-center overflow-hidden px-2 py-0.5 font-medium text-[clamp(.625rem,.5vw,.75rem)] uppercase leading-none"
							>
								<span className="absolute inset-0 origin-right scale-x-0 bg-background transition-transform duration-short ease-default group-hover:origin-left group-hover:scale-x-100" />
								<ScrambleText className="text-background transition-colors duration-short ease-default group-hover:text-foreground">Privacy</ScrambleText>
							</Link>
						</li>
						<li className="block h-fit leading-none">
							<Link
								href="/contact"
								className="group relative inline-flex items-center overflow-hidden px-2 py-0.5 font-medium text-[clamp(.625rem,.5vw,.75rem)] uppercase leading-none"
							>
								<span className="absolute inset-0 origin-right scale-x-0 bg-background transition-transform duration-short ease-default group-hover:origin-left group-hover:scale-x-100" />
								<ScrambleText className="text-background transition-colors duration-short ease-default group-hover:text-foreground">Contact</ScrambleText>
							</Link>
						</li>
					</ul>
				</nav>
				<motion.div
					className="col-span-4 col-start-9 flex items-start justify-end md:col-span-1 md:col-start-12"
					animate={{
						opacity: pathname === "/" || pathname === "/info" ? 1 : 0,
						filter: pathname === "/" || pathname === "/info" ? "blur(0px)" : "blur(12px)",
						pointerEvents: pathname === "/" || pathname === "/info" ? "auto" : "none",
					}}
					transition={{ duration: 0.64, ease: [0.87, 0, 0.13, 1] }}
				>
					<button
						type="button"
						onClick={() => router.push("/info")}
						aria-label="Open info panel"
						className="group relative overflow-hidden bg-background px-2 py-0.5 font-medium text-[clamp(.625rem,.5vw,.75rem)] uppercase leading-none"
					>
						<span className="absolute inset-0 origin-right scale-x-0 bg-foreground transition-transform duration-short ease-default group-hover:origin-left group-hover:scale-x-100" />
						<ScrambleText className="text-foreground transition-colors duration-short ease-default group-hover:text-background">Info</ScrambleText>
					</button>
				</motion.div>
			</div>
		</header>
	);
};
