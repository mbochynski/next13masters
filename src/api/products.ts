import { type Product } from "@/types/Product";

export type ProductAPI = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	rating: Rating;
	image: string;
	longDescription: string;
};

export type Rating = {
	rate: number;
	count: number;
};

const apiProductToAppProduct = (apiproduct: ProductAPI): Product => {
	const product: Product = {
		id: apiproduct.id,
		category: apiproduct.category,
		image: {
			alt: apiproduct.description,
			src: apiproduct.image,
		},
		name: apiproduct.title,
		price: apiproduct.price,
		description: apiproduct.description,
	};

	return product;
};

const mapAPIProductsToAppProducts = (products: ProductAPI[]): Product[] => {
	return products.map(apiProductToAppProduct);
};

export const getProducts = async ({
	take = 20,
	offset = 0,
}: {
	take?: number;
	offset?: number;
}): Promise<Product[]> => {
	const response = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=${take}&offset=${offset}`,
	);
	const products = (await response.json()) as ProductAPI[];

	return mapAPIProductsToAppProducts(products);
};

export const getProductById = async (id: Product["id"]): Promise<Product> => {
	const response = await fetch(`https://naszsklep-api.vercel.app/api/products/${id}`);
	const product = (await response.json()) as ProductAPI;

	return apiProductToAppProduct(product);
};