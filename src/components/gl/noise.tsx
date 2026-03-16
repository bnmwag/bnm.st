import cn from "clsx";
import type { ComponentProps, FC } from "react";

interface INoiseProps extends ComponentProps<"div"> {
	patternAlpha?: number;
	baseFrequency?: number;
}

const Noise: FC<INoiseProps> = ({ patternAlpha = 15, baseFrequency = 0.7, className, ...props }) => {
	const opacity = patternAlpha / 255;

	return (
		<div className={cn("pointer-events-none absolute inset-0", className)} {...props}>
			<svg className="absolute h-0 w-0" aria-hidden="true">
				<filter id="grain-filter" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
					<feTurbulence type="fractalNoise" baseFrequency={baseFrequency} numOctaves={4} stitchTiles="stitch" />
					<feColorMatrix type="saturate" values="0" />
				</filter>
			</svg>
			<div
				className="absolute inset-0 h-full w-full"
				style={{
					filter: "url(#grain-filter)",
					opacity,
				}}
			/>
		</div>
	);
};

export default Noise;
