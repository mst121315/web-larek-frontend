import { Cart } from '@types';

export type Quote = {
	cart: Cart;
	payment?: string;
	address?: string;
	email?: string;
	phone?: string;
};