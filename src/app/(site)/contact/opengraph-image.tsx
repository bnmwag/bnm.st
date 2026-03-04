import { OG_SIZE, buildOgImage } from "@/lib/og";

export const alt = "Contact — Benjamin Wagner";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OgImage() {
	return buildOgImage({
		title: "Let's build something.",
		subtitle: "Available for freelance projects and collaborations · hello@bnm.st",
		label: "GET IN TOUCH",
	});
}
