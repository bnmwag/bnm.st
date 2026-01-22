import { Link } from "@/components/layout/link";
import cn from "clsx";
import type { ComponentProps, FC } from "react";

interface INavigationProps extends ComponentProps<"div"> {}

export const Navigation: FC<INavigationProps> = ({ className, ...props }) => {
	const age = Math.floor((Date.now() - new Date("2005-06-28").getTime()) / (1000 * 60 * 60 * 24 * 365.25));

	return (
		<header className={cn("fixed inset-x-0 top-0 z-40 pt-4 mix-blend-difference", className)} {...props}>
			<div className="layout-grid">
				<div className="col-span-2 flex items-start">
					<Link href={"/"} className="inline-block text-caption">
						Benjamin Wagner
					</Link>
				</div>
				<div className="col-span-2">
					<p className="text-caption">Based in austria,</p>
					<p className="text-caption">working worldwide.</p>
				</div>
				<div className="col-span-3">
					<p className="text-balance text-caption">
						{age}/yo frontend developer focused on crafting polished, high-quality digital experiences.
					</p>
				</div>
				<nav className="col-span-2 col-start-10">
					<ul className="space-y-2">
						<li className="block h-fit text-[clamp(.625rem,.5vw,.75rem)] leading-none ">
							<Link
								href="/resume"
								className="-translate-x-1.75 hover:translate-0 relative inline-flex h-3 w-fit items-center text-caption transition-transform duration-short ease-default before:aspect-square before:h-1.75 before:rotate-90 before:scale-0 before:bg-foreground before:transition-all before:duration-short before:ease-default after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-foreground after:transition-transform after:duration-short after:ease-default hover:after:origin-left hover:after:scale-x-100 hover:before:mr-2 hover:before:rotate-0 hover:before:scale-100"
							>
								Resume
							</Link>
						</li>
						<li className="block h-fit text-[clamp(.625rem,.5vw,.75rem)] leading-none ">
							<Link
								href="/imprint"
								className="-translate-x-1.75 hover:translate-0 relative inline-flex h-3 w-fit items-center text-caption transition-transform duration-short ease-default before:aspect-square before:h-1.75 before:rotate-90 before:scale-0 before:bg-foreground before:transition-all before:duration-short before:ease-default after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-foreground after:transition-transform after:duration-short after:ease-default hover:after:origin-left hover:after:scale-x-100 hover:before:mr-2 hover:before:rotate-0 hover:before:scale-100"
							>
								Imprint
							</Link>
						</li>
						<li className="block h-fit text-[clamp(.625rem,.5vw,.75rem)] leading-none ">
							<Link
								href="/privacy"
								className="-translate-x-1.75 hover:translate-0 relative inline-flex h-3 w-fit items-center text-caption transition-transform duration-short ease-default before:aspect-square before:h-1.75 before:rotate-90 before:scale-0 before:bg-foreground before:transition-all before:duration-short before:ease-default after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-foreground after:transition-transform after:duration-short after:ease-default hover:after:origin-left hover:after:scale-x-100 hover:before:mr-2 hover:before:rotate-0 hover:before:scale-100"
							>
								Privacy
							</Link>
						</li>
					</ul>
				</nav>
				<div className="col-start-12 flex items-start">
					<Link
						href={"info"}
						className="w-full bg-foreground px-2 py-0.5 text-left font-medium text-[clamp(.625rem,.5vw,.75rem)] text-background uppercase leading-none"
					>
						Info
					</Link>
				</div>
			</div>
		</header>
	);
};
