import { type Metadata } from "next";
import { getProductById } from "@/api/products";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";

const priceFormatter = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });

const formatPrice = (price: number): string => {
	return priceFormatter.format(price);
};

type PageProps = {
	params: {
		productid: string;
	};
};

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
	const product = await getProductById(props.params.productid);

	return {
		title: product.name,
		description: product.name,
	};
};

export default async function Product(props: PageProps) {
	const product = await getProductById(props.params.productid);

	return (
		<article className="m-auto flex max-w-3xl">
			<ProductCoverImage alt={product.image.alt} src={product.image.src} />
			<div className="flex-grow flex-col p-8">
				<h1>{product.name}</h1>
				<div>{product.category}</div>
				<div>{formatPrice(product.price)}</div>
			</div>
		</article>
	);
}
