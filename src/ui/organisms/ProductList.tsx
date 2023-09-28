import { ProductListItem } from "../molecules/ProductListItem";
import { type ProductListItemFragment } from "@/gql/graphql";

type ProductListType = {
	products: ProductListItemFragment[];
};

export const ProductList: React.FC<ProductListType> = async ({ products }) => {
	return (
		<section>
			<ul
				data-testid="products-list"
				className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
			>
				{products.map((product) => {
					return <ProductListItem key={product.id} product={product} />;
				})}
			</ul>
		</section>
	);
};
