import type { Metadata, NextPage } from "next";
import { ContactPageClient } from "./page.client";

export const metadata: Metadata = {
	title: "Contact | Benjamin Wagner",
	description: "Get in touch — available for freelance work, collaborations, and interesting experiments.",
	openGraph: {
		url: "https://bnm.st/contact",
		title: "Contact | Benjamin Wagner",
		description: "Get in touch — available for freelance work, collaborations, and interesting experiments.",
		images: [
			{
				url: "https://bnm.st/og.jpg",
				width: 800,
				height: 600,
				alt: "Contact | Benjamin Wagner",
				type: "image/jpeg",
			},
		],
	},
};

const ContactPage: NextPage = () => {
	return <ContactPageClient />;
};

export default ContactPage;
