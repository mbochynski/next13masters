import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { executeGraphql } from "@/api/graphqlApi";
import { ProductGetByIdDocument } from "@/gql/graphql";

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
	const { product } = await executeGraphql(ProductGetByIdDocument, {
		id: props.params.productid,
	});

	return {
		title: product?.name,
		description: product?.name,
	};
};

export default async function Product(props: PageProps) {
	const { product } = await executeGraphql(ProductGetByIdDocument, {
		id: props.params.productid,
	});

	if (!product) {
		notFound();
	}

	return (
		<article className="m-auto flex max-w-3xl">
			<ProductCoverImage alt={product.description} src={product.images[0].url} />
			<div className="flex-grow flex-col p-8">
				<h1>{product.name}</h1>
				<div>{product.categories[0].name}</div>
				<div>{formatPrice(product.price)}</div>
			</div>
		</article>
	);
}
