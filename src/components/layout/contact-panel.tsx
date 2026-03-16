"use client";

import { type ContactState, submitContact } from "@/app/(site)/contact/actions";
import { ScrambleText } from "@/components/scramble-text";
import cn from "clsx";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { AnimatePresence, motion } from "motion/react";
import { type FC, useActionState, useRef, useState } from "react";
import { OverlayPanel } from "./overlay-panel";

const TYPES = ["Freelance", "Collaboration", "Just saying hi"] as const;
const TIMELINES = ["ASAP", "1-3 months", "3-6 months", "Just exploring"] as const;
const BUDGETS = ["< \u20AC1k", "\u20AC1k-5k", "\u20AC5k-15k", "\u20AC15k+", "Not sure yet"] as const;

const INITIAL_STATE: ContactState = { status: "idle" };

const inputClass =
	"w-full border-b bg-transparent pb-2 pt-1 font-medium text-[clamp(.625rem,.5vw,.75rem)] leading-none focus:outline-none focus-visible:outline-none transition-colors duration-short placeholder:text-foreground/30 placeholder:text-background/30";

const ErrorMessage: FC<{ message?: string; reducedMotion?: boolean }> = ({ message, reducedMotion }) => {
	return (
		<AnimatePresence>
			{message && (
				<motion.span
					initial={reducedMotion ? {} : { opacity: 0, y: -4, height: 0 }}
					animate={{ opacity: 1, y: 0, height: "auto" }}
					exit={reducedMotion ? {} : { opacity: 0, y: -4, height: 0 }}
					transition={reducedMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
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
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"whitespace-nowrap border px-2 py-0.5 text-caption transition-colors duration-short",
				active ? "border-background bg-background text-foreground" : "border-background/40 bg-transparent text-background",
			)}
		>
			{label}
		</button>
	);
};

function validateEmail(value: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export const ContactPanel: FC = () => {
	const [state, action, isPending] = useActionState(submitContact, INITIAL_STATE);
	const mountedAtRef = useRef(Date.now());

	const [type, setType] = useState("");
	const [timeline, setTimeline] = useState("");
	const [budget, setBudget] = useState("");
	const [privacy, setPrivacy] = useState(false);
	const [submittedName, setSubmittedName] = useState("");
	const [submittedEmail, setSubmittedEmail] = useState("");

	const [errors, setErrors] = useState<{
		name?: string;
		email?: string;
		message?: string;
		current_website?: string;
		privacy?: string;
	}>({});

	const shouldReduceMotion = useReducedMotion();

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
		if (fd.get("privacy") !== "on") errs.privacy = "Please accept the privacy policy.";
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
		<OverlayPanel route="/contact" closeEvent="contact:close" heading="Contact" headingId="contact-heading">
			<div className="space-y-16">
				<div className="flex flex-col justify-end gap-y-12 pt-32">
					<div className="space-y-4">
						<h3 className="text-[clamp(1.5em,2.4vw,2.5em)] uppercase leading-[.9] tracking-[-0.04em]">
							Let&apos;s build something.
						</h3>
						<p className="text-caption leading-normal opacity-60">
							Available for freelance work, collaborations, and interesting experiments. Based in Austria, working with clients
							worldwide.
						</p>
					</div>
				</div>

				<AnimatePresence mode="wait">
					{state.status === "success" ? (
						<motion.div
							key="success"
							initial={{ opacity: 0, filter: "blur(12px)" }}
							animate={{ opacity: 1, filter: "blur(0px)" }}
							transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
							className="space-y-6"
						>
							<p className="text-[clamp(1.5em,2.4vw,2.5em)] uppercase leading-[.9] tracking-[-0.04em]">Got it.</p>
							<div className="space-y-2">
								<p className="text-caption">Thanks for reaching out{submittedName ? `, ${submittedName}` : ""}.</p>
								{submittedEmail && (
									<p className="text-caption opacity-60">I&apos;ll get back to you at {submittedEmail} as soon as I can.</p>
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
							<input type="hidden" name="privacy" value={privacy ? "on" : ""} />

							<div className="grid grid-cols-2 gap-6">
								<div className="space-y-3">
									<label
										htmlFor="contact-name"
										className={cn("text-caption transition-colors duration-short", errors.name ? "text-rose-600" : "")}
									>
										Name
									</label>
									<input
										id="contact-name"
										name="name"
										type="text"
										autoComplete="name"
										onChange={() => errors.name && setErrors((e) => ({ ...e, name: undefined }))}
										className={cn(
											inputClass,
											errors.name ? "border-rose-600 focus:border-rose-600" : "border-background/20 focus:border-background",
										)}
									/>
									<ErrorMessage message={errors.name} reducedMotion={shouldReduceMotion} />
								</div>
								<div className="space-y-3">
									<label
										htmlFor="contact-email"
										className={cn("text-caption transition-colors duration-short", errors.email ? "text-rose-600" : "")}
									>
										Email
									</label>
									<input
										id="contact-email"
										name="email"
										type="email"
										autoComplete="email"
										onChange={() => errors.email && setErrors((e) => ({ ...e, email: undefined }))}
										className={cn(
											inputClass,
											errors.email ? "border-rose-600 focus:border-rose-600" : "border-background/20 focus:border-background",
										)}
									/>
									<ErrorMessage message={errors.email} reducedMotion={shouldReduceMotion} />
								</div>
							</div>

							<div className="grid grid-cols-2 gap-6">
								<div className="space-y-3">
									<label htmlFor="contact-company" className="text-caption">
										Company <span className="opacity-40">(optional)</span>
									</label>
									<input
										id="contact-company"
										name="company"
										type="text"
										autoComplete="organization"
										className={cn(inputClass, "border-background/20 focus:border-background")}
									/>
								</div>
								<div className="space-y-3">
									<label
										htmlFor="contact-current-website"
										className={cn("text-caption transition-colors duration-short", errors.current_website ? "text-rose-600" : "")}
									>
										Current website <span className={errors.current_website ? "opacity-100" : "opacity-40"}>(optional)</span>
									</label>
									<input
										id="contact-current-website"
										name="current_website"
										type="url"
										autoComplete="url"
										placeholder="https://"
										onChange={() => errors.current_website && setErrors((e) => ({ ...e, current_website: undefined }))}
										className={cn(
											inputClass,
											errors.current_website
												? "border-rose-600 focus:border-rose-600"
												: "border-background/20 focus:border-background",
										)}
									/>
									<ErrorMessage message={errors.current_website} reducedMotion={shouldReduceMotion} />
								</div>
							</div>

							<div className="space-y-3">
								<p className="text-caption">Type</p>
								<div className="flex flex-wrap gap-2">
									{TYPES.map((t) => (
										<ChipButton key={t} label={t} active={type === t} onClick={() => setType(t)} />
									))}
								</div>
							</div>

							<div className="space-y-3">
								<p className="text-caption">Timeline</p>
								<div className="flex flex-wrap gap-2">
									{TIMELINES.map((t) => (
										<ChipButton key={t} label={t} active={timeline === t} onClick={() => setTimeline(t)} />
									))}
								</div>
							</div>

							<div className="space-y-3">
								<p className="text-caption">Budget</p>
								<div className="flex flex-wrap gap-2">
									{BUDGETS.map((b) => (
										<ChipButton key={b} label={b} active={budget === b} onClick={() => setBudget(b)} />
									))}
								</div>
							</div>

							<div className="space-y-3">
								<label
									htmlFor="contact-message"
									className={cn("text-caption transition-colors duration-short", errors.message ? "text-rose-600" : "")}
								>
									Tell me more about your project.
								</label>
								<textarea
									id="contact-message"
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
										errors.message ? "border-rose-600 focus:border-rose-600" : "border-background/20 focus:border-background",
									)}
								/>
								<ErrorMessage message={errors.message} reducedMotion={shouldReduceMotion} />
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

							<div className="space-y-2">
								<label
									htmlFor="contact-privacy"
									className={cn("flex cursor-pointer items-start gap-3", errors.privacy ? "text-rose-600" : "")}
								>
									<span
										className={cn(
											"mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center border",
											privacy ? "border-background bg-background" : errors.privacy ? "border-rose-600" : "border-background/40",
										)}
										aria-hidden="true"
									>
										{privacy && (
											<svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
												<title>Check</title>
												<path
													d="M1 3L3 5L7 1"
													stroke="var(--foreground)"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										)}
									</span>
									<span className="pt-1 text-caption">
										I have read and agree to the{" "}
										<a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
											privacy policy
										</a>
										.
									</span>
								</label>
								<input
									id="contact-privacy"
									type="checkbox"
									checked={privacy}
									onChange={(e) => {
										setPrivacy(e.target.checked);
										if (errors.privacy) setErrors((prev) => ({ ...prev, privacy: undefined }));
									}}
									className="sr-only"
								/>
								<ErrorMessage message={errors.privacy} reducedMotion={shouldReduceMotion} />
							</div>

							<div className="flex w-fit">
								<button
									type="submit"
									disabled={isPending || !type || !timeline || !budget || !privacy}
									className="group relative bg-background px-2 py-0.5 font-medium text-[clamp(.625rem,.5vw,.75rem)] uppercase leading-none disabled:cursor-not-allowed disabled:opacity-40"
								>
									<span className="absolute inset-0 origin-right scale-x-0 bg-foreground transition-transform duration-short ease-default group-hover:origin-left group-hover:scale-x-100 group-disabled:hidden" />
									<ScrambleText className="text-foreground transition-colors duration-short ease-default group-hover:text-background">
										{isPending ? "Sending..." : "Send it"}
									</ScrambleText>
								</button>
							</div>
						</motion.form>
					)}
				</AnimatePresence>
			</div>
		</OverlayPanel>
	);
};
