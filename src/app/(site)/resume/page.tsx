import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "Resume :: Benjamin Wagner",
	description: "Frontend developer based in Linz, Austria",
	openGraph: {
		url: "https://bnm.st/resume",
		title: "Resume :: Benjamin Wagner",
		description: "Young Frontend Developer living in Linz, Austria.",
		images: [
			{
				url: "https://bnm.st/og.jpg",
				width: 800,
				height: 600,
				alt: "Resume :: Benjamin Wagner",
				type: "image/jpeg",
			},
		],
	},
};

const ResumePage: NextPage = () => {
	return (
		<main className="relative z-10 gap-x-5 space-y-24 px-5 pt-[50svh] pb-[15svh]">
			<div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12 ">
				<div className="mb-8 max-md:text-xl md:col-span-2 xl:col-start-2">
					<h1>Resume</h1>
				</div>
				<div className="space-y-8 md:col-span-5 md:col-start-3 xl:col-start-4">
					Benjamin Wagner -<br />
					Fullstack Experience Engineer
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12">
				<div className="mb-8 max-md:text-xl md:col-span-2 xl:col-start-2">
					<h2>Experience</h2>
				</div>
				<div className="space-y-8 md:col-span-5 md:col-start-3 xl:col-start-4">
					<div className="space-y-2 pb-4">
						<div className="flex justify-between max-md:flex-col md:items-end">
							<p className="text-balance">CIC - Corporate Image Consulting GmbH, Traun</p>
							<p className="whitespace-nowrap font-mono text-xs md:text-right">MAY 2024 - PRESENT</p>
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
							<p className="whitespace-nowrap font-mono text-xs md:text-right">JUN 2021 - MAR 2024</p>
						</div>
						<p className="text-balance text-foreground-muted">
							Apprenticeship as a Media Specialist - Focus on Web Development, awarded with distinction.
						</p>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12 ">
				<div className="mb-8 max-md:text-xl md:col-span-2 xl:col-start-2">
					<h2>Education</h2>
				</div>
				<div className="space-y-8 md:col-span-5 md:col-start-3 xl:col-start-4">
					<div className="space-y-2 pb-4">
						<div className="flex justify-between max-md:flex-col md:items-end">
							<p className="text-balance">Apprenticeship as a Media Specialist - Focus on Web Development</p>
							<p className="whitespace-nowrap font-mono text-xs md:text-right">JUN 2021 - MAR 2024</p>
						</div>
						<p className="text-balance text-foreground-muted">SPS-Marketing, Linz - Graduated with distinction.</p>
					</div>
					<div className="space-y-2 pb-4">
						<div className="flex justify-between max-md:flex-col md:items-end">
							<p className="text-balance">Higher Technical Institute (HTL) Perg - Computer Science</p>
							<p className="whitespace-nowrap font-mono text-xs md:text-right">SEP 2019 - JAN 2021</p>
						</div>
						<p className="text-balance text-foreground-muted">
							Attended for 1.5 years before transitioning into an apprenticeship.
						</p>
					</div>
					<div className="space-y-2 pb-4">
						<div className="flex justify-between max-md:flex-col md:items-end">
							<p className="text-balance">New Middle School (NMS) Naarn</p>
							<p className="whitespace-nowrap font-mono text-xs md:text-right">SEP 2015 - JUN 2019</p>
						</div>
						<p className="text-balance text-foreground-muted">General secondary education.</p>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12">
				<div className="mb-8 max-md:text-xl md:col-span-2 xl:col-start-2">
					<h2>Skills</h2>
				</div>
				<div className="space-y-6 md:col-span-5 md:col-start-3 xl:col-start-4">
					<ul className="grid gap-4 md:grid-cols-2">
						<li className="relative">
							<span className="-left-4 -translate-x-full -translate-y-1/2 absolute top-1/2 h-px w-3 bg-foreground-muted" />
							Web Technologies
						</li>
						<li className="relative">
							<span className="-left-4 -translate-x-full -translate-y-1/2 absolute top-1/2 h-px w-3 bg-foreground-muted" />
							Critical Thinking
						</li>
						<li className="relative space-y-2">
							<span className="-left-4 -translate-x-full -translate-y-1/2 absolute top-1/2 h-px w-3 bg-foreground-muted" />
							Problem Solving
						</li>
						<li className="relative space-y-2">
							<span className="-left-4 -translate-x-full -translate-y-1/2 absolute top-1/2 h-px w-3 bg-foreground-muted" />
							Teamplayer
						</li>
						<li className="relative space-y-2">
							<span className="-left-4 -translate-x-full -translate-y-1/2 absolute top-1/2 h-px w-3 bg-foreground-muted" />
							Perform under pressure
						</li>
						<li className="relative space-y-2">
							<span className="-left-4 -translate-x-full -translate-y-1/2 absolute top-1/2 h-px w-3 bg-foreground-muted" />
							Adaptable to new technologies
						</li>
					</ul>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12 ">
				<div className="mb-8 max-md:text-xl md:col-span-2 xl:col-start-2">
					<h2>Awards</h2>
				</div>
				<div className="space-y-8 md:col-span-5 md:col-start-3 xl:col-start-4">
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
							<p className="whitespace-nowrap font-mono text-xs md:text-right">2022</p>
						</div>
						<p className="text-balance text-foreground-muted">
							Awarded for excellence in the field of media marketing with SPS Marketing.
						</p>
					</div>
					<div className="space-y-2 pb-4">
						<div className="flex justify-between max-md:flex-col md:items-end">
							<p className="text-balance">Apprenticeship Award for Excellence</p>
							<p className="whitespace-nowrap font-mono text-xs md:text-right">2024</p>
						</div>
						<p className="text-balance text-foreground-muted">
							Awarded for outstanding performance and distinction during apprenticeship as a Media Specialist, Focus on Web
							Development.
						</p>
					</div>
				</div>
			</div>
		</main>
	);
};

export default ResumePage;
