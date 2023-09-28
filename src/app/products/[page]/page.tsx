import { ProductList } from "@/ui/organisms/ProductList";
import { Pagination } from "@/ui/molecules/Pagination";
import { executeGraphql } from "@/api/graphqlApi";
import { ProductsGetListDocument } from "@/gql/graphql";
import { PAGE_SIZE, calculatePages, getOffsetByPageNumber } from "@/ui/utils/calculatePages";

type ProductsPageProps = {
	params: {
		page: string;
	};
};

export async function generateStaticParams() {
	const { productsConnection } = await executeGraphql(ProductsGetListDocument, {
		count: 0,
	});

	const productLength = productsConnection.aggregate.count;
	const pageCount = calculatePages(productLength);

	return new Array(pageCount).fill(undefined).map((_, i) => {
		return { page: String(i + 1) };
	});
}

export default async function ProductsPage({ params: { page } }: ProductsPageProps) {
	const currentPage = Number(page);

	const { products, productsConnection } = await executeGraphql(ProductsGetListDocument, {
		count: PAGE_SIZE,
		offset: getOffsetByPageNumber(currentPage),
	});

	const numberOfPages = calculatePages(productsConnection.aggregate.count);

	return (
		<>
			<ProductList products={products} />

			<Pagination
				className="p-8"
				range={numberOfPages}
				hrefFactory={(pageIndex) => `/products/${pageIndex}`}
			/>
		</>
	);
}
