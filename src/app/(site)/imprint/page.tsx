import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "Imprint :: Benjamin Wagner",
	description: "Frontend developer based in Linz, Austria",
	openGraph: {
		url: "https://bnm.st/resume",
		title: " Imprint :: Benjamin Wagner",
		description: "Young Frontend Developer living in Linz, Austria.",
		images: [
			{
				url: "https://bnm.st/og.jpg",
				width: 800,
				height: 600,
				alt: "Imprint :: Benjamin Wagner",
				type: "image/jpeg",
			},
		],
	},
};

const ImprintPage: NextPage = () => {
	return (
		<main className="relative z-10 grid grid-cols-1 gap-x-5 px-5 pt-[50svh] pb-[15svh] md:grid-cols-6 xl:grid-cols-12">
			<div className="max-md:absolute max-md:top-5 max-md:left-5 max-md:h-full max-md:w-full md:col-span-2 xl:col-start-2">
				<h1>Imprint</h1>
			</div>
			<div className="prose | space-y-12 md:col-span-3 md:col-start-3 xl:col-start-4">
				<p className="!mt-0">Informationen über den Diensteanbieter.</p>
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
					Verbraucher haben die Möglichkeit, Beschwerden an die Online Streitbeilegungsplattform der Europäischen Kommission unter{" "}
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
					Wir möchten Sie jedoch darauf hinweisen, dass wir nicht bereit oder verpflichtet sind, an Streitbeilegungsverfahren vor
					einer Verbraucherschlichtungsstelle teilzunehmen.
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
		</main>
	);
};

export default ImprintPage;
