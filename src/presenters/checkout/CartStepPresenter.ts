import { CartModel, QuoteModel } from '@models';
import { CartStepPopupView, events } from '@components';
import { CheckoutStepPresenter, Quote } from '@types';

export class CartStepPresenter implements CheckoutStepPresenter {
	constructor(private cartModel: CartModel, private view: CartStepPopupView) {}

	public init(): void {
		events.on('cart:update', this.handleCartUpdate.bind(this));
		this.handleCartUpdate();
	}

	public process(): void {
		this.view.render(this.cartModel.getCart());
		this.view.open();
	}

	public complete (): void {
		this.view.close();
	}

	private handleCartUpdate(): void {
		this.view.render(this.cartModel.getCart());
	}
}
