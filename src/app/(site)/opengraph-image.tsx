import { OG_SIZE, buildHomeOgImage } from "@/lib/og";

export const alt = "Benjamin Wagner — Freelance Frontend Developer";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OgImage() {
	return buildHomeOgImage();
}
