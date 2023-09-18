type ProductCoverImageType = {
	alt: string;
	src: string;
};

export const ProductCoverImage: React.FC<ProductCoverImageType> = ({ alt, src }) => {
	return (
		<div>
			<img className="w-full object-contain object-center" src={src} alt={alt} />
		</div>
	);
};
