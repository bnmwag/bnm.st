import Link from "next/link";
import type { FC } from "react";

export const Footer: FC = () => {
	return (
		<footer className="relative z-10 grid grid-cols-1 gap-x-5 px-5 pb-12 max-md:border-t max-md:border-t-neutral-200 md:grid-cols-6 xl:grid-cols-12 max-md:dark:border-t-neutral-800">
			<div className="max-md:mt-12 max-md:mb-12 md:col-span-2 xl:col-start-2">
				<a href="/" className="hover:underline">
					Benjamin Wagner
				</a>
			</div>
			<div className="space-y-36 md:col-span-3 md:col-start-3 xl:col-start-4">
				<nav>
					<ul className="space-y-4">
						<li>
							<Link href="/resume" className="inline-link text-white">
								Resume
							</Link>
						</li>
						<li>
							<Link href="/imprint" className="inline-link text-white">
								Imprint
							</Link>
						</li>
						<li>
							<Link href="/privacy" className="inline-link text-white">
								Privacy
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</footer>
	);
};
