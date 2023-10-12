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
	type CartGetByIdQuery,
	ProductGetByIdDocument,
} from "@/gql/graphql";
import { formatPrice } from "@/utils";
import { changeItemQuantity } from "@/app/actions";

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
		await addProductToCart(cart, product.id);
		revalidateTag("cart");
	}

	// TODO Brakuje wariantu produktu. zadanie 3, punkt 6:
	// Zaimplementuj wybór wariantu produktu (kolor, rozmiar) na podstawie pól, które znajdziesz w GraphQL w schemie produktów.

	// Zaimplementuj dodawanie recenzji produktów na podstawie podanej makiety.
	// - Formularz powinien mieć 5 pól o następujących nazwach:
	// headline (tytuł recenzji),
	// content (treść),
	// rating (ocena),
	// name (nazwa użytkownika)
	// oraz email. -
	// Do formularza dodaj atrybut data-testid="add-review-form".

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
			<div>
				<h2 className="text-xl">Add review</h2>
				<form className="flex flex-col" data-testid="add-review-form">
					<label className="m-2">
						Headline
						<input name="headline" />
					</label>
					<label className="m-2">
						Content
						<textarea name="content" />
					</label>
					<div className="rating effect">
						<input type="radio" name="rating" value="star_one" id="star_one" />
						<label htmlFor="star_one" className="stars">
							One star
						</label>
						<input type="radio" name="rating" value="star_two" id="star_two" />
						<label htmlFor="star_two" className="stars">
							Two stars
						</label>
						<input type="radio" name="rating" value="star_three" id="star_three" />
						<label htmlFor="star_three" className="stars">
							Three stars
						</label>
						<input type="radio" name="rating" value="star_four" id="star_four" />
						<label htmlFor="star_four" className="stars">
							Four stars
						</label>
						<input type="radio" name="rating" value="star_five" id="star_five" />
						<label htmlFor="star_five" className="stars">
							Five stars
						</label>
					</div>

					<label className="m-2">
						Name
						<textarea name="name" />
					</label>
					<label className="m-2">
						E-mail
						<textarea name="email" />
					</label>

					<button type="submit">Submit</button>
				</form>
			</div>
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

async function addProductToCart(cart: CartGetByIdQuery["order"], productId: string) {
	if (!cart) {
		throw new Error(`Cart not found`);
	}

	if (cart.orderItems) {
		const existingItem = cart.orderItems.find((item) => {
			return productId === item.product?.id;
		});

		if (existingItem) {
			await changeItemQuantity(existingItem.id, existingItem.quantity + 1);
			return;
		}
	}

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
			productId: productId,
			cartId: cart.id,
			total: product.price,
		},
		next: {
			tags: ["cart"],
		},
	});
}
