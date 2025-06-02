"use client";

import type { FC } from "react";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

import { fragmentShader } from "@/shaders/fragment.shader";
import { vertexShader } from "@/shaders/vertex.shader";

export const ShaderPlane: FC = () => {
	const meshRef = useRef<THREE.Mesh>(null);
	const { size, gl } = useThree();
	const mouse = useRef(new THREE.Vector2());
	const mouseDamp = useRef(new THREE.Vector2());
	const resolution = useMemo(() => new THREE.Vector2(size.width, size.height), [size]);
	const pixelRatio = Math.min(window.devicePixelRatio, 2);

	const materialRef = useRef<THREE.ShaderMaterial>(null);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			mouse.current.set(e.clientX, e.clientY);
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("pointermove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("pointermove", handleMouseMove);
		};
	}, []);

	useEffect(() => {
		resolution.set(size.width, size.height).multiplyScalar(pixelRatio);

		if (meshRef.current) {
			meshRef.current.scale.set(size.width, size.height, 1);
		}

		if (materialRef.current) {
			materialRef.current.uniforms.u_pixelRatio.value = pixelRatio;
			materialRef.current.uniforms.u_resolution.value = resolution;
		}
	}, [size, pixelRatio, resolution]);

	useFrame((_, delta) => {
		mouseDamp.current.lerp(mouse.current, 1 - Math.exp(-8 * delta));

		if (materialRef.current) {
			materialRef.current.uniforms.u_mouse.value = mouseDamp.current;
		}
	});

	const shaderMaterial = useMemo(
		() =>
			new THREE.ShaderMaterial({
				vertexShader,
				fragmentShader,
				uniforms: {
					u_mouse: { value: mouseDamp.current },
					u_resolution: { value: resolution },
					u_pixelRatio: { value: pixelRatio },
				},
				transparent: true,
			}),
		[resolution, pixelRatio],
	);

	return (
		<mesh ref={meshRef}>
			<planeGeometry args={[1, 1]} />
			<primitive object={shaderMaterial} attach="material" ref={materialRef} />
		</mesh>
	);
};
