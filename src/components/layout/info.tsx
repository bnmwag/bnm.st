"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";

import { Human } from "../gl/human";
import { ScrambleText } from "../scramble-text";
import { OverlayPanel } from "./overlay-panel";

const services = [
	{
		name: "Frontend Development",
		description:
			"Production-grade interfaces with React and Next.js. Fast, accessible, and built to last — without the boilerplate.",
	},
	{
		name: "Creative Development",
		description:
			"WebGL, Three.js, scroll-based storytelling, shaders. The stuff that makes a site feel alive rather than just functional.",
	},
	{
		name: "UI Engineering",
		description:
			"From Figma to pixel-perfect code. I close the gap between design intent and technical reality without cutting corners.",
	},
	{
		name: "Prototyping & Experiments",
		description:
			"Quick, focused builds to test ideas before they get expensive. Interactive proofs of concept that actually look good.",
	},
];

const process = [
	{
		step: "01",
		title: "Brief",
		description:
			"We start with a conversation. I want to understand the project, the goals, and what success looks like before anything gets built.",
	},
	{
		step: "02",
		title: "Direction",
		description:
			"Once I've got context, I map out the approach — architecture, tooling, motion language, anything that needs to be settled upfront so there are no surprises later.",
	},
	{
		step: "03",
		title: "Build",
		description:
			"Iterative development with regular check-ins. You see real progress, not a big reveal at the end. Feedback is a feature, not an interruption.",
	},
	{
		step: "04",
		title: "Polish",
		description:
			"The last 20% that makes the difference. Timing, easing, edge cases, accessibility. I don't ship things I wouldn't be proud to put my name on.",
	},
	{
		step: "05",
		title: "Handoff",
		description:
			"Clean code, clear documentation, and I stick around post-launch. A good project relationship doesn't end at deployment.",
	},
];

export const Info: FC = () => {
	const pathname = usePathname();
	const since = Math.floor((Date.now() - new Date("2021-06-01").getTime()) / (1000 * 60 * 60 * 24 * 365.25));

	return (
		<OverlayPanel route="/info" closeEvent="info:close" heading="Info" headingId="info-heading">
			<div className="space-y-48">
				<div className="flex min-h-[calc(100svh-32px)] flex-col justify-end gap-y-12 pt-32">
					<div className="space-y-4">
						<h3 className="text-[clamp(1.5em,2.4vw,2.5em)] uppercase leading-[.9] tracking-[-0.04em]">
							Hey — I&apos;m Benjamin.
						</h3>
						<p className="text-caption leading-normal opacity-60">
							Frontend developer and creative builder based in Austria. I care about the craft — the kind of work where the
							interaction feels right, the layout breathes, and nothing is there without a reason.
						</p>
					</div>
					<div className="aspect-3/4 w-full border">
						{pathname === "/info" && <Human />}
					</div>
				</div>
				<div className="space-y-12">
					<h3 className="text-[clamp(1.5em,2.4vw,2.5em)] uppercase leading-[.9] tracking-[-0.04em]">
						Good things get built by people who give a damn.
					</h3>
					<div className="space-y-4">
						<p className="text-left text-caption leading-normal">
							I&apos;ve been building for the web since 2021 — first in agencies, then on my own. Based in Austria, working
							with clients and studios worldwide.
						</p>
						<p className="text-right text-caption leading-normal opacity-60">
							{since} years in, and I still think the craft matters. The feel of an interaction, the weight of a typeface, the
							timing of a transition. These things aren&apos;t decoration — they&apos;re how a product communicates. I work
							best with teams who think the same way.
						</p>
					</div>
				</div>

				<div className="space-y-12">
					<p className="text-caption opacity-60">What I do</p>
					{services.map((service) => (
						<div key={service.name} className="grid grid-cols-6">
							<div className="col-span-2">
								<p className="text-balance text-caption leading-normal opacity-60">{service.name}</p>
							</div>
							<div className="col-span-4">
								<p className="text-balance text-caption leading-normal">{service.description}</p>
							</div>
						</div>
					))}
				</div>

				<p className="text-caption leading-normal">
					<span className="opacity-60">There&apos;s a reason I lean minimal. As a solo developer, </span>
					speed and precision are the edge.
					<span className="opacity-60"> AI can generate interfaces fast — but it can&apos;t decide </span>
					what actually matters.
					<span className="opacity-60"> Stripping things down to what works, </span>
					shipping it clean
					<span className="opacity-60">, and moving without loose ends: that&apos;s the practice.</span>
				</p>

				<div className="space-y-12">
					<p className="text-caption opacity-60">How I work</p>
					{process.map((item) => (
						<div key={item.step} className="grid grid-cols-6 items-baseline">
							<div className="col-span-2">
								<p className="text-caption leading-normal opacity-60">
									{item.step} — {item.title}
								</p>
							</div>
							<div className="col-span-4">
								<p className="text-balance text-caption leading-normal">{item.description}</p>
							</div>
						</div>
					))}
				</div>

				<div className="space-y-12" id="reach-out">
					<div className="space-y-6">
						<h3 className="text-[clamp(1.5em,2.4vw,2.5em)] uppercase leading-[.9] tracking-[-0.04em]">
							Have something in mind?
						</h3>
						<p className="max-w-md text-caption leading-normal opacity-70">
							Even if it&apos;s vague — a half-formed idea, a timeline, a budget question. I&apos;m easy to talk to and
							I&apos;ll tell you honestly if it&apos;s something I can help with.
						</p>
					</div>
					<Link
						href="/contact"
						className="group relative block w-full overflow-hidden bg-background px-[0.6em] py-[0.15em] font-medium text-[clamp(2rem,5vw,3.5rem)] uppercase leading-none"
					>
						<span className="absolute inset-0 origin-right scale-x-0 bg-foreground transition-transform duration-short ease-default group-hover:origin-left group-hover:scale-x-100" />
						<ScrambleText className="text-foreground transition-colors duration-short ease-default group-hover:text-background">
							Get in touch
						</ScrambleText>
					</Link>
				</div>
			</div>
		</OverlayPanel>
	);
};
