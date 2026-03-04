import { OG_SIZE, buildOgImage } from "@/lib/og";

export const alt = "Benjamin Wagner — Freelance Frontend Developer";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OgImage() {
	return buildOgImage({
		title: "Benjamin Wagner",
		subtitle: "Freelance frontend & creative developer · Based in Austria · Working worldwide",
	});
}
