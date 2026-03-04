import { OG_SIZE, buildOgImage } from "@/lib/og";

export const alt = "Resume — Benjamin Wagner";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OgImage() {
	return buildOgImage({
		title: "Resume",
		subtitle: "4+ years · React · Next.js · WebGL · Motion · Awwwards HM",
		label: "EXPERIENCE & WORK",
	});
}
