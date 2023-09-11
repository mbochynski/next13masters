export type ProductImage = {
	src: string;
	alt: string;
};

export type Product = {
	id: string;
	name: string;
	price: number;
	category: string;
	image: ProductImage;
};
