import { Human } from "@/components/gl/human";
import { Wrapper } from "@/components/layout/wrapper";
import type { NextPage } from "next";

const InfoPage: NextPage = () => {
	const age = Math.floor((Date.now() - new Date("2005-06-28").getTime()) / (1000 * 60 * 60 * 24 * 365.25));
	const since = Math.floor((Date.now() - new Date("2021-06-01").getTime()) / (1000 * 60 * 60 * 24 * 365.25));

	return (
		<Wrapper>
			<section className="h-svh">
				<div className="layout-grid relative h-full py-4 pt-48">
					{/* Philosophy */}
					<div className="col-span-4 col-start-6 mt-32">
						<p className="text-caption max-w-md">
							My work lives at the intersection of clean code, strong visual identity, and thoughtful motion. Animations aren’t
							decoration — they’re communication.
						</p>
					</div>

					{/* Experience */}
					<div className="col-span-4 col-start-2 self-end mb-24">
						<p className="text-caption max-w-md">
							Working professionally for over {since} years — across freelance projects and agency environments — building
							design-driven websites and interactive products worldwide.
						</p>
					</div>

					{/* Craft / Skill */}
					<div className="col-span-3 col-start-7 self-end mb-12">
						<p className="text-caption max-w-sm">
							Comfortable translating complex Figma designs into scalable, performant, and accessible frontend systems — from
							single-page sites to larger platforms.
						</p>
					</div>

					{/* Visual Counterweight */}
					<div className="col-span-3 col-start-10 aspect-3/4 self-end bg-foreground/90">
						<Human />
					</div>
				</div>
			</section>
		</Wrapper>
	);
};

export default InfoPage;
