"use client";
import Link, { type LinkProps } from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { type RouteType } from "next/dist/lib/load-custom-routes";

export const ActiveLink = ({
	href,
	className,
	activeClassName,
	children,
}: {
	href: LinkProps<RouteType>["href"];
	className: string;
	activeClassName: string;
	children: React.ReactNode;
}) => {
	const pathname = usePathname();
	const isActive = href === pathname;

	return (
		<Link className={clsx(className, isActive && activeClassName)} href={href}>
			{children}
		</Link>
	);
};
