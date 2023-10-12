"use server";
import { revalidateTag } from "next/cache";
import { executeGraphql } from "@/api/graphqlApi";
import { CartChangeItemQuantityDocument, CartRemoveItemDocument } from "@/gql/graphql";

export const changeItemQuantity = async (itemId: string, optimisticQuantity: number) => {
	await executeGraphql({
		query: CartChangeItemQuantityDocument,
		variables: {
			quantity: optimisticQuantity,
			itemId,
		},
		next: {
			tags: ["cart"],
		},
	});
	revalidateTag("cart");
};

export const removeItem = async (itemId: string) => {
	await executeGraphql({
		query: CartRemoveItemDocument,
		variables: {
			itemId,
		},
		next: {
			tags: ["cart"],
		},
	});
};
