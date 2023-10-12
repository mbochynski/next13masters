import { executeGraphql } from "@/api/graphqlApi";
import { ProductsGetListByCategorySlugDocument, type ProductListItemFragment } from "@/gql/graphql";
import { ProductList } from "@/ui/organisms/ProductList";

type RelatedProductsProps = {
	product: ProductListItemFragment;
};

export async function RelatedProducts({ product }: RelatedProductsProps) {
	const { products: relatedProducts } = await executeGraphql({
		query: ProductsGetListByCategorySlugDocument,
		variables: {
			count: 4,
			categorySlug: product.categories[0].slug,
		},
	});

	return (
		<div data-testid="related-products">
			<h2 className="text-xl">Related products</h2>
			<ProductList products={relatedProducts} />
		</div>
	);
}
