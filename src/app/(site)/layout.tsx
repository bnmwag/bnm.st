import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
	metadataBase: new URL("https://bnm.st"),
	title: {
		default: "Benjamin Wagner — Freelance Frontend Developer",
		template: "%s — Benjamin Wagner",
	},
	description:
		"Freelance frontend & creative developer based in Austria. Building design-driven React & Next.js interfaces, WebGL experiences, and polished digital products for clients worldwide.",
	keywords: [
		"freelance frontend developer",
		"creative developer",
		"React developer",
		"Next.js developer",
		"WebGL developer",
		"UI engineer",
		"Figma to code",
		"interactive web design",
		"scroll animations",
		"Three.js",
		"Austria",
		"Benjamin Wagner",
	],
	authors: [{ name: "Benjamin Wagner", url: "https://bnm.st" }],
	creator: "Benjamin Wagner",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://bnm.st",
		siteName: "Benjamin Wagner",
		images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Benjamin Wagner — Freelance Frontend Developer" }],
	},
	twitter: {
		card: "summary_large_image",
		creator: "@bnmwag",
		site: "@bnmwag",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
	},
};

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
