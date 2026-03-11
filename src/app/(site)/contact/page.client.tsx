"use client";

import { Wrapper } from "@/components/layout";
import { ScrambleText } from "@/components/scramble-text";
import { useTransition } from "@/features/page-transitions/context/page-transition.context";
import { gsap } from "@/lib/gsap";
import cn from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type FC, useActionState, useCallback, useEffect, useRef, useState } from "react";
import { type ContactState, submitContact } from "./actions";

const SCRAMBLE_CHARS = "\u2599\u259A\u259E\u259D\u2580\u2596\u259C\u259B\u259F";
const SCRAMBLE_DURATION = 400;
const SCRAMBLE_FRAMES_PER_CHAR = 4;

const TYPES = ["Freelance", "Collaboration", "Just saying hi"] as const;
const TIMELINES = ["ASAP", "1-3 months", "3-6 months", "Just exploring"] as const;
const BUDGETS = ["< €1k", "€1k-5k", "€5k-15k", "€15k+", "Not sure yet"] as const;

const INITIAL_STATE: ContactState = { status: "idle" };

const inputClass =
	"w-full border-b bg-transparent pb-2 pt-1 font-medium text-[clamp(.625rem,.5vw,.75rem)] leading-none focus:outline-none transition-colors duration-short placeholder:text-foreground/30";

