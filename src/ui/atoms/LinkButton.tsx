import { type Route } from "next";
import clsx from "clsx";
import Link from "next/link";

type LinkButtonProps = {
	className?: string;
	href: Route;
	children: React.ReactNode;
};

export const LinkButton = ({ href, children, className }: LinkButtonProps) => {
	return (
		<Link
			className={clsx(
				"inline-block rounded-md border-2 border-blue-600 px-6 py-2 text-xs font-medium uppercase leading-tight text-blue-600 transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0",
				className,
			)}
			href={href}
		>
			{children}
		</Link>
	);
};
