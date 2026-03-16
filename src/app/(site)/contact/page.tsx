import type { Metadata, NextPage } from "next";

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
	},
};

const ContactPage: NextPage = () => {
	return <div id="main-content" className="h-svh" />;
};

export default ContactPage;
