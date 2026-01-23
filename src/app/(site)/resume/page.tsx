import { Wrapper } from "@/components/layout";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "Resume | Benjamin Wagner",
	description: "Frontend developer based in Linz, Austria",
	openGraph: {
		url: "https://bnm.st/resume",
		title: "Resume | Benjamin Wagner",
		description: "Frontend developer based in Linz, Austria",
		images: [
			{
				url: "https://bnm.st/og.jpg",
				width: 800,
				height: 600,
				alt: "Resume | Benjamin Wagner",
				type: "image/jpeg",
			},
		],
	},
};

const ResumePage: NextPage = () => {
	return (
		<Wrapper>
			<article id="main-content" className="relative space-y-24 py-[25vh]">
				<header className="layout-grid">
					<div className="col-span-2 text-caption md:col-start-3">
						<h1>Resume</h1>
					</div>
					<div className="col-span-full col-start-5 text-caption md:col-span-6">Benjamin Wagner - Frontend Developer</div>
				</header>
				<section className="layout-grid" aria-labelledby="experience-heading">
					<div className="col-span-2 text-caption md:col-start-3">
						<h2 id="experience-heading">Experience</h2>
					</div>
					<div className="col-span-full col-start-5 text-caption md:col-span-6">
						<div className="space-y-2 pb-4">
							<div className="flex justify-between max-md:flex-col md:items-end">
								<p className="text-balance">puka.studio - Puka GmbH, Linz</p>
								<p className="whitespace-nowrap font-mono md:text-right">SEP 2025 - PRESENT</p>
							</div>
							<p className="text-balance text-foreground-muted">
								As the Digital Experience Designer in this 2-person company, I handle all aspects of the digital experience like
								designing, developing, testing, and launching websites, webshops, and apps.
							</p>
						</div>
						<div className="space-y-2 pb-4">
							<div className="flex justify-between max-md:flex-col md:items-end">
								<p className="text-balance">Civilian Service</p>
								<p className="whitespace-nowrap font-mono md:text-right">SEP 2024 - JUL 2025</p>
							</div>
							<p className="text-balance text-foreground-muted">Had a really nice time there.</p>
						</div>
						<div className="space-y-2 pb-4">
							<div className="flex justify-between max-md:flex-col md:items-end">
								<p className="text-balance">CIC - Corporate Image Consulting GmbH, Traun</p>
								<p className="whitespace-nowrap font-mono md:text-right">MAY 2024 - AUG 2024</p>
							</div>
							<p className="text-balance text-foreground-muted">
								Developed and built websites from scratch using PHP and the company's internal system, customizing and finalizing
								them according to client requirements. Collaborated closely with designers and project managers to deliver
								high-quality digital solutions.
							</p>
						</div>
						<div className="space-y-2 pb-4">
							<div className="flex justify-between max-md:flex-col md:items-end">
								<p className="text-balance">SPS-Marketing, Linz</p>
								<p className="whitespace-nowrap font-mono md:text-right">JUN 2021 - MAR 2024</p>
							</div>
							<p className="text-balance text-foreground-muted">
								Apprenticeship as a Media Specialist - Focus on Web Development, awarded with distinction.
							</p>
						</div>
					</div>
				</section>
				<section className="layout-grid" aria-labelledby="education-heading">
					<div className="col-span-2 text-caption md:col-start-3">
						<h2 id="education-heading">Education</h2>
					</div>
					<div className="col-span-full col-start-5 text-caption md:col-span-6">
						<div className="space-y-2 pb-4">
							<div className="flex justify-between max-md:flex-col md:items-end">
								<p className="text-balance">Apprenticeship as a Media Specialist - Focus on Web Development</p>
								<p className="whitespace-nowrap font-mono md:text-right">JUN 2021 - MAR 2024</p>
							</div>
							<p className="text-balance text-foreground-muted">SPS-Marketing, Linz - Graduated with distinction.</p>
						</div>
						<div className="space-y-2 pb-4">
							<div className="flex justify-between max-md:flex-col md:items-end">
								<p className="text-balance">Higher Technical Institute (HTL) Perg - Computer Science</p>
								<p className="whitespace-nowrap font-mono md:text-right">SEP 2019 - JAN 2021</p>
							</div>
							<p className="text-balance text-foreground-muted">
								Attended for 1.5 years before transitioning into an apprenticeship.
							</p>
						</div>
						<div className="space-y-2 pb-4">
							<div className="flex justify-between max-md:flex-col md:items-end">
								<p className="text-balance">New Middle School (NMS) Naarn</p>
								<p className="whitespace-nowrap font-mono md:text-right">SEP 2015 - JUN 2019</p>
							</div>
							<p className="text-balance text-foreground-muted">General secondary education.</p>
						</div>
					</div>
				</section>
				<section className="layout-grid" aria-labelledby="skills-heading">
					<div className="col-span-2 text-caption md:col-start-3">
						<h2 id="skills-heading">Skills</h2>
					</div>
					<div className="col-span-full col-start-5 text-caption md:col-span-6">
						<ul className="grid gap-4 md:grid-cols-2">
							<li className="relative">
								<span className="-left-4 -translate-x-full -translate-y-1/2 absolute top-1/2 size-1.5 bg-foreground" />
								Web Technologies
							</li>
							<li className="relative">
								<span className="-left-4 -translate-x-full -translate-y-1/2 absolute top-1/2 size-1.5 bg-foreground" />
								Critical Thinking
							</li>
							<li className="relative space-y-2">
								<span className="-left-4 -translate-x-full -translate-y-1/2 absolute top-1/2 size-1.5 bg-foreground" />
								Problem Solving
							</li>
							<li className="relative space-y-2">
								<span className="-left-4 -translate-x-full -translate-y-1/2 absolute top-1/2 size-1.5 bg-foreground" />
								Teamplayer
							</li>
							<li className="relative space-y-2">
								<span className="-left-4 -translate-x-full -translate-y-1/2 absolute top-1/2 size-1.5 bg-foreground" />
								Perform under pressure
							</li>
							<li className="relative space-y-2">
								<span className="-left-4 -translate-x-full -translate-y-1/2 absolute top-1/2 size-1.5 bg-foreground" />
								Adaptable to new technologies
							</li>
						</ul>
					</div>
				</section>
				<section className="layout-grid" aria-labelledby="awards-heading">
					<div className="col-span-2 text-caption md:col-start-3">
						<h2 id="awards-heading">Awards</h2>
					</div>
					<div className="col-span-full col-start-5 text-caption md:col-span-6">
						<div className="space-y-2 pb-4">
							<div className="flex justify-between max-md:flex-col md:items-end">
								<p>
									<a
										href="https://www.german-brand-award.com/preistraeger/galerie/detail/41107-the-power-of-magna.html"
										target="_blank"
										rel="noopener noreferrer"
										className="text-balance hover:underline"
									>
										GBA Award 2022 - Magna cum laude
									</a>
								</p>
								<p className="whitespace-nowrap font-mono md:text-right">2022</p>
							</div>
							<p className="text-balance text-foreground-muted">
								Awarded for excellence in the field of media marketing with SPS Marketing.
							</p>
						</div>
						<div className="space-y-2 pb-4">
							<div className="flex justify-between max-md:flex-col md:items-end">
								<p className="text-balance">Apprenticeship Award for Excellence</p>
								<p className="whitespace-nowrap font-mono md:text-right">2024</p>
							</div>
							<p className="text-balance text-foreground-muted">
								Awarded for outstanding performance and distinction during apprenticeship as a Media Specialist, Focus on Web
								Development.
							</p>
						</div>
						<div className="space-y-2 pb-4">
							<div className="flex justify-between max-md:flex-col md:items-end">
								<p className="text-balance">
									<a
										href="https://www.awwwards.com/sites/hard-chor"
										target="_blank"
										rel="noopener noreferrer"
										className="text-balance hover:underline"
									>
										Awwwards | Honorable Mention - Hard-Chor
									</a>
								</p>
								<p className="whitespace-nowrap font-mono md:text-right">2026</p>
							</div>
							<p className="text-balance text-foreground-muted">Awarded for the website of the choir Hard-Chor.</p>
						</div>
					</div>
				</section>
				<section className="layout-grid" aria-label="Download resume">
					<div className="col-span-2 text-caption md:col-start-3" />
					<div className="col-span-full col-start-5 text-caption md:col-span-6">
						<p>
							<a
								href="/docs/RESUME-Benjamin_Wagner.pdf"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Download resume as PDF"
								className="w-fit bg-foreground px-2 py-0.5 text-left font-medium text-[clamp(.625rem,.5vw,.75rem)] text-background uppercase leading-none"
							>
								Download Resume
							</a>
						</p>
					</div>
				</section>
			</article>
		</Wrapper>
	);
};

export default ResumePage;
