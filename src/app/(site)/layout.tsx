import "./globals.css";

import { ConsentAnalytics } from "@/components/consent/consent-analytics";
import { ConsentManager } from "@/components/consent/consent-manager";
import { Grid } from "@/components/dev";
import Noise from "@/components/gl/noise";
import { GSAP } from "@/components/gsap";
import { ContactPanel } from "@/components/layout/contact-panel";
import { Info } from "@/components/layout/info";
import { Navigation } from "@/components/layout/navigation";
import { Preloader } from "@/components/layout/preloader";
import { PageTransition } from "@/features/page-transitions/components/page-transitions";
import { TransitionProvider } from "@/features/page-transitions/context/page-transition.context";
import type { Metadata, Viewport } from "next";
import { fonts } from "./fonts";

export const viewport: Viewport = {
	viewportFit: "cover",
	colorScheme: "light",
	themeColor: "#fff",
};

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

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${fonts.sans.variable} bg-black text-black`}>
				<ConsentManager>
					<a href="#main-content" className="skip-link">
						Skip to main content
					</a>
					<TransitionProvider>
						<PageTransition>
							<Navigation />
							<div
								className="-bottom-64 -top-64 motion-reduce-hidden pointer-events-none fixed inset-x-0 z-300 mix-blend-difference"
								aria-hidden="true"
							>
								<div className="pointer-events-none absolute top-0 left-0 hidden h-full w-full flex-col justify-between md:flex">
									{Array.from({ length: 200 }).map((_, index) => (
										<div key={`tv_line-${index + 1}`} className="h-px w-full bg-white/10" />
									))}
								</div>
								<Noise patternAlpha={25} />
							</div>
							<main className="page-content min-h-svh w-full bg-white antialiased">
								<div data-page-wrapper className="opacity-0">
									{children}
								</div>
							</main>
						</PageTransition>
						<Preloader />
						<Info />
						<ContactPanel />
						{modal}
						<GSAP />
					</TransitionProvider>
					<Grid />
					<ConsentAnalytics />
				</ConsentManager>
			</body>
		</html>
	);
}
