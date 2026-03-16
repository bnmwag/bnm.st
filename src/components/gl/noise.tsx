"use client";

import type React from "react";
import { useEffect, useRef } from "react";

interface NoiseProps {
	patternSize?: number;
	patternScaleX?: number;
	patternScaleY?: number;
	patternRefreshInterval?: number;
	patternAlpha?: number;
}

const Noise: React.FC<NoiseProps> = ({
	patternSize = 250,
	patternScaleX = 1,
	patternScaleY = 1,
	patternRefreshInterval = 2,
	patternAlpha = 15,
}) => {
	const grainRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = grainRef.current;
		if (!canvas) return;

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const ctx = canvas.getContext("2d", { alpha: true });
		if (!ctx) return;

		let frame = 0;
		let animationId: number;
		let isVisible = true;

		const canvasSize = 256;

		const resize = () => {
			if (!canvas) return;
			canvas.width = canvasSize;
			canvas.height = canvasSize;

			canvas.style.width = "100%";
			canvas.style.height = "100%";
		};

		const imageData = ctx.createImageData(canvasSize, canvasSize);

		const drawGrain = () => {
			const data = imageData.data;

			for (let i = 0; i < data.length; i += 4) {
				const value = (Math.random() * 255) | 0;
				data[i] = value;
				data[i + 1] = value;
				data[i + 2] = value;
				data[i + 3] = patternAlpha;
			}

			ctx.putImageData(imageData, 0, 0);
		};

		const loop = () => {
			if (isVisible && frame % patternRefreshInterval === 0) {
				drawGrain();
			}
			frame++;
			animationId = window.requestAnimationFrame(loop);
		};

		const handleVisibility = () => {
			isVisible = document.visibilityState === "visible";
		};

		document.addEventListener("visibilitychange", handleVisibility);
		window.addEventListener("resize", resize);
		resize();
		loop();

		return () => {
			document.removeEventListener("visibilitychange", handleVisibility);
			window.removeEventListener("resize", resize);
			window.cancelAnimationFrame(animationId);
		};
	}, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);

	return (
		<canvas
			className="pointer-events-none absolute top-0 left-0 h-full w-full"
			ref={grainRef}
			style={{
				imageRendering: "pixelated",
			}}
		/>
	);
};

export default Noise;
