export const PAGE_SIZE = 4;

export const calculatePages = (numberOfItems: number, itemsPerPage: number = PAGE_SIZE) => {
	return Math.ceil(numberOfItems / itemsPerPage);
};

export const getOffsetByPageNumber = (pageNumber: number, itemsPerPage: number = PAGE_SIZE) => {
	return (pageNumber - 1) * itemsPerPage;
};
