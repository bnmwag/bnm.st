"use client";

import { useConsentManager } from "@c15t/react";
import { Analytics } from "@vercel/analytics/next";
import { type FC, useEffect, useState } from "react";

export const ConsentAnalytics: FC = () => {
	const { has } = useConsentManager();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted || !has("marketing")) return null;

	return <Analytics />;
};
