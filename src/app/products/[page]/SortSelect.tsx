"use client";
import { type Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ChangeEventHandler } from "react";

export const SortSelect = <T extends string>() => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const sortby = searchParams.get("sortby");

	const onSortChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
		const newSearchParams = new URLSearchParams(searchParams);

		if (e.target.value) {
			newSearchParams.set("sortby", e.target.value);
		} else {
			newSearchParams.delete("sortby");
		}
		const newPathName = (pathname + "?" + newSearchParams.toString()) as Route<T>;
		router.push(newPathName);
	};

	return (
		<label className="mb-8">
			Sort:
			<select name="sortby" onChange={onSortChange} value={sortby || ""}>
				<option value="">Default</option>
				<option data-testid="sort-by-price" value="price_ASC">
					Price ASC
				</option>
				<option data-testid="sort-by-price" value="price_DESC">
					Price DESC
				</option>
				<option data-testid="sort-by-rating" value="averageRating_ASC">
					Rating ASC
				</option>
				<option data-testid="sort-by-rating" value="averageRating_DESC">
					Rating DESC
				</option>
			</select>
		</label>
	);
};
