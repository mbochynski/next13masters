import { formatPrice } from "@/utils";

type ProductListItemTitleType = {
	averageRating: number | null | undefined;
	name: string;
	price: number;
	category: string;
};

export const ProductListItemTitle: React.FC<ProductListItemTitleType> = ({
	name,
	price,
	category,
	averageRating,
}) => {
	return (
		<div className="pt-2">
			<div className="flex justify-between ">
				<h3>{name}</h3>
				<p className="font-semibold" data-testid="product-price">
					{formatPrice(price / 100)}
				</p>
			</div>
			<div>
				<p className="text-sm font-light">{category}</p>
				<p className="text-sm font-light">
					Rating: <span data-testid="product-rating">{averageRating || ""}</span>
				</p>
			</div>
		</div>
	);
};
