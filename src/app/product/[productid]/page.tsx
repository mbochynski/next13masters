import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { RelatedProducts } from "./relatedProducts";
import { AddToCartButton } from "./AddToCartButton";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { executeGraphql } from "@/api/graphqlApi";
import {
	CartAddItemDocument,
	CartCreateDocument,
	CartGetByIdDocument,
	ProductGetByIdDocument,
} from "@/gql/graphql";
import { formatPrice } from "@/utils";

type PageProps = {
	params: {
		productid: string;
	};
};

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
	const { product } = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: {
			id: props.params.productid,
		},
	});

	return {
		title: product?.name,
		description: product?.name,
	};
};

export default async function Product(props: PageProps) {
	const { product } = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: {
			id: props.params.productid,
		},
	});

	if (!product) {
		notFound();
	}

	async function addProductToCartAction() {
		"use server";
		if (!product) {
			return;
		}

		const cart = await getOrCreateCart();
		await addProductToCart(cart.id, product.id);
		revalidateTag("cart");
	}

	// TODO Brakuje wariantu produktu. zadanie 3, punkt 6:
	// Zaimplementuj wybór wariantu produktu (kolor, rozmiar) na podstawie pól, które znajdziesz w GraphQL w schemie produktów.

	return (
		<>
			<article className="mx-auto flex max-w-3xl pb-8">
				<ProductCoverImage alt={product.description} src={product.images[0].url} />
				<div className="flex-grow flex-col p-8">
					<h1>{product.name.trim()}</h1>
					<div>{product.categories[0].name}</div>
					<div>{formatPrice(product.price / 100)}</div>
					<form action={addProductToCartAction}>
						<input type="text" name="productId" value={product.id} hidden readOnly />
						<AddToCartButton />
					</form>
				</div>
			</article>
			<Suspense fallback={<h3>Loading...</h3>}>
				<RelatedProducts product={product} />
			</Suspense>
		</>
	);
}

async function getOrCreateCart() {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const { order: cart } = await executeGraphql({
			query: CartGetByIdDocument,
			variables: {
				id: cartId,
			},
			next: {
				tags: ["cart"],
			},
		});
		if (cart) {
			return cart;
		}
	}

	const { createOrder: newCart } = await executeGraphql({
		query: CartCreateDocument,
		next: {
			tags: ["cart"],
		},
	});
	if (!newCart) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", newCart.id);
	return newCart;
}

async function addProductToCart(cartId: string, productId: string) {
	const { product } = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: {
			id: productId,
		},
	});
	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	await executeGraphql({
		query: CartAddItemDocument,
		variables: {
			cartId,
			productId,
			total: product.price,
		},
		next: {
			tags: ["cart"],
		},
	});
}
