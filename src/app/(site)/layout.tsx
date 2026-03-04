import "./globals.css";

import { Grid } from "@/components/dev";
import Noise from "@/components/gl/noise";
import { Navigation } from "@/components/layout/navigation";
import { PageTransition } from "@/features/page-transitions/components/page-transitions";
import { TransitionProvider } from "@/features/page-transitions/context/page-transition.context";
import { Analytics } from "@vercel/analytics/react";
import { fonts } from "./fonts";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${fonts.sans.variable} bg-black text-black`}>
				<TransitionProvider>
					<PageTransition>
						<Navigation />
						<div className="pointer-events-none fixed inset-0 z-50 flex flex-col justify-between" aria-hidden="true">
							{Array.from({ length: 200 }).map((_, index) => (
								<div key={`tv_line-${index + 1}`} className="h-px w-full bg-foreground/10" />
							))}
							<Noise patternAlpha={25} />
						</div>
						<main className="page-content min-h-svh w-full bg-white antialiased">
							<div data-page-wrapper className="opacity-0">
								{children}
							</div>
						</main>
					</PageTransition>
				</TransitionProvider>
				<Grid />
				<Analytics />
			</body>
		</html>
	);
}
