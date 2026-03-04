import type { Metadata, NextPage } from "next";
import { ContactPageClient } from "./page.client";

export const metadata: Metadata = {
	title: "Contact",
	description:
		"Available for freelance projects, agency collaborations, and interesting experiments. Based in Austria, working with clients worldwide. Let's build something.",
	alternates: { canonical: "https://bnm.st/contact" },
	openGraph: {
		url: "https://bnm.st/contact",
		title: "Contact — Benjamin Wagner",
		description:
			"Available for freelance projects, agency collaborations, and interesting experiments. Based in Austria, working with clients worldwide.",
		images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Contact — Benjamin Wagner", type: "image/jpeg" }],
	},
};

const ContactPage: NextPage = () => {
	return <ContactPageClient />;
};

export default ContactPage;
