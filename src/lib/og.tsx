import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

async function loadFont() {
	const res = await fetch(
		"https://fonts.gstatic.com/s/zalandosans/v2/FwZ67-Asy1Em_lq_aK3hpr-RrktWHD54lnesO2lsVvrnhgw8zPbXoT_cODkT.ttf",
	);
	return res.arrayBuffer();
}

const pad = 56;

const caption = {
	fontSize: 11,
	fontWeight: 700,
	letterSpacing: "0.1em",
	textTransform: "uppercase" as const,
	color: "#000",
	opacity: 0.35,
	lineHeight: 1.4,
};

// ── Home OG: small role top-left, big name bottom-left ────────────────────────
export async function buildHomeOgImage() {
	const fontData = await loadFont();

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				background: "#fff",
				backgroundImage:
					"radial-gradient(rgba(0,0,0,0.10) 1px, transparent 1px)",
				backgroundSize: "3px 3px",
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
			<span style={{ ...caption }}>
				Freelance Creative Developer
			</span>

			{/* Bottom-left: name in two lines */}
			<div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
				<span
					style={{
						fontSize: 118,
						fontWeight: 700,
						letterSpacing: "-0.04em",
						textTransform: "uppercase",
						lineHeight: 0.85,
						color: "#000",
					}}
				>
					Benjamin
				</span>
				<span
					style={{
						fontSize: 118,
						fontWeight: 700,
						letterSpacing: "-0.04em",
						textTransform: "uppercase",
						lineHeight: 0.85,
						color: "#000",
					}}
				>
					Wagner
				</span>
			</div>
		</div>,
		{
			...OG_SIZE,
			fonts: [{ name: "ZalandoSans", data: fontData, weight: 700, style: "normal" }],
		},
	);
}

// ── Sub-page OG: small breadcrumb top-left, big page title bottom-left ────────
interface SubPageOgProps {
	title: string;
	titleSize?: number;
}

export async function buildSubPageOgImage({ title, titleSize = 140 }: SubPageOgProps) {
	const fontData = await loadFont();

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				background: "#fff",
				backgroundImage:
					"radial-gradient(rgba(0,0,0,0.10) 1px, transparent 1px)",
				backgroundSize: "3px 3px",
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
			<div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<span style={{ ...caption }}>Benjamin Wagner</span>
				<span style={{ ...caption }}>Freelance Frontend Developer</span>
			</div>

			{/* Bottom-left: page title */}
			<span
				style={{
					fontSize: titleSize,
					fontWeight: 700,
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
			fonts: [{ name: "ZalandoSans", data: fontData, weight: 700, style: "normal" }],
		},
	);
}
