import { type ResolvingMetadata, type Metadata } from "next";
import { executeGraphql } from "@/api/graphqlApi";
import { CategoriesGetListDocument, ProductsGetListByCategorySlugDocument } from "@/gql/graphql";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";
import { PAGE_SIZE, calculatePages, getOffsetByPageNumber } from "@/ui/utils/calculatePages";

type CategoryPageProps = {
	params: {
		category: string;
		page: string;
	};
};

export const generateMetadata = async (
	props: CategoryPageProps,
	parent: ResolvingMetadata,
): Promise<Metadata> => {
	const { categories } = await executeGraphql({ query: CategoriesGetListDocument });
	const category = categories.find((category) => category.slug === props.params.category);
	const parentTitle = (await parent).title?.absolute;

	return {
		title: `${parentTitle} ${category?.name || ""}`,
	};
};

export default async function CategoryPage({ params }: CategoryPageProps) {
	const { category } = params;

	const { categories } = await executeGraphql({ query: CategoriesGetListDocument });
	const currentCategory = categories.find((category) => category.slug === params.category);

	const { products, productsConnection } = await executeGraphql({
		query: ProductsGetListByCategorySlugDocument,
		variables: {
			categorySlug: category,
			count: PAGE_SIZE,
			offset: getOffsetByPageNumber(Number(params.page)),
		},
	});

	const pageLength = calculatePages(productsConnection.aggregate.count);

	return (
		<>
			<h1 className="py-4 text-xl">{currentCategory?.name}</h1>
			<ProductList products={products} />

			<Pagination
				className="p-8"
				range={pageLength}
				hrefFactory={(pageIndex) => `/categories/${category}/${pageIndex}`}
			/>
		</>
	);
}
