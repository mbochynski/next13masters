import Link from "next/link";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemTitle } from "@/ui/atoms/ProductListItemTitle";
import { type ProductListItemFragment } from "@/gql/graphql";

type ProductListItemType = {
	product: ProductListItemFragment;
};

export const ProductListItem: React.FC<ProductListItemType> = ({ product }) => {
	const { id, name, price, description } = product;
	const category = product.categories[0].name || "";
	const image = product.images[0].url;

	return (
		<li className="minw  bg-background-color p-4 transition hover:scale-105">
			<Link className="h-full" href={`/product/${id}`}>
				<article className="flex h-full flex-col justify-between">
					<ProductCoverImage src={image} alt={description} />
					<ProductListItemTitle name={name} price={price} category={category} />
				</article>
			</Link>
		</li>
	);
};
