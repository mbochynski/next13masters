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

const mapAPIProductsToAppProducts = (products: ProductAPI[]): Product[] => {
	return products.map((apiproduct) => {
		const product: Product = {
			id: apiproduct.id,
			category: apiproduct.category,
			image: {
				alt: apiproduct.description,
				src: apiproduct.image,
			},
			name: apiproduct.title,
			price: apiproduct.price,
		};

		return product;
	});
};

export const getProducts = async (): Promise<Product[]> => {
	const response = await fetch("https://naszsklep-api.vercel.app/api/products?take=20");
	const products = (await response.json()) as ProductAPI[];

	return mapAPIProductsToAppProducts(products);
};
