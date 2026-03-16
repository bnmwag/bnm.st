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
					<feTurbulence
						type="fractalNoise"
						baseFrequency={baseFrequency}
						numOctaves={4}
						stitchTiles="stitch"
						result="noise"
						seed="0"
					>
						<animate
							attributeName="seed"
							from="0"
							to="100"
							dur="0.5s"
							repeatCount="indefinite"
							calcMode="discrete"
							values="0;10;20;30;40;50;60;70;80;90;100"
							keyTimes="0;0.1;0.2;0.3;0.4;0.5;0.6;0.7;0.8;0.9;1"
						/>
					</feTurbulence>
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