function validateEmail(value: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const ErrorMessage: FC<{ message?: string }> = ({ message }) => {
	const shouldReduceMotion = useReducedMotion();
	return (
		<AnimatePresence>
			{message && (
				<motion.span
					initial={shouldReduceMotion ? {} : { opacity: 0, y: -4, height: 0 }}
					animate={{ opacity: 1, y: 0, height: "auto" }}
					exit={shouldReduceMotion ? {} : { opacity: 0, y: -4, height: 0 }}
					transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
					className="mt-1.5 block overflow-hidden text-caption text-rose-600"
				>
					{message}
				</motion.span>
			)}
		</AnimatePresence>
	);
};

interface IChipButtonProps {
	label: string;
	active: boolean;
	onClick: () => void;
}

const ChipButton: FC<IChipButtonProps> = ({ label, active, onClick }) => {
	const btnRef = useRef<HTMLButtonElement>(null);
	const textRef = useRef<HTMLSpanElement>(null);
	const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const prevActive = useRef(active);
	const shouldReduceMotion = useReducedMotion();

	useEffect(() => {
		const btn = btnRef.current;
		if (!btn) return;
		btn.style.width = `${btn.offsetWidth}px`;
	}, []);

	const runScramble = useCallback(() => {
		if (shouldReduceMotion) return;
		const el = textRef.current;
		if (!el) return;
		if (rafRef.current) clearTimeout(rafRef.current);

		const original = label;
		let frame = 0;
		const totalFrames = original.length * SCRAMBLE_FRAMES_PER_CHAR;
		const frameInterval = SCRAMBLE_DURATION / totalFrames;

		const tick = () => {
			const resolved = Math.floor(frame / SCRAMBLE_FRAMES_PER_CHAR);
			el.textContent = original
				.split("")
				.map((c, i) => {
					if (c === " ") return " ";
					if (i < resolved) return c;
					return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
				})
				.join("");
			frame++;
			if (frame <= totalFrames) {
				rafRef.current = setTimeout(tick, frameInterval);
			} else {
				el.textContent = original;
			}
		};
		tick();
	}, [label, shouldReduceMotion]);

	useEffect(() => {
		if (prevActive.current !== active) {
			runScramble();
			prevActive.current = active;
		}
	}, [active, runScramble]);

	return (
		<button
			ref={btnRef}
			type="button"
			onClick={onClick}
			className="group relative overflow-hidden whitespace-nowrap px-2 py-0.5 text-caption transition-colors duration-short hover:border-foreground/50"
		>
			<span
				className={cn(
					"absolute top-0 right-0 left-0 h-3.5 bg-foreground transition-transform duration-short ease-default",
					active ? "origin-left scale-x-100" : "origin-right scale-x-0",
				)}
			/>
			<span ref={textRef} className="relative text-background mix-blend-difference transition-colors duration-short ease-default">
				{label}
			</span>
		</button>
	);
};

export const ContactPageClient: FC = () => {
	const [state, action, isPending] = useActionState(submitContact, INITIAL_STATE);
	const mountedAtRef = useRef(Date.now());
	const containerRef = useRef<HTMLElement>(null);

	const [type, setType] = useState("");
	const [timeline, setTimeline] = useState("");
	const [budget, setBudget] = useState("");
	const [submittedName, setSubmittedName] = useState("");
	const [submittedEmail, setSubmittedEmail] = useState("");

	const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string; current_website?: string }>({});

	const nameScope = useRef<HTMLDivElement>(null);
	const emailScope = useRef<HTMLDivElement>(null);
	const messageScope = useRef<HTMLDivElement>(null);

	const shouldReduceMotion = useReducedMotion();

	const { setEntryAnimations } = useTransition();

	useEffect(() => {
		const SCRAMBLE_CHARS = "\u2599\u259A\u259E\u259D\u2580\u2596\u259C\u259B\u259F";
		const FRAMES_PER_CHAR = 3;

		const collectTextNodes = (el: Node): Text[] => {
			const nodes: Text[] = [];
			for (const child of Array.from(el.childNodes)) {
				if (child.nodeType === Node.TEXT_NODE && child.textContent?.trim()) {
					nodes.push(child as Text);
				} else if (child.nodeType === Node.ELEMENT_NODE) {
					nodes.push(...collectTextNodes(child));
				}
			}
			return nodes;
		};

		const scrambleNode = (textNode: Text, duration: number, delay: number, tl: gsap.core.Timeline) => {
			const original = textNode.textContent || "";
			const len = original.length;
			if (!len) return;

			const totalFrames = len * FRAMES_PER_CHAR;
			const proxy = { frame: 0 };

			textNode.textContent = original
				.split("")
				.map((c) => (c.trim() === "" ? c : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]))
				.join("");

			tl.to(
				proxy,
				{
					frame: totalFrames,
					duration,
					ease: "none",
					onUpdate: () => {
						const resolved = Math.floor(proxy.frame / FRAMES_PER_CHAR);
						textNode.textContent = original
							.split("")
							.map((c, i) => {
								if (c.trim() === "") return c;
								if (i < resolved) return c;
								return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
							})
							.join("");
					},
					onComplete: () => {
						textNode.textContent = original;
					},
				},
				delay,
			);
		};

		setEntryAnimations(() => {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
			if (!containerRef.current) return;
			const container = containerRef.current;

			const masterTl = gsap.timeline();

			// ── Title lines: bar wipe ────────────────────────────────────────
			const titleLines = Array.from(container.querySelectorAll<HTMLElement>(".title-line-inner")).filter(
				(el) => el.offsetHeight > 0,
			);

			gsap.set(titleLines, { opacity: 0 });

			const titleBars = titleLines.map((line) => {
				const rect = line.getBoundingClientRect();
				const bar = document.createElement("div");
				Object.assign(bar.style, {
					position: "fixed",
					top: `${rect.top}px`,
					left: `${rect.left}px`,
					width: `${rect.width}px`,
					height: `${rect.height}px`,
					background: "var(--foreground)",
					transformOrigin: "left center",
					transform: "scaleX(0)",
					pointerEvents: "none",
					zIndex: "50",
				});
				document.body.appendChild(bar);
				return bar;
			});

			titleLines.forEach((line, i) => {
				const bar = titleBars[i];
				const offset = i * 0.1;
				masterTl.to(bar, { scaleX: 1, duration: 0.55, ease: "expo.in" }, offset);
				masterTl.set(line, { opacity: 1 }, offset + 0.55);
				masterTl.set(bar, { transformOrigin: "right center" }, offset + 0.55);
				masterTl.to(bar, { scaleX: 0, duration: 0.65, ease: "expo.out" }, offset + 0.55);
			});

			masterTl.eventCallback("onComplete", () => {
				for (const bar of titleBars) bar.remove();
				gsap.set(titleLines, { clearProps: "opacity" });
			});

			// ── Form rows: label scramble + input border fade ────────────────
			const fieldRows = Array.from(container.querySelectorAll<HTMLElement>("[data-field-row]"));

			fieldRows.forEach((row, i) => {
				const offset = 0.25 + i * 0.1;

				const labels = row.querySelectorAll<HTMLElement>("label, p.text-caption");
				for (const label of Array.from(labels)) {
					for (const node of collectTextNodes(label)) {
						scrambleNode(node, 0.6, offset, masterTl);
					}
				}

				const inputs = row.querySelectorAll<HTMLElement>("input:not([type=hidden]), textarea");
				for (const input of Array.from(inputs)) {
					gsap.set(input, { borderColor: "transparent" });
					masterTl.to(
						input,
						{
							borderColor: "",
							duration: 0.8,
							ease: "expo.out",
							clearProps: "borderColor",
						},
						offset + 0.1,
					);
				}

				const buttons = row.querySelectorAll<HTMLElement>("button[type=button]");
				if (buttons.length) {
					gsap.set(buttons, { opacity: 0, scale: 0.8 });
					masterTl.to(
						buttons,
						{
							opacity: 1,
							scale: 1,
							duration: 0.4,
							stagger: 0.03,
							ease: "back.out(1.7)",
							clearProps: "transform,opacity",
						},
						offset + 0.05,
					);
				}
			});

			const submitBtn = container.querySelector<HTMLElement>("button[type=submit]");
			if (submitBtn) {
				gsap.set(submitBtn, { opacity: 0, y: 12 });
				masterTl.to(submitBtn, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", clearProps: "all" }, 0.6);
			}
		});
	}, [setEntryAnimations]);

	const validate = (fd: FormData): typeof errors => {
		const errs: typeof errors = {};
		const name = String(fd.get("name") ?? "").trim();
		const email = String(fd.get("email") ?? "").trim();
		const currentWebsite = String(fd.get("current_website") ?? "").trim();
		const message = String(fd.get("message") ?? "").trim();
		if (!name) errs.name = "Name is required.";
		if (!email) errs.email = "Email is required.";
		else if (!validateEmail(email)) errs.email = "Please enter a valid email address.";
		if (currentWebsite) {
			try {
				new URL(currentWebsite);
			} catch {
				errs.current_website = "Please enter a valid URL.";
			}
		}
		if (!message) errs.message = "Tell me more about your project.";
		return errs;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		const fd = new FormData(e.currentTarget);
		const errs = validate(fd);
		if (Object.keys(errs).length > 0) {
			e.preventDefault();
			setErrors(errs);
			return;
		}
		setErrors({});
		setSubmittedName(String(fd.get("name") ?? ""));
		setSubmittedEmail(String(fd.get("email") ?? ""));
	};

	return (
		<Wrapper>
			<article id="main-content" ref={containerRef} className="relative min-h-svh pt-[25vh] pb-[25vh] md:pb-4">
				<div className="fixed bottom-4 left-4 z-10 space-y-6 max-md:hidden">
					<p className="max-w-xs text-caption text-foreground/50">
						Available for freelance work, collaborations, and interesting experiments.
					</p>
					<h1 className="text-[clamp(2em,5vw,5.5em)] uppercase leading-[.85] tracking-[-0.04em]">
						<span className="block overflow-hidden">
							<span className="title-line-inner inline-block">Let&apos;s build</span>
						</span>
						<span className="block overflow-hidden">
							<span className="title-line-inner inline-block">something.</span>
						</span>
					</h1>
				</div>

				<div className="layout-grid items-start gap-y-16">
					<div className="col-span-full space-y-6 md:hidden">
						<p className="max-w-xs text-caption text-foreground/50">
							Available for freelance work, collaborations, and interesting experiments.
						</p>
						<h1 className="text-[clamp(2em,5vw,5.5em)] uppercase leading-[.85] tracking-[-0.04em]">
							<span className="block overflow-hidden">
								<span className="title-line-inner inline-block">Let&apos;s build</span>
							</span>
							<span className="block overflow-hidden">
								<span className="title-line-inner inline-block">something.</span>
							</span>
						</h1>
					</div>

					<div className="col-span-full md:col-span-6 md:col-start-7">
						<AnimatePresence mode="wait">
							{state.status === "success" ? (
								<motion.div
									key="success"
									initial={{ opacity: 0, filter: "blur(12px)" }}
									animate={{ opacity: 1, filter: "blur(0px)" }}
									transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
									className="space-y-6"
								>
									<p className="text-[clamp(2em,5vw,5.5em)] uppercase leading-[.85] tracking-[-0.04em]">Got it.</p>
									<div className="space-y-2">
										<p className="text-caption">Thanks for reaching out{submittedName ? `, ${submittedName}` : ""}.</p>
										{submittedEmail && (
											<p className="text-caption text-foreground/50">
												I&apos;ll get back to you at {submittedEmail} as soon as I can.
											</p>
										)}
									</div>
								</motion.div>
							) : (
								<motion.form
									key="form"
									action={action}
									onSubmit={handleSubmit}
									exit={{ opacity: 0, filter: "blur(12px)" }}
									transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: [0.87, 0, 0.13, 1] }}
									className="space-y-10"
									noValidate
								>
									<input
										name="website"
										type="text"
										tabIndex={-1}
										aria-hidden="true"
										autoComplete="off"
										className="-left-2500 absolute h-0 w-0 opacity-0"
									/>
									<input type="hidden" name="_mountedAt" defaultValue={String(mountedAtRef.current)} />
									<input type="hidden" name="type" value={type} />
									<input type="hidden" name="timeline" value={timeline} />
									<input type="hidden" name="budget" value={budget} />

									<div data-field-row className="grid grid-cols-2 gap-6">
										<div ref={nameScope} className="space-y-3">
											<label
												htmlFor="name"
												className={cn("text-caption transition-colors duration-short", errors.name ? "text-rose-600" : "")}
											>
												Name
											</label>
											<input
												id="name"
												name="name"
												type="text"
												autoComplete="name"
												onChange={() => errors.name && setErrors((e) => ({ ...e, name: undefined }))}
												className={cn(
													inputClass,
													errors.name
														? "border-rose-600 focus:border-rose-600"
														: "border-foreground/20 focus:border-foreground/60",
												)}
											/>
											<ErrorMessage message={errors.name} />
										</div>
										<div ref={emailScope} className="space-y-3">
											<label
												htmlFor="email"
												className={cn("text-caption transition-colors duration-short", errors.email ? "text-rose-600" : "")}
											>
												Email
											</label>
											<input
												id="email"
												name="email"
												type="email"
												autoComplete="email"
												onChange={() => errors.email && setErrors((e) => ({ ...e, email: undefined }))}
												className={cn(
													inputClass,
													errors.email
														? "border-rose-600 focus:border-rose-600"
														: "border-foreground/20 focus:border-foreground/60",
												)}
											/>
											<ErrorMessage message={errors.email} />
										</div>
									</div>

									<div data-field-row className="grid grid-cols-2 gap-6">
										<div className="space-y-3">
											<label htmlFor="company" className="text-caption">
												Company <span className="opacity-40">(optional)</span>
											</label>
											<input
												id="company"
												name="company"
												type="text"
												autoComplete="organization"
												className={cn(inputClass, "border-foreground/20 focus:border-foreground/60")}
											/>
										</div>
										<div className="space-y-3">
											<label
												htmlFor="current_website"
												className={cn(
													"text-caption transition-colors duration-short",
													errors.current_website ? "text-rose-600" : "",
												)}
											>
												Current website <span className={errors.current_website ? "opacity-100" : "opacity-40"}>(optional)</span>
											</label>
											<input
												id="current_website"
												name="current_website"
												type="url"
												autoComplete="url"
												placeholder="https://"
												onChange={() => errors.current_website && setErrors((e) => ({ ...e, current_website: undefined }))}
												className={cn(
													inputClass,
													errors.current_website
														? "border-rose-600 focus:border-rose-600"
														: "border-foreground/20 focus:border-foreground/60",
												)}
											/>
											<ErrorMessage message={errors.current_website} />
										</div>
									</div>

									<div data-field-row className="space-y-3">
										<p className="text-caption">Type</p>
										<div className="flex flex-wrap gap-2">
											{TYPES.map((t) => (
												<ChipButton key={t} label={t} active={type === t} onClick={() => setType(t)} />
											))}
										</div>
									</div>

									<div data-field-row className="space-y-3">
										<p className="text-caption">Timeline</p>
										<div className="flex flex-wrap gap-2">
											{TIMELINES.map((t) => (
												<ChipButton key={t} label={t} active={timeline === t} onClick={() => setTimeline(t)} />
											))}
										</div>
									</div>

									<div data-field-row className="space-y-3">
										<p className="text-caption">Budget</p>
										<div className="flex flex-wrap gap-2">
											{BUDGETS.map((b) => (
												<ChipButton key={b} label={b} active={budget === b} onClick={() => setBudget(b)} />
											))}
										</div>
									</div>

									<div data-field-row ref={messageScope} className="space-y-3">
										<label
											htmlFor="message"
											className={cn("text-caption transition-colors duration-short", errors.message ? "text-rose-600" : "")}
										>
											Tell me more about your project.
										</label>
										<textarea
											id="message"
											name="message"
											rows={4}
											maxLength={2000}
											onChange={() => errors.message && setErrors((e) => ({ ...e, message: undefined }))}
											onInput={(e) => {
												const el = e.currentTarget;
												el.style.height = "auto";
												el.style.height = `${el.scrollHeight}px`;
											}}
											className={cn(
												inputClass,
												"resize-none overflow-hidden",
												errors.message
													? "border-rose-600 focus:border-rose-600"
													: "border-foreground/20 focus:border-foreground/60",
											)}
										/>
										<ErrorMessage message={errors.message} />
									</div>

									<AnimatePresence>
										{(state.status === "error" || state.status === "rate_limited") && (
											<motion.p
												initial={{ opacity: 0, y: -4 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -4 }}
												transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
												className="text-caption text-rose-600"
											>
												{state.message}
											</motion.p>
										)}
									</AnimatePresence>

									<div data-field-row className="flex w-fit">
										<button
											type="submit"
											disabled={isPending || !type || !timeline || !budget}
											className="group relative bg-foreground px-2 py-0.5 font-medium text-[clamp(.625rem,.5vw,.75rem)] uppercase leading-none disabled:cursor-not-allowed disabled:opacity-40"
										>
											<span className="absolute inset-0 origin-right scale-x-0 bg-background transition-transform duration-short ease-default group-hover:origin-left group-hover:scale-x-100 group-disabled:hidden" />
											<ScrambleText className="text-background transition-colors duration-short ease-default group-hover:text-foreground">
												{isPending ? "Sending..." : "Send it"}
											</ScrambleText>
										</button>
									</div>
								</motion.form>
							)}
						</AnimatePresence>
					</div>
				</div>
			</article>
		</Wrapper>
	);
};
