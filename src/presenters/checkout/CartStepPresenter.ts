import { CartModel} from '@models';
import { CartItemView, CartStepPopupView, events} from '@components';
import { CheckoutStepValidator, Product } from '@types';
import { AbstractStepPresenter } from '@presenters/checkout/AbstractStepPresenter';

export class CartStepPresenter extends AbstractStepPresenter {
	constructor(private cartModel: CartModel, private view: CartStepPopupView, private itemView: CartItemView, private validator: CheckoutStepValidator) {
		super();
	}

	public init(): void {
		events.on('cart:update', this.renderView.bind(this));
		this.renderView();
	}

	public process(): void {
		this.renderView();
		this.view.open();
		this.view.updateNextButtonState(this.validator.isValid());
	}

	private renderView(): void
	{
		const cart = this.cartModel.getCart();
		const cartItems: HTMLElement[] = [];
		cart.items.forEach((product: Product, index: number) => {
			const cartItem = this.itemView.render(product, index);
			cartItems.push(cartItem)
		});
		this.view.render(cart, cartItems);
	}

	public complete (): void {
		this.view.close();
	}
}
