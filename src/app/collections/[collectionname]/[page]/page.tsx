import { notFound } from "next/navigation";
import { type Metadata, type ResolvingMetadata } from "next";
import { executeGraphql } from "@/api/graphqlApi";
import { CollectionsGetListDocument, ProductsGetListByCollectionSlugDocument } from "@/gql/graphql";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";
import { PAGE_SIZE, calculatePages, getOffsetByPageNumber } from "@/ui/utils/calculatePages";

type CollectionPageProps = {
	params: {
		collectionname: string;
		page: string;
	};
};

export const generateMetadata = async (
	props: CollectionPageProps,
	parent: ResolvingMetadata,
): Promise<Metadata> => {
	const { collections } = await executeGraphql({ query: CollectionsGetListDocument });
	const collection = collections.find(
		(collection) => collection.slug === props.params.collectionname,
	);
	const parentTitle = (await parent).title?.absolute;

	return {
		title: `${parentTitle} ${collection?.name || ""}`,
	};
};

export default async function CollectionsPage({ params }: CollectionPageProps) {
	const { collectionname } = params;

	const { collections } = await executeGraphql({ query: CollectionsGetListDocument });
	const currentCollection = collections.find((collection) => collection.slug === collectionname);

	if (!currentCollection) {
		return notFound();
	}

	const { products, productsConnection } = await executeGraphql({
		query: ProductsGetListByCollectionSlugDocument,
		variables: {
			collectionSlug: currentCollection?.slug,
			count: PAGE_SIZE,
			offset: getOffsetByPageNumber(Number(params.page)),
		},
	});

	const pageLength = calculatePages(productsConnection.aggregate.count);

	return (
		<>
			<h1 className="py-4 text-xl">{currentCollection.name}</h1>
			<ProductList products={products} />

			<Pagination
				className="p-8"
				range={pageLength}
				hrefFactory={(pageIndex) => `/collections/${collectionname}/${pageIndex}`}
			/>
		</>
	);
}
