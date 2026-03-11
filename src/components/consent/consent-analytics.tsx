"use client";

import { useConsentManager } from "@c15t/react";
import { Analytics } from "@vercel/analytics/next";
import type { FC } from "react";

export const ConsentAnalytics: FC = () => {
	const { has } = useConsentManager();
	const hasMarketing = has("marketing");

	if (!hasMarketing) return null;

	return <Analytics />;
};
