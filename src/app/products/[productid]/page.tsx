export default function Product({ params }: { params: { productid: string } }) {
	return <>This is single product page {params.productid} </>;
}
