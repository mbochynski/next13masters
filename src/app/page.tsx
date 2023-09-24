import { getProducts } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";
import { LinkButton } from "@/ui/atoms/LinkButton";

export default async function Home() {
	const products = await getProducts({
		take: 4,
	});

	return (
		<>
			<ProductList products={products} />

			<LinkButton className="mt-8" href="/products">
				Przejdz na stronę z produktami
			</LinkButton>
		</>
	);
}
