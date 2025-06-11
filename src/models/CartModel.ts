import { Product, Cart } from '@types';
import { Storage } from '@models/Storage';

export class CartModel {
	constructor(private storage: Storage) {}

	public add(product: Product): void {
		const cart = this.storage.getCart();
		if (!cart.items.find((p) => p.id === product.id)) {
			cart.items.push(product);
			this.setCart(cart);
		}
	}

	public delete(productId: string): void {
		const cart = this.storage.getCart();
		cart.items = cart.items.filter((p) => String(p.id) !== String(productId));
		this.setCart(cart);
	}

	public getCart(): Cart {
		const cart = this.storage.getCart();
		cart.subtotal = this.getTotal(cart.items);

		return cart;
	}

	private setCart(cart: Cart): void {
		cart.subtotal = this.getTotal(cart.items);
		this.storage.setCart(cart);
	}

	private getTotal(items: Product[]): number {
		return items.reduce((total, item) => total + item.price, 0);
	}

	public isInCard(product: Product): boolean {
		const cart = this.storage.getCart();
		const isInCart = cart.items.some((item) => item.id === product.id);

		return isInCart;
	}
}
