import { OG_SIZE, buildSubPageOgImage } from "@/lib/og";

export const alt = "Resume — Benjamin Wagner";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OgImage() {
	return buildSubPageOgImage({ title: "Resume" });
}
