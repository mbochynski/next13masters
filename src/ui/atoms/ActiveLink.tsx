"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { type Route } from "next";

export const ActiveLink = ({
	href,
	className,
	activeClassName,
	children,
	exact,
}: {
	href: Route;
	className: string;
	activeClassName: string;
	children: React.ReactNode;
	exact?: boolean;
}) => {
	const pathname = usePathname();
	const isExact = href === pathname;
	const isPartialMatch = pathname.includes(href);
	const isActive = exact ? isExact : isPartialMatch;

	return (
		<Link className={clsx(className, isActive && activeClassName)} href={href}>
			{children}
		</Link>
	);
};
