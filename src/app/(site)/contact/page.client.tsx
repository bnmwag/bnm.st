"use client";

import { Wrapper } from "@/components/layout";
import { ScrambleText } from "@/components/scramble-text";
import { useTransition } from "@/features/page-transitions/context/page-transition.context";
import { gsap } from "@/lib/gsap";
import cn from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { type FC, useActionState, useEffect, useRef, useState } from "react";
import { type ContactState, submitContact } from "./actions";

const TYPES = ["Freelance", "Collaboration", "Just saying hi"] as const;
const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "Just exploring"] as const;
const BUDGETS = ["< €1k", "€1k–5k", "€5k–15k", "€15k+", "Not sure yet"] as const;

const INITIAL_STATE: ContactState = { status: "idle" };

const inputClass =
	"w-full border-b bg-transparent pb-2 pt-1 font-medium text-[clamp(.625rem,.5vw,.75rem)] leading-none focus:outline-none transition-colors duration-short placeholder:text-foreground/30";

function validateEmail(value: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const ErrorMessage: FC<{ message?: string }> = ({ message }) => (
	<AnimatePresence>
		{message && (
			<motion.span
				initial={{ opacity: 0, y: -4, height: 0 }}
				animate={{ opacity: 1, y: 0, height: "auto" }}
				exit={{ opacity: 0, y: -4, height: 0 }}
				transition={{ duration: 0.2, ease: "easeOut" }}
				className="mt-1.5 block overflow-hidden text-caption text-rose-600"
			>
				{message}
			</motion.span>
		)}
	</AnimatePresence>
);

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

	const { setEntryAnimations } = useTransition();

	useEffect(() => {
		setEntryAnimations(() => {
			if (!containerRef.current) return;
			const container = containerRef.current;

			// ── Title lines ─────────────────────────────────────────────────────
			// Filter to only visible lines (desktop vs mobile, one set is display:none)
			const titleLines = Array.from(container.querySelectorAll<HTMLElement>(".title-line-inner")).filter(
				(el) => el.offsetHeight > 0,
			);

			gsap.set(titleLines, { opacity: 0 });

			// Fixed bars outside any stacking context so they render as solid black
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

			// ── Form row blend overlays ──────────────────────────────────────────
			const fieldRows = Array.from(container.querySelectorAll<HTMLElement>("[data-field-row]"));
			const containerRect = container.getBoundingClientRect();

			const blendData = fieldRows.map((row) => {
				const rect = row.getBoundingClientRect();
				const top = rect.top - containerRect.top;
				const left = rect.left - containerRect.left;

				const blend = document.createElement("div");
				blend.style.cssText = `position:absolute;top:${top}px;left:${left}px;width:${rect.width}px;height:${rect.height}px;z-index:10;pointer-events:none;`;

				const black = document.createElement("div");
				black.style.cssText = "position:absolute;inset:0;background:#000;";

				const white = document.createElement("div");
				white.style.cssText = "position:absolute;inset:0;background:#fff;mix-blend-mode:difference;";

				blend.appendChild(black);
				blend.appendChild(white);
				container.appendChild(blend);

				gsap.set([black, white], { clipPath: "inset(0% 0% 0% 0%)" });

				return { blend, black, white };
			});

			// ── Master timeline ──────────────────────────────────────────────────
			const masterTl = gsap.timeline({
				onComplete: () => {
					for (const bar of titleBars) bar.remove();
					gsap.set(titleLines, { clearProps: "opacity" });
				},
			});

			// Title lines: bar wipes in from left → line revealed → bar exits right
			titleLines.forEach((line, i) => {
				const bar = titleBars[i];
				const offset = i * 0.1;
				masterTl.to(bar, { scaleX: 1, duration: 0.55, ease: "expo.in" }, offset);
				masterTl.set(line, { opacity: 1 }, offset + 0.55);
				masterTl.set(bar, { transformOrigin: "right center" }, offset + 0.55);
				masterTl.to(bar, { scaleX: 0, duration: 0.65, ease: "expo.out" }, offset + 0.55);
			});

			// Form rows: white wipes up (turns black), then black wipes up (reveals field).
			blendData.forEach(({ blend, white, black }, i) => {
				const rowTl = gsap.timeline({ onComplete: () => blend.remove() });
				rowTl
					.to(white, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.2, ease: "expo.inOut" })
					.to(black, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.2, ease: "expo.inOut" }, "<0.3");
				masterTl.add(rowTl, 0.15 + i * 0.1);
			});
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
				{/* ── Left: headline — fixed bottom-left on desktop ── */}
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
					{/* ── Left: headline — inline on mobile only ── */}
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

					{/* ── Right: form or success ── */}
					<div className="col-span-full md:col-span-6 md:col-start-7">
						<AnimatePresence mode="wait">
							{state.status === "success" ? (
								<motion.div
									key="success"
									initial={{ opacity: 0, filter: "blur(12px)" }}
									animate={{ opacity: 1, filter: "blur(0px)" }}
									transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
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
									transition={{ duration: 0.6, ease: [0.87, 0, 0.13, 1] }}
									className="space-y-10"
									noValidate
								>
									{/* Honeypot */}
									<input
										name="website"
										type="text"
										tabIndex={-1}
										aria-hidden="true"
										autoComplete="off"
										className="absolute -left-[9999px] h-0 w-0 opacity-0"
									/>
									<input type="hidden" name="_mountedAt" defaultValue={String(mountedAtRef.current)} />
									<input type="hidden" name="type" value={type} />
									<input type="hidden" name="timeline" value={timeline} />
									<input type="hidden" name="budget" value={budget} />

									{/* Name + Email */}
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

									{/* Company + Website */}
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

									{/* Type */}
									<div data-field-row className="space-y-3">
										<p className="text-caption">Type</p>
										<div className="flex flex-wrap gap-2">
											{TYPES.map((t) => (
												<button
													key={t}
													type="button"
													onClick={() => setType(t)}
													className={cn(
														"px-2 py-0.5 text-caption transition-colors duration-short",
														type === t
															? "bg-foreground text-background"
															: "border border-foreground/20 text-foreground hover:border-foreground/50",
													)}
												>
													{t}
												</button>
											))}
										</div>
									</div>

									{/* Timeline */}
									<div data-field-row className="space-y-3">
										<p className="text-caption">Timeline</p>
										<div className="flex flex-wrap gap-2">
											{TIMELINES.map((t) => (
												<button
													key={t}
													type="button"
													onClick={() => setTimeline(t)}
													className={cn(
														"px-2 py-0.5 text-caption transition-colors duration-short",
														timeline === t
															? "bg-foreground text-background"
															: "border border-foreground/20 text-foreground hover:border-foreground/50",
													)}
												>
													{t}
												</button>
											))}
										</div>
									</div>

									{/* Budget */}
									<div data-field-row className="space-y-3">
										<p className="text-caption">Budget</p>
										<div className="flex flex-wrap gap-2">
											{BUDGETS.map((b) => (
												<button
													key={b}
													type="button"
													onClick={() => setBudget(b)}
													className={cn(
														"px-2 py-0.5 text-caption transition-colors duration-short",
														budget === b
															? "bg-foreground text-background"
															: "border border-foreground/20 text-foreground hover:border-foreground/50",
													)}
												>
													{b}
												</button>
											))}
										</div>
									</div>

									{/* Message */}
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

									{/* Server error */}
									<AnimatePresence>
										{(state.status === "error" || state.status === "rate_limited") && (
											<motion.p
												initial={{ opacity: 0, y: -4 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -4 }}
												transition={{ duration: 0.2, ease: "easeOut" }}
												className="text-caption text-rose-600"
											>
												{state.message}
											</motion.p>
										)}
									</AnimatePresence>

									{/* Submit */}
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
