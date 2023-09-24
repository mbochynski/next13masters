"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { type Route } from "next";

export const ActiveLink = <T extends string>({
	href,
	className,
	activeClassName,
	children,
	exact,
}: {
	href: Route<T>;
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
		<Link
			className={clsx(className, isActive && activeClassName)}
			href={href}
			{...(isActive && { "aria-current": "page" })}
		>
			{children}
		</Link>
	);
};
