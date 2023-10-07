import { ActiveLink } from "../atoms/ActiveLink";
import { SearchBox } from "../molecules/SearchBox";
import { type CategoriesGetListQuery } from "@/gql/graphql";

type HeaderProps = {
	categories: CategoriesGetListQuery["categories"];
};
export const Header = ({ categories }: HeaderProps) => {
	const linkClassName = "px-2 pb-1 pt-2 text-lg text-blue-600";
	const activeLinkClassName = "border-b-2 border-blue-500";

	return (
		<div className="flex content-center justify-around py-4">
			<nav className="flex justify-center ">
				<ActiveLink href="/" exact className={linkClassName} activeClassName={activeLinkClassName}>
					Home
				</ActiveLink>
				<ActiveLink
					href="/products"
					className={linkClassName}
					activeClassName={activeLinkClassName}
				>
					All
				</ActiveLink>
				{categories.map((category) => {
					return (
						<ActiveLink
							key={category.slug}
							href={`/categories/${category.slug}`}
							className={linkClassName}
							activeClassName={activeLinkClassName}
						>
							{category.name}
						</ActiveLink>
					);
				})}
			</nav>

			<SearchBox />
		</div>
	);
};
