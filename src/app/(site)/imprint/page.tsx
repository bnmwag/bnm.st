import { Wrapper } from "@/components/layout";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "Imprint",
	description: "Legal notice and provider information for bnm.st.",
	alternates: { canonical: "https://bnm.st/imprint" },
	robots: { index: false, follow: false },
	openGraph: {
		url: "https://bnm.st/imprint",
		title: "Imprint — Benjamin Wagner",
		description: "Legal notice and provider information for bnm.st.",
		images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Imprint — Benjamin Wagner", type: "image/jpeg" }],
	},
};

const ImprintPage: NextPage = () => {
	return (
		<Wrapper>
			<div id="main-content" className="relative space-y-24 py-[25vh]">
				<div className="layout-grid">
					<div className="col-span-full text-caption max-md:pb-10 md:col-span-2 md:col-start-3">
						<h1>Imprint</h1>
					</div>

					<div className="col-span-full space-y-10 text-caption text-foreground leading-normal md:col-span-8 xl:col-span-6">
						{/* Service Provider */}
						<section className="grid gap-4 sm:grid-cols-6">
							<div className="col-span-2">
								<h2>Service Provider</h2>
							</div>
							<div className="col-span-4">
								<p>Information according to §5 ECG and §25 MedienG.</p>

								<div className="mt-3">
									<p>Benjamin Wagner</p>
									<p>Bäckerfeld 4</p>
									<p>4331 Naarn im Machland</p>
									<p>Austria</p>

									<p className="mt-2">Phone: +43 660 1009499</p>
									<p>Email: bnm.wag@gmail.com</p>
									<p>Website: bnm.st</p>
								</div>
							</div>
						</section>

						{/* Responsible for Content */}
						<section className="grid gap-4 sm:grid-cols-6">
							<div className="col-span-2">
								<h2>Responsible for Content</h2>
							</div>
							<div className="col-span-4">
								<p>Responsible for the content of this website according to §25 Abs. 2 MedienG:</p>

								<div className="mt-3">
									<p>Benjamin Wagner</p>
									<p>Bäckerfeld 4</p>
									<p>4331 Naarn im Machland</p>
									<p>Austria</p>
								</div>
							</div>
						</section>

						{/* Purpose */}
						<section className="grid gap-4 sm:grid-cols-6">
							<div className="col-span-2">
								<h2>Purpose of the Website</h2>
							</div>
							<div className="col-span-4">
								<p>
									This website serves as a personal portfolio presenting projects, professional work, and services related to web
									development and design.
								</p>
							</div>
						</section>

						{/* EU Dispute Resolution */}
						<section className="grid gap-4 sm:grid-cols-6">
							<div className="col-span-2">
								<h2>EU Dispute Resolution</h2>
							</div>
							<div className="col-span-4 space-y-3">
								<p>
									In accordance with the Regulation on Online Dispute Resolution in Consumer Matters (ODR Regulation), we inform
									you about the Online Dispute Resolution platform of the European Commission.
								</p>

								<p>Consumers may submit complaints through the following platform:</p>

								<a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer" className="underline">
									https://ec.europa.eu/consumers/odr/
								</a>

								<p>The necessary contact information can be found above in this imprint.</p>
							</div>
						</section>

						{/* Consumer Dispute Resolution */}
						<section className="grid gap-4 sm:grid-cols-6">
							<div className="col-span-2">
								<h2>Consumer Dispute Resolution</h2>
							</div>
							<div className="col-span-4">
								<p>
									We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration
									board.
								</p>
							</div>
						</section>

						{/* Copyright */}
						<section className="grid gap-4 sm:grid-cols-6">
							<div className="col-span-2">
								<h2>Copyright</h2>
							</div>
							<div className="col-span-4 space-y-3">
								<p>
									All content on this website, including text, images, graphics, and design, is subject to copyright law unless
									otherwise indicated.
								</p>

								<p>
									Any reproduction, editing, distribution, or use of content beyond the limits of copyright law requires the prior
									written consent of the respective author or creator.
								</p>
							</div>
						</section>

						{/* Liability for Links */}
						<section className="grid gap-4 sm:grid-cols-6">
							<div className="col-span-2">
								<h2>Liability for Links</h2>
							</div>
							<div className="col-span-4">
								<p>
									This website may contain links to external websites. We have no influence over the content of those websites and
									therefore cannot assume any liability for their content. The respective provider or operator of the linked pages
									is always responsible for their content.
								</p>
							</div>
						</section>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default ImprintPage;
