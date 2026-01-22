"use client";

import { Center, Environment, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

import { type FC, useEffect, useRef, useState } from "react";
import type * as THREE from "three";

type ActionName = "walking" | "idle-1";

export const Human: FC = () => {
	const [action, setAction] = useState<ActionName>("idle-1");

	return (
		<div className="relative h-full w-full">
			<button
				type="button"
				onClick={() => setAction((prev) => (prev === "idle-1" ? "walking" : "idle-1"))}
				className="absolute top-2 left-2 z-10 bg-background px-2 py-0.5 text-left font-medium text-[clamp(.625rem,.5vw,.75rem)] text-foreground uppercase leading-none"
			>
				{action === "idle-1" ? "Start walking" : "Stop walking"}
			</button>
			<Canvas
				className="h-full w-full"
				camera={{
					position: [2.5, 0.25, 2.5],
					fov: 35,
				}}
			>
				<Environment preset="studio" />
				<Center disableX>
					<Model action={action} />
				</Center>
			</Canvas>
		</div>
	);
};

const Model: FC<{ action: ActionName }> = ({ action }) => {
	const group = useRef<THREE.Group>(null);
	const previousAction = useRef<ActionName | null>(null);

	// biome-ignore lint/suspicious/noExplicitAny: GLTF types are not yet correct
	const { nodes, materials, animations } = useGLTF("/human.glb") as any;
	const { actions } = useAnimations(animations, group);

	useEffect(() => {
		if (!actions || !action) return;

		const next = actions[action];
		const prev = previousAction.current ? actions[previousAction.current] : null;

		if (!next) return;

		// prepare next animation
		next.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).play();

		// crossfade from previous animation
		if (prev && prev !== next) {
			next.crossFadeFrom(prev, 0.35, false);
		}

		previousAction.current = action;

		return () => {
			next.fadeOut(0.2);
		};
	}, [action, actions]);

	useFrame((state) => {
		if (group.current) {
			group.current.rotation.y = state.clock.elapsedTime * 0.5;
		}
	});

	return (
		<group ref={group} dispose={null}>
			<group name="AuxScene">
				<group scale={0.01}>
					<skinnedMesh
						name="fred_lowpoly"
						geometry={nodes.fred_lowpoly.geometry}
						material={materials["Material_0.003"]}
						skeleton={nodes.fred_lowpoly.skeleton}
						position={[0, 112.592, 0]}
						rotation={[-Math.PI / 2, -0.35, 1.545]}
						scale={100}
						castShadow
					/>
					<primitive object={nodes.mixamorigHips} castShadow />
				</group>
			</group>
		</group>
	);
};

useGLTF.preload("/human.glb");
