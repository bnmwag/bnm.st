import Link from "next/link";
import type { FC } from "react";

export const Footer: FC = () => {
	return (
		<footer className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12 gap-x-5 px-5 z-10 relative pb-12 max-md:dark:border-t-neutral-800 max-md:border-t-neutral-200 max-md:border-t">
			<div className="xl:col-start-2 md:col-span-2 max-md:mb-12 max-md:mt-12">
				<a href="/" className="hover:underline">
					Benjamin Wagner
				</a>
			</div>
			<div className="md:col-start-3 xl:col-start-4 md:col-span-3 space-y-36">
				<nav>
					<ul className="space-y-4">
						<li>
							<Link href="/resume" className="text-white inline-link">
								Resume
							</Link>
						</li>
						<li>
							<Link href="/imprint" className="text-white inline-link">
								Imprint
							</Link>
						</li>
						<li>
							<Link href="/privacy" className="text-white inline-link">
								Privacy
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</footer>
	);
};
