"use client";

import dynamic from "next/dynamic";
import { type FC, useEffect, useState } from "react";

const Analytics = dynamic(() => import("@vercel/analytics/react").then((m) => m.Analytics), { ssr: false });

export const Dev: FC = () => {
	const [showGrid, setShowGrid] = useState(false);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key.toLowerCase() === "g" && e.shiftKey) {
				e.preventDefault();
				setShowGrid((prev) => !prev);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<>
			{showGrid && (
				<div className="layout-grid pointer-events-none fixed inset-0 z-50">
					{Array.from({ length: 12 }).map((_, index) => (
						<div key={`content_grid-col-${index + 1}`} className="h-full bg-rose-500/20" />
					))}
				</div>
			)}
			<Analytics />
		</>
	);
};
