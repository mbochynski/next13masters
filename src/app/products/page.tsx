import { ProductList } from "@/ui/organisms/ProductList";
import products from "@/data/products.json";

export default function Products() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-16 lg:p-24">
			<ProductList products={products} />
		</main>
	);
}
