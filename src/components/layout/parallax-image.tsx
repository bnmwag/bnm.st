"use client";

import type { Media as MediaType } from "@/payload-types";
import cn from "clsx";
import { useLenis } from "lenis/react";
import { type FC, useRef } from "react";
import { Media } from "./render-media";

interface IParallaxImageProps extends React.HTMLAttributes<HTMLImageElement> {
	media: MediaType | string | null | undefined;
	sectionIndex?: number;
}

export const ParallaxImage: FC<IParallaxImageProps> = ({ className, media, sectionIndex, ...props }) => {
	const imageRef = useRef<HTMLImageElement>(null);

	// Scroll handler with Lenis - apply parallax directly without lerp for instant sync
	useLenis(() => {
		if (!imageRef.current) return;

		// Get the element's current position relative to viewport
		const rect = imageRef.current.getBoundingClientRect();
		const viewportHeight = window.innerHeight;

		// Calculate how far the element has scrolled through the viewport
		// When element top is at bottom of viewport: progress = 0
		// When element bottom is at top of viewport: progress = 1
		const elementHeight = rect.height;
		const scrollProgress = (viewportHeight - rect.top) / (viewportHeight + elementHeight);

		// Convert progress to parallax offset
		// Clamp progress between 0 and 1 to ensure consistent behavior at boundaries
		const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

		// This is viewport-relative, so it works regardless of absolute scroll position
		const parallaxIntensity = 0.4; // 40% movement - strong but stable
		const parallaxRange = elementHeight * parallaxIntensity;
		const translateY = (clampedProgress - 0.5) * parallaxRange;

		// Scale needs to be 1 + (parallaxIntensity) to cover the movement
		const scale = 1 + parallaxIntensity;

		// Apply transform directly - no lerp, instant sync
		imageRef.current.style.transform = `translateY(${translateY}px) scale(${scale})`;
	});

	return (
		<Media
			resource={media}
			imgClassName="absolute h-full w-full object-cover"
			ref={imageRef}
			{...(props as any)} // Type assertion to bypass incompatibility
			className={cn("absolute h-full w-full", className)}
			style={{
				willChange: "transform",
				transform: "translateY(0) scale(1.25)",
			}}
		/>
	);
};
