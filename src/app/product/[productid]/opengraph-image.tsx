import { ImageResponse } from "next/server";
import { executeGraphql } from "@/api/graphqlApi";
import { ProductGetByIdDocument } from "@/gql/graphql";

export const runtime = "edge";

export const alt = "next13 masters sklep";
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

// nazwę produktu, krótki opis, kategorię i miniaturkę obrazka.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function og({ params: { productid } }: { params: { productid: string } }) {
	console.log("og", productid);
	const { product } = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: {
			id: productid,
		},
	});

	if (!product) {
		return;
	}

	return new ImageResponse(
		(
			<div
				tw="w-full text-white h-full flex flex-col items-center justify-center text-8xl"
				style={{
					background: `
				    linear-gradient(
				      90deg,
				      rgb(58, 58, 58) 0%,
				      rgb(142, 142, 142) 20%,
				      rgb(121, 121, 121) 80%,
				      rgb(70, 70, 70) 100%
				    )`,
				}}
			>
				<p tw="font-sans uppercase m-4 p-0 text-[101px] leading-4">{product?.name}</p>
				<p tw="font-serif m-0 p-0 font-black">{product?.description}</p>
				<p tw="font-serif m-0 p-0 font-black">
					{product?.categories.map((category) => category.name).join(", ")}
				</p>
				<img height={"200px"} width={"200px"} alt={product?.name} src={product?.images[0].url} />
			</div>
		),
	);
}
