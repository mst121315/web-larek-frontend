import { CartModel } from '@models';
import { Product, Cart } from '@types';
import { CartIconView, events } from '@components';

export class CartPresenter {
	constructor(private model: CartModel, private view: CartIconView) {}

	public init(): void {
		this.cartUpdate();
		events.on('cart:add', this.handleAddToCart.bind(this));
		events.on('cart:delete', this.handleDeleteFromCart.bind(this));
		events.on('quote:clear', this.cartUpdate.bind(this));
	}

	private cartUpdate(): void {
		const cart = this.model.getCart();
		this.view.render(cart);
	}

	private handleAddToCart(product: Product): void {
		this.model.add(product);
		this.cartUpdate();
		events.emit('cart:update');
	}

	private handleDeleteFromCart({ id }: { id: string }): void {
		this.model.delete(id);
		this.cartUpdate();
		events.emit('cart:update');
	}
}
