import { Human } from "@/components/gl/human";
import { Wrapper } from "@/components/layout/wrapper";
import type { NextPage } from "next";

const InfoPage: NextPage = () => {
	const age = Math.floor((Date.now() - new Date("2005-06-28").getTime()) / (1000 * 60 * 60 * 24 * 365.25));
	const since = Math.floor((Date.now() - new Date("2021-06-01").getTime()) / (1000 * 60 * 60 * 24 * 365.25));

	return (
		<Wrapper>
			<section className="flex h-svh items-end">
				<div className="layout-grid relative w-full py-4">
					<div className="col-span-3 col-start-1">
						<p className="text-balance text-caption">
							Working professionally for over {since} years — across freelance projects and agency environments — building
							design-driven websites and interactive products worldwide.
						</p>
					</div>
					<div className="col-span-3 col-start-5 self-center">
						<p className="text-balance text-caption">
							I believe digital experiences should feel less like interfaces and more like places — spaces where clarity, emotion,
							and intention quietly work together. Thoughtful design has the power to slow people down, invite curiosity, and
							create moments that feel genuinely considered.
						</p>
					</div>
					<div className="col-span-3 col-start-10 aspect-3/4 self-center bg-foreground">
						<Human />
					</div>
				</div>
			</section>
			<section className="py-32">
				<div className="layout-grid relative py-4">
					<div className="col-span-4 col-start-5 space-y-6">
						<p className="text-balance text-caption">
							I design and build digital products from concept to launch — shaping visual systems, interactions, and code as a
							single, coherent whole. My focus lies on websites and interfaces where aesthetics and performance are equally
							non-negotiable.
						</p>

						<p className="text-balance text-caption text-foreground/60">
							Services include art direction, interface and motion design, creative development, and advanced frontend engineering
							— from lightweight marketing sites to highly interactive, animation-driven experiences.
						</p>
					</div>
				</div>
			</section>
		</Wrapper>
	);
};

export default InfoPage;
