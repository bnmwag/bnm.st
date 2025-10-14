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
				<h1>Privacy Policy</h1>
			</div>
			<div className="prose | space-y-12 md:col-span-3 md:col-start-3 xl:col-start-4">
				<h2>Inhaltsverzeichnis</h2>
				<ul>
					<li>
						<a href="#einleitung-ueberblick">Einleitung und Überblick</a>
					</li>
					<li>
						<a href="#anwendungsbereich">Anwendungsbereich</a>
					</li>
					<li>
						<a href="#rechtsgrundlagen">Rechtsgrundlagen</a>
					</li>
					<li>
						<a href="#kontaktdaten-verantwortliche">Kontaktdaten des Verantwortlichen</a>
					</li>
					<li>
						<a href="#speicherdauer">Speicherdauer</a>
					</li>
					<li>
						<a href="#rechte-dsgvo">Rechte laut Datenschutz-Grundverordnung</a>
					</li>
					<li>
						<a href="#web-analytics-einleitung">Web Analytics Einleitung</a>
					</li>
					<li>
						<a href="#erklaerung-verwendeter-begriffe">Erklärung verwendeter Begriffe</a>
					</li>
				</ul>
				<h2 id="einleitung-ueberblick" className="adsimple-112890787">
					Einleitung und Überblick
				</h2>
				<p>
					Wir haben diese Datenschutzerklärung (Fassung 14.10.2024-112890787) verfasst, um Ihnen gemäß der Vorgaben der{" "}
					<a
						className="adsimple-112890787"
						href="https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32016R0679&amp;from=DE&amp;tid=112890787#d1e2269-1-1"
						target="_blank"
						rel="noreferrer noopener"
					>
						Datenschutz-Grundverordnung (EU) 2016/679
					</a>{" "}
					und anwendbaren nationalen Gesetzen zu erklären, welche personenbezogenen Daten (kurz Daten) wir als Verantwortliche
					&#8211; und die von uns beauftragten Auftragsverarbeiter (z. B. Provider) &#8211; verarbeiten, zukünftig verarbeiten
					werden und welche rechtmäßigen Möglichkeiten Sie haben. Die verwendeten Begriffe sind geschlechtsneutral zu verstehen.
					<br />
					<strong className="adsimple-112890787">Kurz gesagt:</strong> Wir informieren Sie umfassend über Daten, die wir über Sie
					verarbeiten.
				</p>
				<p>
					Datenschutzerklärungen klingen für gewöhnlich sehr technisch und verwenden juristische Fachbegriffe. Diese
					Datenschutzerklärung soll Ihnen hingegen die wichtigsten Dinge so einfach und transparent wie möglich beschreiben.
					Soweit es der Transparenz förderlich ist, werden technische{" "}
					<strong className="adsimple-112890787">Begriffe leserfreundlich erklärt</strong>, Links zu weiterführenden Informationen
					geboten und <strong className="adsimple-112890787">Grafiken</strong> zum Einsatz gebracht. Wir informieren damit in
					klarer und einfacher Sprache, dass wir im Rahmen unserer Geschäftstätigkeiten nur dann personenbezogene Daten
					verarbeiten, wenn eine entsprechende gesetzliche Grundlage gegeben ist. Das ist sicher nicht möglich, wenn man möglichst
					knappe, unklare und juristisch-technische Erklärungen abgibt, so wie sie im Internet oft Standard sind, wenn es um
					Datenschutz geht. Ich hoffe, Sie finden die folgenden Erläuterungen interessant und informativ und vielleicht ist die
					eine oder andere Information dabei, die Sie noch nicht kannten.
					<br />
					Wenn trotzdem Fragen bleiben, möchten wir Sie bitten, sich an die unten bzw. im Impressum genannte verantwortliche
					Stelle zu wenden, den vorhandenen Links zu folgen und sich weitere Informationen auf Drittseiten anzusehen. Unsere
					Kontaktdaten finden Sie selbstverständlich auch im Impressum.
				</p>
				<h2 id="anwendungsbereich" className="adsimple-112890787">
					Anwendungsbereich
				</h2>
				<p>
					Diese Datenschutzerklärung gilt für alle von uns im Unternehmen verarbeiteten personenbezogenen Daten und für alle
					personenbezogenen Daten, die von uns beauftragte Firmen (Auftragsverarbeiter) verarbeiten. Mit personenbezogenen Daten
					meinen wir Informationen im Sinne des Art. 4 Nr. 1 DSGVO wie zum Beispiel Name, E-Mail-Adresse und postalische Anschrift
					einer Person. Die Verarbeitung personenbezogener Daten sorgt dafür, dass wir unsere Dienstleistungen und Produkte
					anbieten und abrechnen können, sei es online oder offline. Der Anwendungsbereich dieser Datenschutzerklärung umfasst:
				</p>
				<ul className="adsimple-112890787">
					<li className="adsimple-112890787">alle Onlineauftritte (Websites, Onlineshops), die wir betreiben</li>
					<li className="adsimple-112890787">Social Media Auftritte und E-Mail-Kommunikation</li>
					<li className="adsimple-112890787">mobile Apps für Smartphones und andere Geräte</li>
				</ul>
				<p>
					<strong className="adsimple-112890787">Kurz gesagt:</strong> Die Datenschutzerklärung gilt für alle Bereiche, in denen
					personenbezogene Daten im Unternehmen über die genannten Kanäle strukturiert verarbeitet werden. Sollten wir außerhalb
					dieser Kanäle mit Ihnen in Rechtsbeziehungen eintreten, werden wir Sie gegebenenfalls gesondert informieren.
				</p>
				<h2 id="rechtsgrundlagen" className="adsimple-112890787">
					Rechtsgrundlagen
				</h2>
				<p>
					In der folgenden Datenschutzerklärung geben wir Ihnen transparente Informationen zu den rechtlichen Grundsätzen und
					Vorschriften, also den Rechtsgrundlagen der Datenschutz-Grundverordnung, die uns ermöglichen, personenbezogene Daten zu
					verarbeiten.
					<br />
					Was das EU-Recht betrifft, beziehen wir uns auf die VERORDNUNG (EU) 2016/679 DES EUROPÄISCHEN PARLAMENTS UND DES RATES
					vom 27. April 2016. Diese Datenschutz-Grundverordnung der EU können Sie selbstverständlich online auf EUR-Lex, dem
					Zugang zum EU-Recht, unter{" "}
					<a className="adsimple-112890787" href="https://eur-lex.europa.eu/legal-content/DE/ALL/?uri=celex%3A32016R0679">
						https://eur-lex.europa.eu/legal-content/DE/ALL/?uri=celex%3A32016R0679
					</a>{" "}
					nachlesen.
				</p>
				<p>Wir verarbeiten Ihre Daten nur, wenn mindestens eine der folgenden Bedingungen zutrifft:</p>
				<ol>
					<li className="adsimple-112890787">
						<strong className="adsimple-112890787">Einwilligung</strong> (Artikel 6 Absatz 1 lit. a DSGVO): Sie haben uns Ihre
						Einwilligung gegeben, Daten zu einem bestimmten Zweck zu verarbeiten. Ein Beispiel wäre die Speicherung Ihrer
						eingegebenen Daten eines Kontaktformulars.
					</li>
					<li className="adsimple-112890787">
						<strong className="adsimple-112890787">Vertrag</strong> (Artikel 6 Absatz 1 lit. b DSGVO): Um einen Vertrag oder
						vorvertragliche Verpflichtungen mit Ihnen zu erfüllen, verarbeiten wir Ihre Daten. Wenn wir zum Beispiel einen
						Kaufvertrag mit Ihnen abschließen, benötigen wir vorab personenbezogene Informationen.
					</li>
					<li className="adsimple-112890787">
						<strong className="adsimple-112890787">Rechtliche Verpflichtung</strong> (Artikel 6 Absatz 1 lit. c DSGVO): Wenn wir
						einer rechtlichen Verpflichtung unterliegen, verarbeiten wir Ihre Daten. Zum Beispiel sind wir gesetzlich verpflichtet
						Rechnungen für die Buchhaltung aufzuheben. Diese enthalten in der Regel personenbezogene Daten.
					</li>
					<li className="adsimple-112890787">
						<strong className="adsimple-112890787">Berechtigte Interessen</strong> (Artikel 6 Absatz 1 lit. f DSGVO): Im Falle
						berechtigter Interessen, die Ihre Grundrechte nicht einschränken, behalten wir uns die Verarbeitung personenbezogener
						Daten vor. Wir müssen zum Beispiel gewisse Daten verarbeiten, um unsere Website sicher und wirtschaftlich effizient
						betreiben zu können. Diese Verarbeitung ist somit ein berechtigtes Interesse.
					</li>
				</ol>
				<p>
					Weitere Bedingungen wie die Wahrnehmung von Aufnahmen im öffentlichen Interesse und Ausübung öffentlicher Gewalt sowie
					dem Schutz lebenswichtiger Interessen treten bei uns in der Regel nicht auf. Soweit eine solche Rechtsgrundlage doch
					einschlägig sein sollte, wird diese an der entsprechenden Stelle ausgewiesen.
				</p>
				<p>Zusätzlich zu der EU-Verordnung gelten auch noch nationale Gesetze:</p>
				<ul className="adsimple-112890787">
					<li className="adsimple-112890787">
						In <strong className="adsimple-112890787">Österreich</strong> ist dies das Bundesgesetz zum Schutz natürlicher
						Personen bei der Verarbeitung personenbezogener Daten (
						<strong className="adsimple-112890787">Datenschutzgesetz</strong>), kurz{" "}
						<strong className="adsimple-112890787">DSG</strong>.
					</li>
					<li className="adsimple-112890787">
						In <strong className="adsimple-112890787">Deutschland</strong> gilt das{" "}
						<strong className="adsimple-112890787">Bundesdatenschutzgesetz</strong>, kurz
						<strong className="adsimple-112890787"> BDSG</strong>.
					</li>
				</ul>
				<p>
					Sofern weitere regionale oder nationale Gesetze zur Anwendung kommen, informieren wir Sie in den folgenden Abschnitten
					darüber.
				</p>
				<h2 id="kontaktdaten-verantwortliche" className="adsimple-112890787">
					Kontaktdaten des Verantwortlichen
				</h2>
				<p>
					Sollten Sie Fragen zum Datenschutz oder zur Verarbeitung personenbezogener Daten haben, finden Sie nachfolgend die
					Kontaktdaten der verantwortlichen Person bzw. Stelle:
					<br />
					<span className="adsimple-112890787">
						Musterfirma GmbH
						<br />
						Max Mustermann
						<br />
						Musterstraße 47, 12312 Musterstadt, Österreich
					</span>
					<br />
					<span>Vertretungsberechtigt: Markus Mustermann</span>
					<br />
					E-Mail: <a href="mailto:mail@musterfirma.at">mail@musterfirma.at</a>
					<br />
					Telefon: <a href="tel:+43 4711 12345">+43 4711 12345</a>
					<br />
					Impressum: <a href="https://www.musterfirma.at/impressum/">https://www.musterfirma.at/impressum/</a>
				</p>
				<h2 id="speicherdauer" className="adsimple-112890787">
					Speicherdauer
				</h2>
				<p>
					Dass wir personenbezogene Daten nur so lange speichern, wie es für die Bereitstellung unserer Dienstleistungen und
					Produkte unbedingt notwendig ist, gilt als generelles Kriterium bei uns. Das bedeutet, dass wir personenbezogene Daten
					löschen, sobald der Grund für die Datenverarbeitung nicht mehr vorhanden ist. In einigen Fällen sind wir gesetzlich dazu
					verpflichtet, bestimmte Daten auch nach Wegfall des ursprüngliches Zwecks zu speichern, zum Beispiel zu Zwecken der
					Buchführung.
				</p>
				<p>
					Sollten Sie die Löschung Ihrer Daten wünschen oder die Einwilligung zur Datenverarbeitung widerrufen, werden die Daten
					so rasch wie möglich und soweit keine Pflicht zur Speicherung besteht, gelöscht.
				</p>
				<p>
					Über die konkrete Dauer der jeweiligen Datenverarbeitung informieren wir Sie weiter unten, sofern wir weitere
					Informationen dazu haben.
				</p>
				<h2 id="rechte-dsgvo" className="adsimple-112890787">
					Rechte laut Datenschutz-Grundverordnung
				</h2>
				<p>
					Gemäß Artikel 13, 14 DSGVO informieren wir Sie über die folgenden Rechte, die Ihnen zustehen, damit es zu einer fairen
					und transparenten Verarbeitung von Daten kommt:
				</p>
				<ul className="adsimple-112890787">
					<li className="adsimple-112890787">
						Sie haben laut Artikel 15 DSGVO ein Auskunftsrecht darüber, ob wir Daten von Ihnen verarbeiten. Sollte das zutreffen,
						haben Sie Recht darauf eine Kopie der Daten zu erhalten und die folgenden Informationen zu erfahren:
						<ul className="adsimple-112890787">
							<li className="adsimple-112890787">zu welchem Zweck wir die Verarbeitung durchführen;</li>
							<li className="adsimple-112890787">die Kategorien, also die Arten von Daten, die verarbeitet werden;</li>
							<li className="adsimple-112890787">
								wer diese Daten erhält und wenn die Daten an Drittländer übermittelt werden, wie die Sicherheit garantiert werden
								kann;
							</li>
							<li className="adsimple-112890787">wie lange die Daten gespeichert werden;</li>
							<li className="adsimple-112890787">
								das Bestehen des Rechts auf Berichtigung, Löschung oder Einschränkung der Verarbeitung und dem Widerspruchsrecht
								gegen die Verarbeitung;
							</li>
							<li className="adsimple-112890787">
								dass Sie sich bei einer Aufsichtsbehörde beschweren können (Links zu diesen Behörden finden Sie weiter unten);
							</li>
							<li className="adsimple-112890787">die Herkunft der Daten, wenn wir sie nicht bei Ihnen erhoben haben;</li>
							<li className="adsimple-112890787">
								ob Profiling durchgeführt wird, ob also Daten automatisch ausgewertet werden, um zu einem persönlichen Profil von
								Ihnen zu gelangen.
							</li>
						</ul>
					</li>
					<li className="adsimple-112890787">
						Sie haben laut Artikel 16 DSGVO ein Recht auf Berichtigung der Daten, was bedeutet, dass wir Daten richtig stellen
						müssen, falls Sie Fehler finden.
					</li>
					<li className="adsimple-112890787">
						Sie haben laut Artikel 17 DSGVO das Recht auf Löschung („Recht auf Vergessenwerden“), was konkret bedeutet, dass Sie
						die Löschung Ihrer Daten verlangen dürfen.
					</li>
					<li className="adsimple-112890787">
						Sie haben laut Artikel 18 DSGVO das Recht auf Einschränkung der Verarbeitung, was bedeutet, dass wir die Daten nur
						mehr speichern dürfen aber nicht weiter verwenden.
					</li>
					<li className="adsimple-112890787">
						Sie haben laut Artikel 20 DSGVO das Recht auf Datenübertragbarkeit, was bedeutet, dass wir Ihnen auf Anfrage Ihre
						Daten in einem gängigen Format zur Verfügung stellen.
					</li>
					<li className="adsimple-112890787">
						Sie haben laut Artikel 21 DSGVO ein Widerspruchsrecht, welches nach Durchsetzung eine Änderung der Verarbeitung mit
						sich bringt.
						<ul className="adsimple-112890787">
							<li className="adsimple-112890787">
								Wenn die Verarbeitung Ihrer Daten auf Artikel 6 Abs. 1 lit. e (öffentliches Interesse, Ausübung öffentlicher
								Gewalt) oder Artikel 6 Abs. 1 lit. f (berechtigtes Interesse) basiert, können Sie gegen die Verarbeitung
								Widerspruch einlegen. Wir prüfen danach so rasch wie möglich, ob wir diesem Widerspruch rechtlich nachkommen
								können.
							</li>
							<li className="adsimple-112890787">
								Werden Daten verwendet, um Direktwerbung zu betreiben, können Sie jederzeit gegen diese Art der Datenverarbeitung
								widersprechen. Wir dürfen Ihre Daten danach nicht mehr für Direktmarketing verwenden.
							</li>
							<li className="adsimple-112890787">
								Werden Daten verwendet, um Profiling zu betreiben, können Sie jederzeit gegen diese Art der Datenverarbeitung
								widersprechen. Wir dürfen Ihre Daten danach nicht mehr für Profiling verwenden.
							</li>
						</ul>
					</li>
					<li className="adsimple-112890787">
						Sie haben laut Artikel 22 DSGVO unter Umständen das Recht, nicht einer ausschließlich auf einer automatisierten
						Verarbeitung (zum Beispiel Profiling) beruhenden Entscheidung unterworfen zu werden.
					</li>
					<li className="adsimple-112890787">
						Sie haben laut Artikel 77 DSGVO das Recht auf Beschwerde. Das heißt, Sie können sich jederzeit bei der
						Datenschutzbehörde beschweren, wenn Sie der Meinung sind, dass die Datenverarbeitung von personenbezogenen Daten gegen
						die DSGVO verstößt.
					</li>
				</ul>
				<p>
					<strong className="adsimple-112890787">Kurz gesagt:</strong> Sie haben Rechte &#8211; zögern Sie nicht, die oben
					gelistete verantwortliche Stelle bei uns zu kontaktieren!
				</p>
				<p>
					Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen
					Ansprüche in sonst einer Weise verletzt worden sind, können Sie sich bei der Aufsichtsbehörde beschweren. Diese ist für
					Österreich die Datenschutzbehörde, deren Website Sie unter{" "}
					<a className="adsimple-112890787" href="https://www.dsb.gv.at/?tid=112890787" target="_blank" rel="noreferrer noopener">
						https://www.dsb.gv.at/
					</a>{" "}
					finden. In Deutschland gibt es für jedes Bundesland einen Datenschutzbeauftragten. Für nähere Informationen können Sie
					sich an die{" "}
					<a
						className="adsimple-112890787"
						href="https://www.bfdi.bund.de/DE/Home/home_node.html"
						target="_blank"
						rel="noreferrer noopener"
					>
						Bundesbeauftragte für den Datenschutz und die Informationsfreiheit (BfDI)
					</a>{" "}
					wenden. Für unser Unternehmen ist die folgende lokale Datenschutzbehörde zuständig:
				</p>
				<h2 id="web-analytics-einleitung" className="adsimple-112890787">
					Web Analytics Einleitung
				</h2>
				<table>
					<tbody>
						<tr>
							<td>
								<strong className="adsimple-112890787">Web Analytics Datenschutzerklärung Zusammenfassung</strong>
								<br />
								&#x1f465; Betroffene: Besucher der Website
								<br />
								&#x1f91d; Zweck: Auswertung der Besucherinformationen zur Optimierung des Webangebots.
								<br />
								&#x1f4d3; Verarbeitete Daten: Zugriffsstatistiken, die Daten wie Standorte der Zugriffe, Gerätedaten,
								Zugriffsdauer und Zeitpunkt, Navigationsverhalten, Klickverhalten und IP-Adressen enthalten. Mehr Details dazu
								finden Sie beim jeweils eingesetzten Web Analytics Tool.
								<br />
								&#x1f4c5; Speicherdauer: abhängig vom eingesetzten Web-Analytics-Tool
								<br />
								&#x2696;&#xfe0f; Rechtsgrundlagen: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), Art. 6 Abs. 1 lit. f DSGVO
								(Berechtigte Interessen)
							</td>
						</tr>
					</tbody>
				</table>
				<h3 className="adsimple-112890787">Was ist Web Analytics?</h3>
				<p>
					Wir verwenden auf unserer Website Software zur Auswertung des Verhaltens der Website-Besucher, kurz Web Analytics oder
					Web-Analyse genannt. Dabei werden Daten gesammelt, die der jeweilige Analytic-Tool-Anbieter (auch Trackingtool genannt)
					speichert, verwaltet und verarbeitet. Mit Hilfe der Daten werden Analysen über das Nutzerverhalten auf unserer Website
					erstellt und uns als Websitebetreiber zur Verfügung gestellt. Zusätzlich bieten die meisten Tools verschiedene
					Testmöglichkeiten an. So können wir etwa testen, welche Angebote oder Inhalte bei unseren Besuchern am besten ankommen.
					Dafür zeigen wir Ihnen für einen begrenzten Zeitabschnitt zwei verschiedene Angebote. Nach dem Test (sogenannter
					A/B-Test) wissen wir, welches Produkt bzw. welcher Inhalt unsere Websitebesucher interessanter finden. Für solche
					Testverfahren, wie auch für andere Analytics-Verfahren, können auch Userprofile erstellt werden und die Daten in Cookies
					gespeichert werden.
				</p>
				<h3 className="adsimple-112890787">Warum betreiben wir Web Analytics?</h3>
				<p>
					Mit unserer Website haben wir ein klares Ziel vor Augen: wir wollen für unsere Branche das beste Webangebot auf dem
					Markt liefern. Um dieses Ziel zu erreichen, wollen wir einerseits das beste und interessanteste Angebot bieten und
					andererseits darauf achten, dass Sie sich auf unserer Website rundum wohlfühlen. Mit Hilfe von Webanalyse-Tools können
					wir das Verhalten unserer Websitebesucher genauer unter die Lupe nehmen und dann entsprechend unser Webangebot für Sie
					und uns verbessern. So können wir beispielsweise erkennen wie alt unsere Besucher durchschnittlich sind, woher sie
					kommen, wann unsere Website am meisten besucht wird oder welche Inhalte oder Produkte besonders beliebt sind. All diese
					Informationen helfen uns die Website zu optimieren und somit bestens an Ihre Bedürfnisse, Interessen und Wünsche
					anzupassen.
				</p>
				<h3 className="adsimple-112890787">Welche Daten werden verarbeitet?</h3>
				<p>
					Welche Daten genau gespeichert werden, hängt natürlich von den verwendeten Analyse-Tools ab. Doch in der Regel wird zum
					Beispiel gespeichert, welche Inhalte Sie auf unserer Website ansehen, auf welche Buttons oder Links Sie klicken, wann
					Sie eine Seite aufrufen, welchen Browser sie verwenden, mit welchem Gerät (PC, Tablet, Smartphone usw.) Sie die Website
					besuchen oder welches Computersystem Sie verwenden. Wenn Sie damit einverstanden waren, dass auch Standortdaten erhoben
					werden dürfen, können auch diese durch den Webanalyse-Tool-Anbieter verarbeitet werden.
				</p>
				<p>
					Zudem wird auch Ihre IP-Adresse gespeichert. Gemäß der Datenschutz-Grundverordnung (DSGVO) sind IP-Adressen
					personenbezogene Daten. Ihre IP-Adresse wird allerdings in der Regel pseudonymisiert (also in unkenntlicher und
					gekürzter Form) gespeichert. Für den Zweck der Tests, der Webanalyse und der Weboptimierung werden grundsätzlich keine
					direkten Daten, wie etwa Ihr Name, Ihr Alter, Ihre Adresse oder Ihre E-Mail-Adresse gespeichert. All diese Daten werden,
					sofern sie erhoben werden, pseudonymisiert gespeichert. So können Sie als Person nicht identifiziert werden.
				</p>
				<p>
					Das folgende Beispiel zeigt schematisch die Funktionsweise von Google Analytics als Beispiel für client-basiertes
					Webtracking mit Java-Script-Code.
				</p>
				<p>
					<img
						src="https://www.adsimple.at/wp-content/uploads/2021/04/google-analytics-dataflow.svg"
						alt="Schematischer Datenfluss bei Google Analytics"
						width="100%"
					/>
				</p>
				<p>
					Wie lange die jeweiligen Daten gespeichert werden, hängt immer vom Anbieter ab. Manche Cookies speichern Daten nur für
					ein paar Minuten bzw. bis Sie die Website wieder verlassen, andere Cookies können Daten über mehrere Jahre speichern.
				</p>
				<h3 className="adsimple-112890787">
					<span
						className="adsimple-112890787"
						data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Wo und wie lange werden Daten gespeichert?&quot;}"
						data-sheets-userformat="{&quot;2&quot;:769,&quot;3&quot;:{&quot;1&quot;:0},&quot;11&quot;:4,&quot;12&quot;:0}"
					>
						Dauer der Datenverarbeitung
					</span>
				</h3>
				<p>
					Über die Dauer der Datenverarbeitung informieren wir Sie weiter unten, sofern wir weitere Informationen dazu haben.
					Generell verarbeiten wir personenbezogene Daten nur so lange wie es für die Bereitstellung unserer Dienstleistungen und
					Produkte unbedingt notwendig ist. Wenn es, wie zum Beispiel im Fall von Buchhaltung, gesetzlich vorgeschrieben ist, kann
					diese Speicherdauer auch überschritten werden.
				</p>
				<h3 className="adsimple-112890787">Widerspruchsrecht</h3>
				<p>
					Sie haben auch jederzeit das Recht und die Möglichkeit Ihre Einwilligung zur Verwendung von Cookies bzw. Drittanbietern
					zu widerrufen. Das funktioniert entweder über unser Cookie-Management-Tool oder über andere Opt-Out-Funktionen. Zum
					Beispiel können Sie auch die Datenerfassung durch Cookies verhindern, indem Sie in Ihrem Browser die Cookies verwalten,
					deaktivieren oder löschen.
				</p>
				<h3 className="adsimple-112890787">Rechtsgrundlage</h3>
				<p>
					Der Einsatz von Web-Analytics setzt Ihre Einwilligung voraus, welche wir mit unserem Cookie Popup eingeholt haben. Diese
					Einwilligung stellt laut<strong className="adsimple-112890787"> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</strong> die
					Rechtsgrundlage für die Verarbeitung personenbezogener Daten, wie sie bei der Erfassung durch Web-Analytics Tools
					vorkommen kann, dar.
				</p>
				<p>
					Zusätzlich zur Einwilligung besteht von unserer Seite ein berechtigtes Interesse daran, das Verhalten der
					Websitebesucher zu analysieren und so unser Angebot technisch und wirtschaftlich zu verbessern. Mit Hilfe von
					Web-Analytics erkennen wir Fehler der Website, können Attacken identifizieren und die Wirtschaftlichkeit verbessern. Die
					Rechtsgrundlage dafür ist{" "}
					<strong className="adsimple-112890787">Art. 6 Abs. 1 lit. f DSGVO (Berechtigte Interessen)</strong>. Wir setzen die
					Tools gleichwohl nur ein, soweit sie eine Einwilligung erteilt haben.
				</p>
				<p>
					Da bei Web-Analytics-Tools Cookies zum Einsatz kommen, empfehlen wir Ihnen auch das Lesen unserer allgemeinen
					Datenschutzerklärung zu Cookies. Um zu erfahren, welche Daten von Ihnen genau gespeichert und verarbeitet werden,
					sollten Sie die Datenschutzerklärungen der jeweiligen Tools durchlesen.
				</p>
				<p>
					Informationen zu speziellen Web-Analytics-Tools, erhalten Sie &#8211; sofern vorhanden &#8211; in den folgenden
					Abschnitten.
				</p>
				<h2 id="erklaerung-verwendeter-begriffe" className="adsimple-112890787">
					Erklärung verwendeter Begriffe
				</h2>
				<p>
					Wir sind stets bemüht unsere Datenschutzerklärung so klar und verständlich wie möglich zu verfassen. Besonders bei
					technischen und rechtlichen Themen ist das allerdings nicht immer ganz einfach. Es macht oft Sinn juristische Begriffe
					(wie z. B. personenbezogene Daten) oder bestimmte technische Ausdrücke (wie z. B. Cookies, IP-Adresse) zu verwenden. Wir
					möchte diese aber nicht ohne Erklärung verwenden. Nachfolgend finden Sie nun eine alphabetische Liste von wichtigen
					verwendeten Begriffen, auf die wir in der bisherigen Datenschutzerklärung vielleicht noch nicht ausreichend eingegangen
					sind. Falls diese Begriffe der DSGVO entnommen wurden und es sich um Begriffsbestimmungen handelt, werden wir hier auch
					die DSGVO-Texte anführen und gegebenenfalls noch eigene Erläuterungen hinzufügen.
				</p>
				<h2 id="auftragsverarbeiter" className="adsimple-112890787">
					Auftragsverarbeiter
				</h2>
				<p>
					<strong className="adsimple-112890787">Begriffsbestimmung nach Artikel 4 der DSGVO</strong>
				</p>
				<p>Im Sinne dieser Verordnung bezeichnet der Ausdruck:</p>
				<blockquote>
					<p>
						<em>
							<strong className="adsimple-112890787">„Auftragsverarbeiter“</strong> eine natürliche oder juristische Person,
							Behörde, Einrichtung oder andere Stelle, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet;
						</em>
					</p>
				</blockquote>
				<p>
					<strong className="adsimple-112890787">Erläuterung:</strong> Wir sind als Unternehmen und Websiteinhaber für alle Daten,
					die wir von Ihnen verarbeiten verantwortlich. Neben den Verantwortlichen kann es auch sogenannte Auftragsverarbeiter
					geben. Dazu zählt jedes Unternehmen bzw. jede Person, die in unserem Auftrag personenbezogene Daten verarbeitet.
					Auftragsverarbeiter können folglich, neben Dienstleistern wie Steuerberater, etwa auch Hosting- oder Cloudanbieter,
					Bezahlungs- oder Newsletter-Anbieter oder große Unternehmen wie beispielsweise Google oder Microsoft sein.
				</p>
				<h2 id="einwilligung" className="adsimple-112890787">
					Einwilligung
				</h2>
				<p>
					<strong className="adsimple-112890787">Begriffsbestimmung nach Artikel 4 der DSGVO</strong>
				</p>
				<p>Im Sinne dieser Verordnung bezeichnet der Ausdruck:</p>
				<blockquote>
					<p>
						<em>
							<strong className="adsimple-112890787">„Einwilligung“</strong> der betroffenen Person jede freiwillig für den
							bestimmten Fall, in informierter Weise und unmissverständlich abgegebene Willensbekundung in Form einer Erklärung
							oder einer sonstigen eindeutigen bestätigenden Handlung, mit der die betroffene Person zu verstehen gibt, dass sie
							mit der Verarbeitung der sie betreffenden personenbezogenen Daten einverstanden ist;
						</em>
					</p>
				</blockquote>
				<p>
					<strong className="adsimple-112890787">Erläuterung: </strong>In der Regel erfolgt bei Websites eine solche Einwilligung
					über ein Cookie-Consent-Tool. Sie kennen das bestimmt. Immer wenn Sie erstmals eine Website besuchen, werden Sie meist
					über einen Banner gefragt, ob Sie der Datenverarbeitung zustimmen bzw. einwilligen. Meist können Sie auch individuelle
					Einstellungen treffen und so selbst entscheiden, welche Datenverarbeitung Sie erlauben und welche nicht. Wenn Sie nicht
					einwilligen, dürfen auch keine personenbezogene Daten von Ihnen verarbeitet werden. Grundsätzlich kann eine Einwilligung
					natürlich auch schriftlich, also nicht über ein Tool, erfolgen.
				</p>
				<h2 id="personenbezogene-daten" className="adsimple-112890787">
					Personenbezogene Daten
				</h2>
				<p>
					<strong className="adsimple-112890787">Begriffsbestimmung nach Artikel 4 der DSGVO</strong>
				</p>
				<p>Im Sinne dieser Verordnung bezeichnet der Ausdruck:</p>
				<blockquote>
					<p>
						<strong className="adsimple-112890787">
							<em>„personenbezogene Daten“</em>
						</strong>
						<em>
							{" "}
							alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person (im Folgenden
							„betroffene Person“) beziehen; als identifizierbar wird eine natürliche Person angesehen, die direkt oder indirekt,
							insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer
							Online-Kennung oder zu einem oder mehreren besonderen Merkmalen, die Ausdruck der physischen, physiologischen,
							genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen Person sind,
							identifiziert werden kann;
						</em>
					</p>
				</blockquote>
				<p>
					<strong className="adsimple-112890787">Erläuterung:</strong> Personenbezogene Daten sind also all jene Daten, die Sie
					als Person identifizieren können. Das sind in der Regel Daten wie etwa:
				</p>
				<ul className="adsimple-112890787">
					<li className="adsimple-112890787">Name</li>
					<li className="adsimple-112890787">Adresse</li>
					<li className="adsimple-112890787">E-Mail-Adresse</li>
					<li className="adsimple-112890787">Post-Anschrift</li>
					<li className="adsimple-112890787">Telefonnummer</li>
					<li className="adsimple-112890787">Geburtsdatum</li>
					<li className="adsimple-112890787">
						Kennnummern wie Sozialversicherungsnummer, Steueridentifikationsnummer, Personalausweisnummer oder Matrikelnummer
					</li>
					<li className="adsimple-112890787">Bankdaten wie Kontonummer, Kreditinformationen, Kontostände uvm.</li>
				</ul>
				<p>
					Laut Europäischem Gerichtshof (EuGH) zählt auch Ihre{" "}
					<strong className="adsimple-112890787">IP-Adresse zu den personenbezogenen Daten</strong>. IT-Experten können anhand
					Ihrer IP-Adresse zumindest den ungefähren Standort Ihres Geräts und in weiterer Folge Sie als Anschlussinhabers
					feststellen. Daher benötigt auch das Speichern einer IP-Adresse eine Rechtsgrundlage im Sinne der DSGVO. Es gibt auch
					noch sogenannte <strong className="adsimple-112890787">„besondere Kategorien“</strong> der personenbezogenen Daten, die
					auch besonders schützenswert sind. Dazu zählen:
				</p>
				<ul className="adsimple-112890787">
					<li className="adsimple-112890787">rassische und ethnische Herkunft</li>
					<li className="adsimple-112890787">politische Meinungen</li>
					<li className="adsimple-112890787">religiöse bzw. weltanschauliche Überzeugungen</li>
					<li className="adsimple-112890787">die Gewerkschaftszugehörigkeit</li>
					<li className="adsimple-112890787">
						genetische Daten wie beispielsweise Daten, die aus Blut- oder Speichelproben entnommen werden
					</li>
					<li className="adsimple-112890787">
						biometrische Daten (das sind Informationen zu psychischen, körperlichen oder verhaltenstypischen Merkmalen, die eine
						Person identifizieren können).
						<br />
						Gesundheitsdaten
					</li>
					<li className="adsimple-112890787">Daten zur sexuellen Orientierung oder zum Sexualleben</li>
				</ul>
				<h2 id="profiling" className="adsimple-112890787">
					Profiling
				</h2>
				<p>
					<strong className="adsimple-112890787">Begriffsbestimmung nach Artikel 4 der DSGVO</strong>
				</p>
				<p>Im Sinne dieser Verordnung bezeichnet der Ausdruck:</p>
				<blockquote>
					<p>
						<em>
							<strong className="adsimple-112890787">„Profiling“</strong> jede Art der automatisierten Verarbeitung
							personenbezogener Daten, die darin besteht, dass diese personenbezogenen Daten verwendet werden, um bestimmte
							persönliche Aspekte, die sich auf eine natürliche Person beziehen, zu bewerten, insbesondere um Aspekte bezüglich
							Arbeitsleistung, wirtschaftliche Lage, Gesundheit, persönliche Vorlieben, Interessen, Zuverlässigkeit, Verhalten,
							Aufenthaltsort oder Ortswechsel dieser natürlichen Person zu analysieren oder vorherzusagen;
						</em>
					</p>
				</blockquote>
				<p>
					<strong className="adsimple-112890787">Erläuterung:</strong> Beim Profiling werden verschiedene Informationen über eine
					Person zusammengetragen, um daraus mehr über diese Person zu erfahren. Im Webbereich wird Profiling häufig für
					Werbezwecke oder auch für Bonitätsprüfungen angewandt. Web- bzw. Werbeanalyseprogramme sammeln zum Beispiel Daten über
					Ihre Verhalten und Ihre Interessen auf einer Website. Daraus ergibt sich ein spezielles Userprofil, mit dessen Hilfe
					Werbung gezielt an eine Zielgruppe ausgespielt werden kann.
				</p>
				<p>&nbsp;</p>
				<h2 id="verantwortlicher" className="adsimple-112890787">
					Verantwortlicher
				</h2>
				<p>
					<strong className="adsimple-112890787">Begriffsbestimmung nach Artikel 4 der DSGVO</strong>
				</p>
				<p>Im Sinne dieser Verordnung bezeichnet der Ausdruck:</p>
				<blockquote>
					<p>
						<em>
							<strong className="adsimple-112890787">„Verantwortlicher“</strong> die natürliche oder juristische Person, Behörde,
							Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung
							von personenbezogenen Daten entscheidet; sind die Zwecke und Mittel dieser Verarbeitung durch das Unionsrecht oder
							das Recht der Mitgliedstaaten vorgegeben, so kann der Verantwortliche beziehungsweise können die bestimmten
							Kriterien seiner Benennung nach dem Unionsrecht oder dem Recht der Mitgliedstaaten vorgesehen werden;
						</em>
					</p>
				</blockquote>
				<p>
					<strong className="adsimple-112890787">Erläuterung:</strong> In unserem Fall sind wir für die Verarbeitung Ihrer
					personenbezogenen Daten verantwortlich und folglich der &#8220;Verantwortliche&#8221;. Wenn wir erhobene Daten zur
					Verarbeitung an andere Dienstleister weitergeben, sind diese &#8220;Auftragsverarbeiter&#8221;. Dafür muss ein
					&#8220;Auftragsverarbeitungsvertrag (AVV)&#8221; unterzeichnet werden.
				</p>
				<p>&nbsp;</p>
				<h2 id="verarbeitung" className="adsimple-112890787">
					Verarbeitung
				</h2>
				<p>
					<strong className="adsimple-112890787">Begriffsbestimmung nach Artikel 4 der DSGVO</strong>
				</p>
				<p>Im Sinne dieser Verordnung bezeichnet der Ausdruck:</p>
				<blockquote>
					<p>
						<strong className="adsimple-112890787">
							<em>„Verarbeitung“</em>
						</strong>
						<em>
							{" "}
							jeden mit oder ohne Hilfe automatisierter Verfahren ausgeführten Vorgang oder jede solche Vorgangsreihe im
							Zusammenhang mit personenbezogenen Daten wie das Erheben, das Erfassen, die Organisation, das Ordnen, die
							Speicherung, die Anpassung oder Veränderung, das Auslesen, das Abfragen, die Verwendung, die Offenlegung durch
							Übermittlung, Verbreitung oder eine andere Form der Bereitstellung, den Abgleich oder die Verknüpfung, die
							Einschränkung, das Löschen oder die Vernichtung;
						</em>
					</p>
				</blockquote>
				<p>
					<strong className="adsimple-112890787">Anmerkung: </strong>Wenn wir in unserer Datenschutzerklärung von Verarbeitung
					sprechen, meinen wir damit jegliche Art von Datenverarbeitung. Dazu zählt, wie oben in der originalen DSGVO-Erklärung
					erwähnt, nicht nur das Erheben sondern auch das Speichern und Verarbeiten von Daten.
				</p>
				<p>Alle Texte sind urheberrechtlich geschützt.</p>
				<p className="mt-4">
					Quelle: Erstellt mit dem{" "}
					<a href="https://www.adsimple.at/datenschutz-generator/" title="Datenschutz Generator Österreich von AdSimple">
						Datenschutz Generator
					</a>{" "}
					von AdSimple
				</p>
			</div>
		</main>
	);
};

export default ImprintPage;
