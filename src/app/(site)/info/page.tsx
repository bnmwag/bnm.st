import { Human } from "@/components/gl/human";
import { Wrapper } from "@/components/layout/wrapper";
import type { NextPage } from "next";

const InfoPage: NextPage = () => {
	const age = Math.floor((Date.now() - new Date("2005-06-28").getTime()) / (1000 * 60 * 60 * 24 * 365.25));
	const since = Math.floor((Date.now() - new Date("2021-06-01").getTime()) / (1000 * 60 * 60 * 24 * 365.25));

	return (
		<Wrapper>
			<section className={"h-svh"}>
				<div className="layout-grid h-full py-4">
					<div className="col-span-8 self-end">
						<h1 className="text-[clamp(2em,12vw,12em)] uppercase leading-[.8] tracking-[-.04em]">
							Benjamin
							<br />
							<span className="ml-[12vw] leading-[.8]">Wagner</span>
						</h1>
					</div>
					<div className="col-span-3 col-start-10 aspect-3/4 self-end bg-foreground">
						<Human />
					</div>
				</div>
			</section>
			<section className="bg-foreground text-background mt-52">
				<div className="layout-grid py-52">
					<p className="col-span-full indent-[25%] text-[clamp(2em,3.8vw,5em)] uppercase leading-[.9] tracking-[-.04em]">
						I'm a {age} year old frontend dev from Linz, Austria. I've been working as a freelancer and in agencies for the last{" "}
						{since} years.
					</p>
				</div>
			</section>
		</Wrapper>
	);
};

export default InfoPage;
