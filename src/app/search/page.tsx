import { executeGraphql } from "@/api/graphqlApi";
import { ProductsGetListByNameDocument } from "@/gql/graphql";
import { ProductList } from "@/ui/organisms/ProductList";

type SearchResultsPageProps = {
	params: {};
	searchParams: {
		query: string;
	};
};

export default async function SearchResultsPage({ searchParams }: SearchResultsPageProps) {
	const query = searchParams.query;
	const { products } = await executeGraphql({
		query: ProductsGetListByNameDocument,
		variables: {
			count: 10,
			name: query,
		},
	});

	return (
		<>
			<h1 className="mb-8 text-xl">Wyniki wyszukiwania</h1>
			{products.length === 0 && <h2>Nie znaleziono produktów</h2>}
			<ProductList products={products} />
		</>
	);
}
