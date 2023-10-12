const priceFormatter = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });

export const formatPrice = (price: number): string => {
	return priceFormatter.format(price);
};
