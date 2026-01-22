"use client";

import { useTransitionNavigation } from "@/lib/transitions";
import cn from "clsx";
import NextLink, { type LinkProps } from "next/link";
import type { FC } from "react";

interface ILinkProps extends LinkProps {
	className?: string;
	children: React.ReactNode;
}

export const Link: FC<ILinkProps> = ({ className, ...props }) => {
	const router = useTransitionNavigation();

	const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		router.push(props.href as string);
	};

	return <NextLink className={cn("", className)} onClick={onClick} {...props} />;
};
