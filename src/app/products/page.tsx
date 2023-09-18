import { ProductList } from "@/ui/organisms/ProductList";
import { getProducts } from "@/api/products";

export default async function Products() {
	const products = await getProducts();

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-16 lg:p-24">
			<ProductList products={products} />
		</main>
	);
}
