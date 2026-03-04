import { OG_SIZE, buildSubPageOgImage } from "@/lib/og";

export const alt = "Contact — Benjamin Wagner";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OgImage() {
	return buildSubPageOgImage({ title: "Let's build something.", titleSize: 92 });
}
