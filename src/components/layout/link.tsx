"use client";

import { useTransitionNavigation } from "@/lib/transitions";
import cn from "clsx";
import NextLink, { type LinkProps } from "next/link";
import type { FC } from "react";

interface ILinkProps extends LinkProps {
	className?: string;
	children: React.ReactNode;
	withTransition?: boolean;
	"aria-label"?: string;
	target?: string;
	rel?: string;
}

export const Link: FC<ILinkProps> = ({ className, withTransition = true, target, rel, ...props }) => {
	const router = useTransitionNavigation();

	const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		// Allow default behavior for external links or when meta/ctrl key is pressed
		if (target === "_blank" || e.metaKey || e.ctrlKey) {
			return;
		}

		e.preventDefault();
		router.push(props.href as string, { withTransition });
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
		// Ensure Enter key works properly
		if (e.key === "Enter" && !e.metaKey && !e.ctrlKey && target !== "_blank") {
			e.preventDefault();
			router.push(props.href as string, { withTransition });
		}
	};

	return <NextLink className={cn("", className)} onClick={onClick} onKeyDown={onKeyDown} target={target} rel={rel} {...props} />;
};
