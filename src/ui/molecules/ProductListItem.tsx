import { type Product } from "@/types/Product";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemTitle } from "@/ui/atoms/ProductListItemTitle";

type ProductListItemType = {
	product: Product;
};

export const ProductListItem: React.FC<ProductListItemType> = ({ product }) => {
	const { name, price, category, image } = product;

	return (
		<li className="minw  bg-background-color p-4 transition hover:scale-105">
			<article>
				<ProductCoverImage src={image.src} alt={image.alt} />
				<ProductListItemTitle name={name} price={price} category={category} />
			</article>
		</li>
	);
};
