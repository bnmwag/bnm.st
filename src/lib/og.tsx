import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

async function loadFont() {
	const res = await fetch(
		"https://fonts.gstatic.com/s/zalandosans/v2/FwZ67-Asy1Em_lq_aK3hpr-RrktWHD54lnesO2lsVvrnhgw8zPbXoT_cODkT.ttf",
	);
	return res.arrayBuffer();
}

interface OgImageProps {
	title: string;
	subtitle?: string;
	label?: string;
}

export async function buildOgImage({ title, subtitle, label = "FREELANCE FRONTEND DEVELOPER" }: OgImageProps) {
	const fontData = await loadFont();

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				background: "#000",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: "48px 56px",
				fontFamily: "ZalandoSans",
				color: "#fff",
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* Scanlines */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage:
						"repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(255,255,255,0.035) 3px, rgba(255,255,255,0.035) 4px)",
					pointerEvents: "none",
				}}
			/>

			{/* Top bar */}
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-start",
					width: "100%",
				}}
			>
				<span
					style={{
						fontSize: 13,
						fontWeight: 700,
						letterSpacing: "0.08em",
						textTransform: "uppercase",
						opacity: 0.9,
					}}
				>
					BNM.ST
				</span>
				<span
					style={{
						fontSize: 13,
						fontWeight: 700,
						letterSpacing: "0.08em",
						textTransform: "uppercase",
						opacity: 0.4,
					}}
				>
					{label}
				</span>
			</div>

			{/* Main title */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 0,
					flex: 1,
					justifyContent: "center",
					paddingTop: 16,
				}}
			>
				<span
					style={{
						fontSize: title.length > 20 ? 88 : 104,
						fontWeight: 700,
						letterSpacing: "-0.04em",
						textTransform: "uppercase",
						lineHeight: 0.85,
						color: "#fff",
					}}
				>
					{title}
				</span>
			</div>

			{/* Bottom bar */}
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-end",
					width: "100%",
				}}
			>
				<span
					style={{
						fontSize: 13,
						fontWeight: 700,
						letterSpacing: "0.06em",
						textTransform: "uppercase",
						opacity: 0.4,
						maxWidth: 600,
					}}
				>
					{subtitle ?? "Based in Austria · Working worldwide"}
				</span>
				<span
					style={{
						fontSize: 13,
						fontWeight: 700,
						letterSpacing: "0.08em",
						textTransform: "uppercase",
						opacity: 0.25,
					}}
				>
					BENJAMIN WAGNER
				</span>
			</div>
		</div>,
		{
			...OG_SIZE,
			fonts: [{ name: "ZalandoSans", data: fontData, weight: 700, style: "normal" }],
		},
	);
}
