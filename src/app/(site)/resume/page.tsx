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
		<main className="pt-[50svh] pb-[15svh] gap-x-5 px-5 z-10 relative space-y-24">
			<div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12 ">
				<div className="xl:col-start-2 md:col-span-2 mb-8 max-md:text-xl">
					<h1>Resume</h1>
				</div>
				<div className="md:col-start-3 xl:col-start-4 md:col-span-5 space-y-8">
					Benjamin Wagner -<br />
					Fullstack Experience Engineer
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12">
				<div className="xl:col-start-2 md:col-span-2 mb-8 max-md:text-xl">
					<h2>Experience</h2>
				</div>
				<div className="md:col-start-3 xl:col-start-4 md:col-span-5 space-y-8">
					<div className="pb-4 space-y-2">
						<div className="max-md:flex-col flex md:items-end justify-between">
							<p className="text-balance">
								CIC - Corporate Image Consulting GmbH, Traun
							</p>
							<p className="font-mono text-xs md:text-right whitespace-nowrap">
								MAY 2024 - PRESENT
							</p>
						</div>
						<p className="text-foreground-muted text-balance">
							Developed and built websites from scratch using PHP and the
							company's internal system, customizing and finalizing them
							according to client requirements. Collaborated closely with
							designers and project managers to deliver high-quality digital
							solutions.
						</p>
					</div>
					<div className="pb-4 space-y-2">
						<div className="max-md:flex-col flex md:items-end justify-between">
							<p className="text-balance">SPS-Marketing, Linz</p>
							<p className="font-mono text-xs md:text-right whitespace-nowrap">
								JUN 2021 - MAR 2024
							</p>
						</div>
						<p className="text-foreground-muted text-balance">
							Apprenticeship as a Media Specialist - Focus on Web Development,
							awarded with distinction.
						</p>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12 ">
				<div className="xl:col-start-2 md:col-span-2 mb-8 max-md:text-xl">
					<h2>Education</h2>
				</div>
				<div className="md:col-start-3 xl:col-start-4 md:col-span-5 space-y-8">
					<div className="pb-4 space-y-2">
						<div className="max-md:flex-col flex md:items-end justify-between">
							<p className="text-balance">
								Apprenticeship as a Media Specialist - Focus on Web Development
							</p>
							<p className="font-mono text-xs md:text-right whitespace-nowrap">
								JUN 2021 - MAR 2024
							</p>
						</div>
						<p className="text-foreground-muted text-balance">
							SPS-Marketing, Linz - Graduated with distinction.
						</p>
					</div>
					<div className="pb-4 space-y-2">
						<div className="max-md:flex-col flex md:items-end justify-between">
							<p className="text-balance">
								Higher Technical Institute (HTL) Perg - Computer Science
							</p>
							<p className="font-mono text-xs md:text-right whitespace-nowrap">
								SEP 2019 - JAN 2021
							</p>
						</div>
						<p className="text-foreground-muted text-balance">
							Attended for 1.5 years before transitioning into an
							apprenticeship.
						</p>
					</div>
					<div className="pb-4 space-y-2">
						<div className="max-md:flex-col flex md:items-end justify-between">
							<p className="text-balance">New Middle School (NMS) Naarn</p>
							<p className="font-mono text-xs md:text-right whitespace-nowrap">
								SEP 2015 - JUN 2019
							</p>
						</div>
						<p className="text-foreground-muted text-balance">
							General secondary education.
						</p>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12">
				<div className="xl:col-start-2 md:col-span-2 mb-8 max-md:text-xl">
					<h2>Skills</h2>
				</div>
				<div className="md:col-start-3 xl:col-start-4 md:col-span-5 space-y-6">
					<ul className="grid md:grid-cols-2 gap-4">
						<li className="relative">
							<span className="bg-foreground-muted absolute -left-4 -translate-x-full w-3 h-px top-1/2 -translate-y-1/2" />
							Web Technologies
						</li>
						<li className="relative">
							<span className="bg-foreground-muted absolute -left-4 -translate-x-full w-3 h-px top-1/2 -translate-y-1/2" />
							Critical Thinking
						</li>
						<li className="relative space-y-2">
							<span className="bg-foreground-muted absolute -left-4 -translate-x-full w-3 h-px top-1/2 -translate-y-1/2" />
							Problem Solving
						</li>
						<li className="relative space-y-2">
							<span className="bg-foreground-muted absolute -left-4 -translate-x-full w-3 h-px top-1/2 -translate-y-1/2" />
							Teamplayer
						</li>
						<li className="relative space-y-2">
							<span className="bg-foreground-muted absolute -left-4 -translate-x-full w-3 h-px top-1/2 -translate-y-1/2" />
							Perform under pressure
						</li>
						<li className="relative space-y-2">
							<span className="bg-foreground-muted absolute -left-4 -translate-x-full w-3 h-px top-1/2 -translate-y-1/2" />
							Adaptable to new technologies
						</li>
					</ul>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12 ">
				<div className="xl:col-start-2 md:col-span-2 mb-8 max-md:text-xl">
					<h2>Awards</h2>
				</div>
				<div className="md:col-start-3 xl:col-start-4 md:col-span-5 space-y-8">
					<div className="pb-4 space-y-2">
						<div className="max-md:flex-col flex md:items-end justify-between">
							<p>
								<a
									href="https://www.german-brand-award.com/preistraeger/galerie/detail/41107-the-power-of-magna.html"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:underline text-balance"
								>
									GBA Award 2022 - Magna cum laude
								</a>
							</p>
							<p className="font-mono text-xs md:text-right whitespace-nowrap">
								2022
							</p>
						</div>
						<p className="text-foreground-muted text-balance">
							Awarded for excellence in the field of media marketing with SPS
							Marketing.
						</p>
					</div>
					<div className="pb-4 space-y-2">
						<div className="max-md:flex-col flex md:items-end justify-between">
							<p className="text-balance">
								Apprenticeship Award for Excellence
							</p>
							<p className="font-mono text-xs md:text-right whitespace-nowrap">
								2024
							</p>
						</div>
						<p className="text-foreground-muted text-balance">
							Awarded for outstanding performance and distinction during
							apprenticeship as a Media Specialist, Focus on Web Development.
						</p>
					</div>
				</div>
			</div>
		</main>
	);
};

export default ResumePage;
