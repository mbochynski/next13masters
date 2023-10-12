import { SortSelect } from "./SortSelect";
import { ProductList } from "@/ui/organisms/ProductList";
import { Pagination } from "@/ui/molecules/Pagination";
import { executeGraphql } from "@/api/graphqlApi";
import { ProductsGetListDocument, type ProductOrderByInput } from "@/gql/graphql";
import { PAGE_SIZE, calculatePages, getOffsetByPageNumber } from "@/ui/utils/calculatePages";

type ProductsPageProps = {
	params: {
		page: string;
	};
	searchParams: {
		sortby: string;
	};
};

const isProductOrderByInput = (
	maybeProductOrderByInput: unknown,
): maybeProductOrderByInput is ProductOrderByInput => {
	return (
		typeof maybeProductOrderByInput === "string" &&
		(maybeProductOrderByInput === "price_ASC" ||
			maybeProductOrderByInput === "price_DESC" ||
			maybeProductOrderByInput === "averageRating_ASC" ||
			maybeProductOrderByInput === "averageRating_DESC")
	);
};

export async function generateStaticParams() {
	const { productsConnection } = await executeGraphql({
		query: ProductsGetListDocument,
		variables: {
			count: 0,
		},
	});

	const productLength = productsConnection.aggregate.count;
	const pageCount = calculatePages(productLength);

	return new Array(pageCount).fill(undefined).map((_, i) => {
		return { page: String(i + 1) };
	});
}

export default async function ProductsPage({
	params: { page },
	searchParams: { sortby },
}: ProductsPageProps) {
	const currentPage = Number(page);

	let orderValue: ProductOrderByInput | undefined;
	if (isProductOrderByInput(sortby)) {
		orderValue = sortby;
	}

	const { products, productsConnection } = await executeGraphql({
		query: ProductsGetListDocument,
		variables: {
			count: PAGE_SIZE,
			offset: getOffsetByPageNumber(currentPage),
			order: orderValue,
		},
	});

	const numberOfPages = calculatePages(productsConnection.aggregate.count);

	return (
		<>
			<SortSelect />

			<ProductList products={products} />

			<Pagination
				className="p-8"
				range={numberOfPages}
				hrefFactory={(pageIndex) => `/products/${pageIndex}`}
			/>
		</>
	);
}
