import { formatPrice } from "@/utils";

type ProductListItemTitleType = {
	name: string;
	price: number;
	category: string;
};

export const ProductListItemTitle: React.FC<ProductListItemTitleType> = ({
	name,
	price,
	category,
}) => {
	return (
		<div className="pt-2">
			<div className="flex justify-between ">
				<h3>{name}</h3>
				<p className="font-semibold">{formatPrice(price / 100)}</p>
			</div>
			<div>
				<p className="text-sm font-light">{category}</p>
			</div>
		</div>
	);
};
