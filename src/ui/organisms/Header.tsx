import Link from "next/link";
import { cookies } from "next/headers";
import { ActiveLink } from "../atoms/ActiveLink";
import { SearchBox } from "../molecules/SearchBox";
import { CartGetByIdDocument, type CategoriesGetListQuery } from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";

type HeaderProps = {
	categories: CategoriesGetListQuery["categories"];
};
export const Header = async ({ categories }: HeaderProps) => {
	const cartId = cookies().get("cartId")?.value;
	const cart = cartId
		? await executeGraphql({
				query: CartGetByIdDocument,
				variables: {
					id: cartId,
				},
				next: {
					tags: ["cart"],
				},
		  })
		: null;

	const count = cart?.order?.orderItems.length || 0;

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

			<Link href={"/cart"}>Cart {count} . </Link>
		</div>
	);
};
