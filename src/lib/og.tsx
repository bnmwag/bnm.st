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

// ── Minimal pure-JS PNG encoder (no deps, works on Edge + Node) ───────────────
const CRC_TABLE = (() => {
	const t = new Uint32Array(256);
	for (let n = 0; n < 256; n++) {
		let c = n;
		for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
		t[n] = c >>> 0;
	}
	return t;
})();

function crc32(buf: Buffer): number {
	let c = 0xffffffff;
	for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
	return (c ^ 0xffffffff) >>> 0;
}

function pngChunk(type: string, data: Buffer): Buffer {
	const t = Buffer.from(type, "ascii");
	const lenBuf = Buffer.alloc(4);
	lenBuf.writeUInt32BE(data.length);
	const crcBuf = Buffer.alloc(4);
	crcBuf.writeUInt32BE(crc32(Buffer.concat([t, data])));
	return Buffer.concat([lenBuf, t, data, crcBuf]);
}

function adler32(data: Buffer): number {
	let s1 = 1;
	let s2 = 0;
	for (const b of data) {
		s1 = (s1 + b) % 65521;
		s2 = (s2 + s1) % 65521;
	}
	return ((s2 << 16) | s1) >>> 0;
}

// Stored (no-compression) deflate + zlib wrapper — no node:zlib import needed
function zlibStore(data: Buffer): Buffer {
	const blockHeader = Buffer.alloc(5);
	blockHeader[0] = 0x01; // BFINAL=1, BTYPE=00 (stored)
	blockHeader.writeUInt16LE(data.length, 1);
	blockHeader.writeUInt16LE(~data.length & 0xffff, 3);
	const checksum = Buffer.alloc(4);
	checksum.writeUInt32BE(adler32(data));
	// CMF=0x78, FLG=0x01 → (0x78*256+0x01) % 31 === 0 ✓
	return Buffer.concat([Buffer.from([0x78, 0x01]), blockHeader, data, checksum]);
}

function buildNoisePng(w: number, h: number, alpha: number): string {
	const raw = Buffer.alloc(h * (1 + w * 4));
	let off = 0;
	for (let y = 0; y < h; y++) {
		raw[off++] = 0; // PNG row filter: None
		for (let x = 0; x < w; x++) {
			const v = (Math.random() * 256) | 0;
			raw[off++] = v;
			raw[off++] = v;
			raw[off++] = v;
			raw[off++] = alpha;
		}
	}
	const ihdr = Buffer.alloc(13);
	ihdr.writeUInt32BE(w, 0);
	ihdr.writeUInt32BE(h, 4);
	ihdr[8] = 8; // bit depth
	ihdr[9] = 6; // colour type: RGBA
	const png = Buffer.concat([
		Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
		pngChunk("IHDR", ihdr),
		pngChunk("IDAT", zlibStore(raw)),
		pngChunk("IEND", Buffer.alloc(0)),
	]);
	return `data:image/png;base64,${png.toString("base64")}`;
}
// ─────────────────────────────────────────────────────────────────────────────

const pad = 20;

const caption: React.CSSProperties = {
	fontSize: 11,
	fontWeight: 500,
	fontFamily: "ZalandoSans",
	textTransform: "uppercase",
	color: "#000",
	lineHeight: 1,
};

// ── Home OG ───────────────────────────────────────────────────────────────────
export async function buildHomeOgImage() {
	const { bold, medium, light } = await loadFonts();
	const noise = buildNoisePng(64, 64, 25);

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
			}}
		>
			{/* noise — absolute children are out-of-flow, don't affect space-between */}
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					display: "flex",
					backgroundImage: `url(${noise})`,
					backgroundRepeat: "repeat",
					backgroundSize: "64px 64px",
				}}
			/>
			{/* scanlines */}
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					display: "flex",
					backgroundImage:
						"repeating-linear-gradient(0deg, transparent 0px, transparent 5px, rgba(0,0,0,0.07) 5px, rgba(0,0,0,0.07) 6px)",
				}}
			/>

			<span style={{ ...caption }}>Freelance Creative Developer</span>
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

// ── Sub-page OG ───────────────────────────────────────────────────────────────
interface SubPageOgProps {
	title: string;
	titleSize?: number;
}

export async function buildSubPageOgImage({ title, titleSize = 140 }: SubPageOgProps) {
	const { bold, medium, light } = await loadFonts();
	const noise = buildNoisePng(64, 64, 25);

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
			}}
		>
			{/* noise */}
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					display: "flex",
					backgroundImage: `url(${noise})`,
					backgroundRepeat: "repeat",
					backgroundSize: "64px 64px",
				}}
			/>
			{/* scanlines */}
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					display: "flex",
					backgroundImage:
						"repeating-linear-gradient(0deg, transparent 0px, transparent 5px, rgba(0,0,0,0.07) 5px, rgba(0,0,0,0.07) 6px)",
				}}
			/>

			<span style={{ ...caption }}>Benjamin Wagner — Freelance Frontend Developer</span>
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
