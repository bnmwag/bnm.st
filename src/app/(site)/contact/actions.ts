"use server";

import { headers } from "next/headers";

// In-memory rate limiter — resets on cold start, fine for a personal portfolio
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MIN_SUBMIT_MS = 3000; // 3 second time gate

function checkRateLimit(ip: string): boolean {
	const now = Date.now();
	const entry = rateLimitMap.get(ip);
	if (!entry || entry.resetAt < now) {
		rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
		return true;
	}
	if (entry.count >= RATE_LIMIT) return false;
	entry.count++;
	return true;
}

async function getIp(): Promise<string> {
	const h = await headers();
	return h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "unknown";
}

const VALID_TYPES = ["Freelance", "Collaboration", "Just saying hi"] as const;
const VALID_TIMELINES = ["ASAP", "1–3 months", "3–6 months", "Just exploring"] as const;
const VALID_BUDGETS = ["< €1k", "€1k–5k", "€5k–15k", "€15k+", "Not sure yet"] as const;

export type ContactState = {
	status: "idle" | "success" | "error" | "rate_limited";
	message?: string;
};

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
	// Honeypot — bots fill hidden fields, humans don't
	if (formData.get("website")) {
		return { status: "success" };
	}

	// Time gate — bots submit instantly
	const mountedAt = Number(formData.get("_mountedAt"));
	if (!mountedAt || Date.now() - mountedAt < MIN_SUBMIT_MS) {
		return { status: "success" };
	}

	// Rate limit by IP
	const ip = await getIp();
	if (!checkRateLimit(ip)) {
		return { status: "rate_limited", message: "Too many submissions. Please try again later." };
	}

	// Sanitize + validate
	const name = String(formData.get("name") ?? "")
		.trim()
		.slice(0, 100);
	const email = String(formData.get("email") ?? "")
		.trim()
		.slice(0, 200);
	const company = String(formData.get("company") ?? "")
		.trim()
		.slice(0, 100);
	const currentWebsite = String(formData.get("current_website") ?? "")
		.trim()
		.slice(0, 200);
	const type = String(formData.get("type") ?? "").trim();
	const timeline = String(formData.get("timeline") ?? "").trim();
	const budget = String(formData.get("budget") ?? "").trim();
	const message = String(formData.get("message") ?? "")
		.trim()
		.slice(0, 2000);

	const privacy = String(formData.get("privacy") ?? "").trim();

	if (!name || !email || !type || !timeline || !budget || !message) {
		return { status: "error", message: "All fields are required." };
	}

	if (privacy !== "on") {
		return { status: "error", message: "Please accept the privacy policy." };
	}

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return { status: "error", message: "Please enter a valid email address." };
	}

	if (!VALID_TYPES.includes(type as (typeof VALID_TYPES)[number])) {
		return { status: "error", message: "Invalid form data." };
	}

	if (!VALID_TIMELINES.includes(timeline as (typeof VALID_TIMELINES)[number])) {
		return { status: "error", message: "Invalid form data." };
	}

	if (!VALID_BUDGETS.includes(budget as (typeof VALID_BUDGETS)[number])) {
		return { status: "error", message: "Invalid form data." };
	}

	const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
	if (!webhookUrl) {
		console.error("DISCORD_WEBHOOK_URL is not set");
		return { status: "error", message: "Something went wrong. Please reach out directly at hello@bnm.st." };
	}

	try {
		const res = await fetch(webhookUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				embeds: [
					{
						title: "New Contact Form Submission",
						color: 0x000000,
						description: [
							`\`${"Name".padEnd(10)}\` ${name}`,
							`\`${"Email".padEnd(10)}\` ${email}`,
							...(company ? [`\`${"Company".padEnd(10)}\` ${company}`] : []),
							...(currentWebsite ? [`\`${"Website".padEnd(10)}\` ${currentWebsite}`] : []),
							`\`${"Type".padEnd(10)}\` ${type}`,
							`\`${"Timeline".padEnd(10)}\` ${timeline}`,
							`\`${"Budget".padEnd(10)}\` ${budget}`,
						].join("\n"),
						fields: [{ name: "Message", value: message, inline: false }],
						timestamp: new Date().toISOString(),
					},
				],
			}),
		});

		if (!res.ok) throw new Error(`Discord responded with ${res.status}`);

		return { status: "success" };
	} catch (err) {
		console.error("Discord webhook error:", err);
		return { status: "error", message: "Something went wrong. Please try again or reach out at hello@bnm.st." };
	}
}
