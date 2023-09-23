import { getProducts } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";
import { Pagination } from "@/ui/molecules/Pagination";

type ProductsPageProps = {
	params: {
		page: string;
	};
};

export async function generateStaticParams() {
	return new Array(10).fill(undefined).map((_, i) => {
		return { page: String(i + 1) };
	});
}

export default async function ProductsPage({ params: { page } }: ProductsPageProps) {
	const currentPage = Number(page);
	const products = await getProducts({
		take: 20,
		offset: (currentPage - 1) * 20,
	});

	return (
		<>
			<ProductList products={products} />

			<Pagination className="p-8" start={1} range={10} />
		</>
	);
}
