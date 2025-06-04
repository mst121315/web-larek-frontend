import { Product } from '@types';

export type Cart = {
	items: Product[];
	subtotal?: number;
};