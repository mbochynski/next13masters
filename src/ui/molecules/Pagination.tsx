import { ActiveLink } from "../atoms/ActiveLink";

type PaginationType = {
	start: number;
	range: number;
	className?: string;
};

export const Pagination = ({ start, range, className }: PaginationType) => {
	const linkClassName = "p-2";
	const activeClassName = "underline";

	const links = [];
	for (let i = start; i < start + range; ++i) {
		links.push(
			<ActiveLink
				exact
				className={linkClassName}
				activeClassName={activeClassName}
				href={`/products/${i}`}
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
