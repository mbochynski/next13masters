import { ProductListItem } from "../molecules/ProductListItem";
import { type Product } from "@/types/Product";

type ProductListType = {
	products: Product[];
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
