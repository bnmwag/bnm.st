"use client";

import type { FC } from "react";

import { Canvas } from "@react-three/fiber";

import { ShaderPlane } from "@/components/gl";

export const Scene: FC = () => {
	return (
		<div className="!fixed !inset-0 -z-10">
			<Canvas
				orthographic
				dpr={[1, 2]}
				camera={{
					position: [0, 0, 1],
					zoom: 1,
					near: 0.1,
					far: 1000,
				}}
			>
				<ShaderPlane />
			</Canvas>
		</div>
	);
};
