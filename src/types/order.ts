export type Order = {
	id: string;
	total: number;
};

export type OrderRequest = {
	items: string[];
	total: number;
	payment: string;
	address: string;
	email: string;
	phone: string;
};
