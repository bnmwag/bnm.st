"use client";

import { useRevealer } from "@/hooks/use-revealer";
import { useRouter } from "next/navigation";
import { type FC, useEffect } from "react";

export const WrapperClient: FC = () => {
	const router = useRouter();
	useRevealer();

	useEffect(() => {
		const onShow = () => {
			router.refresh();
		};
		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState === "visible") onShow();
		});
		window.addEventListener("pageshow", onShow);
		return () => {
			window.removeEventListener("pageshow", onShow);
		};
	}, [router]);

	return <></>;
};
