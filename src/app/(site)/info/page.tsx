import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Info",
	description:
		"Frontend developer and creative builder based in Austria. Services include frontend development, creative development, UI engineering, and prototyping.",
	alternates: { canonical: "https://bnm.st/info" },
	openGraph: {
		url: "https://bnm.st/info",
		title: "Info — Benjamin Wagner",
		description:
			"Frontend developer and creative builder based in Austria. Services include frontend development, creative development, UI engineering, and prototyping.",
	},
};

export default function InfoPage() {
	return <div id="main-content" className="h-svh" />;
}
