import "./globals.css";

import { ViewTransitions } from "next-view-transitions";

import { Grid } from "@/components/dev";
import { Analytics } from "@vercel/analytics/react";
import { fonts } from "./fonts";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ViewTransitions>
			<html lang="en">
				<body className={`${fonts.sans.variable} bg-background text-foreground antialiased`}>
					{children}
					<Grid />
					<Analytics />
				</body>
			</html>
		</ViewTransitions>
	);
}
