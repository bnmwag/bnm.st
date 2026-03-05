import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

const FONT_700_URL =
	"https://fonts.gstatic.com/s/zalandosans/v2/FwZ67-Asy1Em_lq_aK3hpr-RrktWHD54lnesO2lsVvrnhgw8zPbXoT_cODkT.ttf";
const FONT_300_URL =
	"https://fonts.gstatic.com/s/zalandosans/v2/FwZ67-Asy1Em_lq_aK3hpr-RrktWHD54lnesO2lsVvrnhgw8zPbXoT9lPzkT.ttf";
const FONT_500_URL =
	"https://fonts.gstatic.com/s/zalandosans/v2/FwZ67-Asy1Em_lq_aK3hpr-RrktWHD54lnesO2lsVvrnhgw8zPbXoT8JPzkT.ttf";

async function loadFonts() {
	const [bold, medium, light] = await Promise.all([
		fetch(FONT_700_URL).then((r) => r.arrayBuffer()),
		fetch(FONT_500_URL).then((r) => r.arrayBuffer()),
		fetch(FONT_300_URL).then((r) => r.arrayBuffer()),
	]);
	return { bold, medium, light };
}

const pad = 20;

const caption: React.CSSProperties = {
	fontWeight: 500,
	fontFamily: "ZalandoSans",
	textTransform: "uppercase",
	color: "#000",
	lineHeight: 1,
};

// ── Home OG: small role top-left, big name bottom-left ────────────────────────
export async function buildHomeOgImage() {
	const { bold, medium, light } = await loadFonts();

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				background: "#fff",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: pad,
				fontFamily: "ZalandoSans",
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* Top-left: role */}
			<span style={{ ...caption }}>Freelance Creative Developer</span>

			{/* Bottom-left: full name on one line */}
			<span
				style={{
					fontSize: 76,
					fontWeight: 300,
					letterSpacing: "-0.04em",
					textTransform: "uppercase",
					lineHeight: 1,
					color: "#000",
				}}
			>
				Benjamin Wagner
			</span>
		</div>,
		{
			...OG_SIZE,
			fonts: [
				{ name: "ZalandoSans", data: bold, weight: 700, style: "normal" },
				{ name: "ZalandoSans", data: medium, weight: 500, style: "normal" },
				{ name: "ZalandoSans", data: light, weight: 300, style: "normal" },
			],
		},
	);
}

// ── Sub-page OG: small breadcrumb top-left, big page title bottom-left ─────────
interface SubPageOgProps {
	title: string;
	titleSize?: number;
}

export async function buildSubPageOgImage({ title, titleSize = 140 }: SubPageOgProps) {
	const { bold, medium, light } = await loadFonts();

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				background: "#fff",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: pad,
				fontFamily: "ZalandoSans",
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* Top-left: breadcrumb */}
			<span style={{ ...caption }}>Benjamin Wagner - Freelance Frontend Developer</span>

			{/* Bottom-left: page title */}
			<span
				style={{
					fontSize: titleSize,
					fontWeight: 300,
					letterSpacing: "-0.04em",
					textTransform: "uppercase",
					lineHeight: 0.85,
					color: "#000",
				}}
			>
				{title}
			</span>
		</div>,
		{
			...OG_SIZE,
			fonts: [
				{ name: "ZalandoSans", data: bold, weight: 700, style: "normal" },
				{ name: "ZalandoSans", data: medium, weight: 500, style: "normal" },
				{ name: "ZalandoSans", data: light, weight: 300, style: "normal" },
			],
		},
	);
}
