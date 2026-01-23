"use client";

import { Environment, OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

import { type FC, useEffect, useRef } from "react";
import type * as THREE from "three";

type ActionName = "walking" | "idle-1";

export const Human: FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div ref={containerRef} className="relative h-full w-full">
			<Canvas
				className="h-full w-full"
				camera={{
					position: [240, 0.25, 240],
					fov: 35,
				}}
			>
				<Environment preset="studio" />
				<group position={[0, -80, 0]}>
					<Model />
				</group>
				<OrbitControls makeDefault enablePan={false} enableZoom={false} />
			</Canvas>
		</div>
	);
};

const Model: FC = () => {
	const group = useRef<THREE.Group>(null);
	const rotationGroup = useRef<THREE.Group>(null);

	// biome-ignore lint/suspicious/noExplicitAny: GLTF types are not yet correct
	const { nodes, materials, animations } = useGLTF("/models/human.glb") as any;
	const { actions } = useAnimations(animations, group);

	useEffect(() => {
		actions.walking?.play();
	}, [actions]);

	useFrame((state) => {
		rotationGroup.current!.rotation.y = state.clock.elapsedTime * 0.5;
	});

	return (
		<group ref={group} dispose={null}>
			<group name="AuxScene" ref={rotationGroup}>
				<group scale={0.01}>
					<skinnedMesh
						name="fred_lowpoly"
						geometry={nodes.fred_lowpoly.geometry}
						material={materials["Material_0.003"]}
						skeleton={nodes.fred_lowpoly.skeleton}
						position={[0, 0, 0]}
						rotation={[-Math.PI / 2, -0.35, 1.545]}
						castShadow
					/>
				</group>
				<primitive object={nodes.mixamorigHips} castShadow />
			</group>
		</group>
	);
};

useGLTF.preload("/models/human.glb");
