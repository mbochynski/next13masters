import { type Route } from "next";
import { ActiveLink } from "../atoms/ActiveLink";

type PaginationType<T extends string> = {
	range: number;
	hrefFactory: (page: number) => Route<T>;
	className?: string;
};

export const Pagination = <T extends string>({
	range,
	className,
	hrefFactory,
}: PaginationType<T>) => {
	const linkClassName = "p-2";
	const activeClassName = "underline";

	const links = [];
	for (let i = 1; i < range + 1; ++i) {
		links.push(
			<ActiveLink
				key={`page-${i}`}
				exact
				className={linkClassName}
				activeClassName={activeClassName}
				href={hrefFactory(i)}
			>
				{i}
			</ActiveLink>,
		);
	}

	return (
		<div className={className} aria-label="pagination">
			{links}
		</div>
	);
};
