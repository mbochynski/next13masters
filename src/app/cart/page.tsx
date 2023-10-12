import Stripe from "stripe";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ChangeQuantity } from "./ChangeQuantity";
import { RemoveButton } from "./RemoveButton";
import { executeGraphql } from "@/api/graphqlApi";
import { CartGetByIdDocument } from "@/gql/graphql";
import { formatPrice } from "@/utils";

const getCart = async () => {
	const cartId = cookies().get("cartId")?.value;

	if (!cartId) {
		return;
	}

	const cart = await executeGraphql({
		query: CartGetByIdDocument,
		variables: {
			id: cartId,
		},
		cache: "no-store",
		next: {
			tags: ["cart"],
		},
	});

	if (!cart.order) {
		return;
	}
	return cart.order;
};

type LineItem = {
	price_data: {
		currency: string;
		product_data: {
			name: string;
			description: string;
			images: string[];
		};
		unit_amount: number;
	};
	quantity: number;
};

export default async function CartPage() {
	const cart = await getCart();

	if (!cart) {
		redirect("/");
	}

	async function handleStripePaymentAction() {
		"use server";

		if (!process.env.STRIPE_SECRET_KEY) {
			throw new Error("Missing STRIPE_SECRET_KEY env variable");
		}

		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
			apiVersion: "2023-08-16",
			typescript: true,
		});

		const cart = await getCart();
		if (!cart) {
			return;
		}

		const line_items = cart.orderItems
			.map((item) =>
				item.product
					? {
							price_data: {
								currency: "usd",
								product_data: {
									name: item.product.name,
									description: item.product.description,
									images: item.product.images.map((i) => i.url),
								},
								unit_amount: item.product.price,
							},
							quantity: item.quantity,
					  }
					: undefined,
			)
			.filter((item): item is LineItem => Boolean(item));

		const session = await stripe.checkout.sessions.create({
			metadata: {
				cartId: cart.id,
			},
			line_items,
			mode: "payment",
			success_url: `http://localhost:3000/cart/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `http://localhost:3000/cart/canceled`,
		});
		if (session.url) {
			cookies().set("cartId", "");
			redirect(session.url);
		}
	}

	return (
		<div>
			<h1>Order #{cart.id} summary</h1>
			<table>
				<thead>
					<tr>
						<th>Product</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{cart.orderItems.map((item) => {
						if (!item.product) {
							return null;
						}
						return (
							<tr key={item.product.id}>
								<td>{item.product.name}</td>
								<td>
									<ChangeQuantity itemId={item.id} quantity={item.quantity} />
								</td>
								<td>{formatPrice(item.product.price / 100)}</td>
								<td className="px-4 py-2">
									<RemoveButton productId={item.id} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<form action={handleStripePaymentAction} className="ml-auto">
				<button
					type="submit"
					className="rounded-sm border bg-slate-100 px-8 py-2 shadow-sm transition-colors hover:bg-slate-200"
				>
					Pay
				</button>
			</form>
		</div>
	);
}
