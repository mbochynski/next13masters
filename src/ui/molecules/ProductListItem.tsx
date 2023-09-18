import Link from "next/link";
import { type Product } from "@/types/Product";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemTitle } from "@/ui/atoms/ProductListItemTitle";

type ProductListItemType = {
	product: Product;
};

export const ProductListItem: React.FC<ProductListItemType> = ({ product }) => {
	const { id, name, price, category, image } = product;

	return (
		<li className="minw  bg-background-color p-4 transition hover:scale-105">
			<Link className="h-full" href={`/products/${id}`}>
				<article className="flex h-full flex-col justify-between">
					<ProductCoverImage src={image.src} alt={image.alt} />
					<ProductListItemTitle name={name} price={price} category={category} />
				</article>
			</Link>
		</li>
	);
};
