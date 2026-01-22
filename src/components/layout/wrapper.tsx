import cn from "clsx";
import type { LenisOptions } from "lenis";
import type { ComponentProps, FC } from "react";
import Noise from "../gl/noise";
import { Lenis } from "./lenis";
import { Navigation } from "./navigation";
import { WrapperClient } from "./wrapper.client";

interface IWrapperProps extends ComponentProps<"div"> {
	lenis?: {
		options?: LenisOptions;
	};
}

export const Wrapper: FC<IWrapperProps> = ({ lenis, children, className, ...props }) => {
	return (
		<>
			<div className="revealer | pointer-events-none fixed inset-0 z-60 min-h-svh origin-top bg-foreground" />
			<div className="pointer-events-none fixed inset-0 z-50 flex flex-col justify-between">
				{Array.from({ length: 200 }).map((_, index) => (
					<div key={`tv_line-${index + 1}`} className="h-px w-full bg-foreground/10" />
				))}
				<Noise patternAlpha={25} />
			</div>

			<Navigation />

			<main className={cn("relative", className)} {...props}>
				{children}
			</main>

			<WrapperClient />
			<Lenis root options={lenis?.options} />
		</>
	);
};
