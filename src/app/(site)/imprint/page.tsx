import { Wrapper } from "@/components/layout";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "Imprint",
	description: "Legal disclosure and imprint for bnm.st — Benjamin Wagner, Austria.",
	alternates: { canonical: "https://bnm.st/imprint" },
	robots: { index: false, follow: false },
	openGraph: {
		url: "https://bnm.st/imprint",
		title: "Imprint — Benjamin Wagner",
		description: "Legal disclosure for bnm.st.",
		images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Imprint — Benjamin Wagner", type: "image/jpeg" }],
	},
};

const ImprintPage: NextPage = () => {
	return (
		<Wrapper>
			<section className="relative space-y-24 py-[25vh]">
				<div className="layout-grid">
					<div className="col-span-2 text-caption md:col-start-3">
						<h1>Imprint</h1>
					</div>
					<div className="prose | col-span-full col-start-5 text-caption md:col-span-6">
						<p className="mt-0!">Informationen über den Diensteanbieter.</p>
						<p className="">Benjamin Wagner</p>
						<p className="">
							Bäckerfeld 4, <br />
							4331 Naarn im Machlande, <br />
							Österreich
						</p>
						<p>
							<strong>Tel.:</strong> 06601009499
							<br />
							<strong>E-Mail:</strong> <a href="mailto:bnm.wag@gmail.com">bnm.wag@gmail.com</a>
						</p>
						<h2
							id="eu-streitschlichtung"
							className=" fusion-responsive-typography-calculated"
							data-fontsize="24"
							data-lineheight="36px"
						>
							EU-Streitschlichtung
						</h2>
						<p className="">
							Gemäß Verordnung über Online-Streitbeilegung in Verbraucherangelegenheiten (ODR-Verordnung) möchten wir Sie über die
							Online-Streitbeilegungsplattform (OS-Plattform) informieren.
							<br />
							Verbraucher haben die Möglichkeit, Beschwerden an die Online Streitbeilegungsplattform der Europäischen Kommission
							unter{" "}
							<a
								className=""
								href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&amp;lng=DE"
								target="_blank"
								rel="noreferrer follow noopener"
							>
								https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&amp;lng=DE
							</a>{" "}
							zu richten. Die dafür notwendigen Kontaktdaten finden Sie oberhalb in unserem Impressum.
						</p>
						<p className="adsimple-122890790">
							Wir möchten Sie jedoch darauf hinweisen, dass wir nicht bereit oder verpflichtet sind, an Streitbeilegungsverfahren
							vor einer Verbraucherschlichtungsstelle teilzunehmen.
						</p>
						<p>Alle Texte sind urheberrechtlich geschützt.</p>
						<p className="mt-4">
							Quelle: Erstellt mit dem{" "}
							<a href="https://www.adsimple.at/impressum-generator/" title="Impressum Generator Österreich von AdSimple">
								Impressum Generator Österreich
							</a>{" "}
							von AdSimple
						</p>
					</div>
				</div>
			</section>
		</Wrapper>
	);
};

export default ImprintPage;
