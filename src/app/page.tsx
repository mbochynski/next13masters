import Link from "next/link";
import { ProductList } from "@/ui/organisms/ProductList";
import { executeGraphql } from "@/api/graphqlApi";
import { CollectionsGetListDocument, ProductsGetListDocument } from "@/gql/graphql";
import { LinkButton } from "@/ui/atoms/LinkButton";

export default async function Home() {
	const { products } = await executeGraphql(ProductsGetListDocument, {
		count: 4,
	});
	const { collections } = await executeGraphql(CollectionsGetListDocument);

	return (
		<>
			<h1 className="py-2 text-lg">Kolekcje</h1>
			<div className="p-4">
				{collections.map((collection) => {
					return (
						<Link
							className="p-4 text-blue-600"
							key={collection.slug}
							href={`/collections/${collection.slug}`}
						>
							{collection.name}
						</Link>
					);
				})}
			</div>

			<h1 className="py-2 text-lg">Przykładowe produkty</h1>
			<ProductList products={products} />

			<LinkButton className="mt-8" href="/products">
				Przejdz na stronę z produktami
			</LinkButton>
		</>
	);
}
