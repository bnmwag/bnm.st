import "./globals.css";

import { ViewTransitions } from "next-view-transitions";

import { Dev } from "@/components/dev/dev";
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
					<Dev />
				</body>
			</html>
		</ViewTransitions>
	);
}
