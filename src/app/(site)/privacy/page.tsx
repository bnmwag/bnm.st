import { Wrapper } from "@/components/layout";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description: "Privacy policy for bnm.st — how your data is handled when you visit or contact Benjamin Wagner.",
	alternates: { canonical: "https://bnm.st/privacy" },
	robots: { index: false, follow: false },
	openGraph: {
		url: "https://bnm.st/privacy",
		title: "Privacy Policy — Benjamin Wagner",
		description: "Privacy policy for bnm.st.",
		images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Privacy Policy — Benjamin Wagner", type: "image/jpeg" }],
	},
};

const ImprintPage: NextPage = () => {
	return (
		<Wrapper>
			<div className="relative space-y-24 py-[25vh]">
				<div className="layout-grid">
					<div className="col-span-full text-caption max-md:pb-10 md:col-span-2 md:col-start-3">
						<h1>Privacy Policy</h1>
					</div>

					<div className="col-span-full space-y-10 text-caption text-foreground leading-normal md:col-span-8 xl:col-span-6">
						<section className="grid gap-4 sm:grid-cols-6">
							<div className="col-span-2">
								<h2>Controller</h2>
							</div>
							<div className="col-span-4">
								<p>The controller responsible for data processing on this website is:</p>
								<div className="mt-3">
									<p>Benjamin Wagner</p>
									<p>Bäckerfeld 4</p>
									<p>4331 Naarn im Machland</p>
									<p>Austria</p>
									<p className="mt-2">Email: bnm.wag@gmail.com</p>
									<p>Website: bnm.st</p>
								</div>
							</div>
						</section>

						<section className="grid gap-4 sm:grid-cols-6">
							<div className="col-span-2">
								<h2>General Information</h2>
							</div>
							<div className="col-span-4 space-y-3">
								<p>This privacy policy explains how personal data is collected and processed when visiting this website.</p>
								<p>
									Personal data refers to any information relating to an identified or identifiable person, such as name, email
									address, or IP address.
								</p>
								<p>
									Data processing is carried out in accordance with the General Data Protection Regulation (GDPR) and applicable
									Austrian data protection laws.
								</p>
							</div>
						</section>

						{/* Hosting */}
						<section className="grid gap-4 sm:grid-cols-6">
							<div className="col-span-2">
								<h2>Hosting</h2>
							</div>
							<div className="col-span-4 space-y-3">
								<p>This website is hosted by Vercel.</p>

								<p>When you visit this website, Vercel may process technical data required to deliver the website, including:</p>

								<ul className="list-disc space-y-1 pl-6">
									<li>IP address</li>
									<li>browser type and version</li>
									<li>operating system</li>
									<li>referrer URL</li>
									<li>date and time of access</li>
									<li>requested resources</li>
								</ul>

								<p>These server logs are necessary to ensure the security, stability, and proper operation of the website.</p>

								<p>The processing is based on Art. 6(1)(f) GDPR (legitimate interest) in providing a reliable online service.</p>

								<p>
									Data may be processed on servers located outside the European Union, including the United States. Vercel
									participates in the EU-US Data Privacy Framework, ensuring an adequate level of data protection.
								</p>

								<p>
									More information:
									<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer" className="ml-1 underline">
										https://vercel.com/legal/privacy-policy
									</a>
								</p>
							</div>
						</section>

						{/* Analytics */}
						<section className="grid gap-4 sm:grid-cols-6">
							<div className="col-span-2">
								<h2>Website Analytics</h2>
							</div>
							<div className="col-span-4 space-y-3">
								<p>This website uses Vercel Web Analytics, a privacy-focused analytics service provided by Vercel.</p>

								<p>
									Vercel Analytics collects aggregated and anonymized usage information to help understand how visitors interact
									with the website.
								</p>

								<p>The collected information may include:</p>

								<ul className="list-disc space-y-1 pl-6">
									<li>visited pages</li>
									<li>referrer URL</li>
									<li>device type</li>
									<li>browser and operating system</li>
									<li>country-level location</li>
									<li>timestamp of page visits</li>
								</ul>

								<p>According to the provider, the analytics service:</p>

								<ul className="list-disc space-y-1 pl-6">
									<li>does not use tracking cookies</li>
									<li>does not track users across websites</li>
									<li>does not collect personally identifiable information</li>
								</ul>

								<p>The processing is based on Art. 6(1)(f) GDPR (legitimate interest) to analyze and improve the website.</p>

								<p>
									More information:
									<a
										href="https://vercel.com/docs/analytics/privacy-policy"
										target="_blank"
										rel="noreferrer"
										className="ml-1 underline"
									>
										https://vercel.com/docs/analytics/privacy-policy
									</a>
								</p>
							</div>
						</section>

						{/* Contact Form */}
						<section className="grid gap-4 sm:grid-cols-6">
							<div className="col-span-2">
								<h2>Contact Form</h2>
							</div>
							<div className="col-span-4 space-y-3">
								<p>This website provides a contact form for project inquiries.</p>

								<p>When you submit the form, the following information may be collected:</p>

								<ul className="list-disc space-y-1 pl-6">
									<li>name</li>
									<li>email address</li>
									<li>company (optional)</li>
									<li>current website (optional)</li>
									<li>project type</li>
									<li>timeline</li>
									<li>budget</li>
									<li>message content</li>
								</ul>

								<p>This information is used solely to process and respond to your inquiry.</p>

								<p>The processing is based on:</p>

								<ul className="list-disc space-y-1 pl-6">
									<li>Art. 6(1)(b) GDPR – processing necessary to respond to a request or potential contract</li>
									<li>Art. 6(1)(f) GDPR – legitimate interest in managing inquiries</li>
								</ul>
							</div>
						</section>

						{/* Discord */}
						<section className="grid gap-4 sm:grid-cols-6">
							<div className="col-span-2">
								<h2>Data Transfer to Discord</h2>
							</div>
							<div className="col-span-4 space-y-3">
								<p>Form submissions are forwarded via a webhook to Discord for notification purposes.</p>

								<p>This means the information you submit through the contact form may be transmitted to Discord servers.</p>

								<p>Discord may process personal data according to its own privacy policy:</p>

								<a href="https://discord.com/privacy" target="_blank" rel="noreferrer" className="underline">
									https://discord.com/privacy
								</a>

								<p>The website operator has no control over how Discord processes data once it has been transmitted.</p>
							</div>
						</section>

						{/* Data Retention */}
						<section className="grid gap-4 sm:grid-cols-6">
							<div className="col-span-2">
								<h2>Data Retention</h2>
							</div>
							<div className="col-span-4 space-y-3">
								<p>
									Personal data submitted through the contact form is retained only as long as necessary to process the request or
									maintain communication regarding a project inquiry.
								</p>

								<p>If no business relationship results, the data will typically be deleted after a reasonable period.</p>
							</div>
						</section>

						{/* Rights */}
						<section className="grid gap-4 sm:grid-cols-6">
							<div className="col-span-2">
								<h2>Your Rights</h2>
							</div>
							<div className="col-span-4 space-y-3">
								<p>Under the GDPR, you have the following rights regarding your personal data:</p>

								<ul className="list-disc space-y-1 pl-6">
									<li>Right of access (Art. 15 GDPR)</li>
									<li>Right to rectification (Art. 16 GDPR)</li>
									<li>Right to erasure (Art. 17 GDPR)</li>
									<li>Right to restriction of processing (Art. 18 GDPR)</li>
									<li>Right to data portability (Art. 20 GDPR)</li>
									<li>Right to object to processing (Art. 21 GDPR)</li>
								</ul>

								<p>To exercise any of these rights, contact:</p>

								<p>bnm.wag@gmail.com</p>
							</div>
						</section>

						{/* Complaint */}
						<section className="grid gap-4 sm:grid-cols-6">
							<div className="col-span-2">
								<h2>Supervisory Authority</h2>
							</div>
							<div className="col-span-4 space-y-3">
								<p>
									If you believe your data has been processed unlawfully, you have the right to lodge a complaint with a
									supervisory authority.
								</p>

								<p>In Austria, the competent authority is:</p>

								<a href="https://www.dsb.gv.at" target="_blank" rel="noreferrer" className="underline">
									Austrian Data Protection Authority (Datenschutzbehörde)
								</a>
							</div>
						</section>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default ImprintPage;
