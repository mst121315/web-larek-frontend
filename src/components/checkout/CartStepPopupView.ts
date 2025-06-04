import { Product, Cart } from '@types';
import { settings } from '../../utils/constants';
import { cloneTemplate, bem, setElementData } from '../../utils/utils';
import { events } from '@components/shared/events';
import { CartValidator } from '@components/checkout/validators/CartValidator';
import { AbstractFormPopupView } from '@components/checkout/AbstractFormPopupView';

export class CartStepPopupView extends AbstractFormPopupView {

	constructor(modalContainerSelector: string, validator: CartValidator, private cartTemplateSelector: string, private cartItemTemplateSelector: string) {
		super(modalContainerSelector, validator);
	}

	public render(cart: Cart): void {
		this.content.innerHTML = '';
		const content = cloneTemplate<HTMLElement>(this.cartTemplateSelector);

		const cartItems = content.querySelector(bem('basket', 'list').class) as HTMLElement;
		const subtotal = content.querySelector(bem('basket', 'price').class) as HTMLElement;
		this.nextButton = content.querySelector(bem('basket', 'button').class) as HTMLButtonElement;
		this.nextButton.addEventListener('click', (e) => {
			events.emit('checkout:next');
		});


		subtotal.textContent = `${cart.subtotal} ${settings.currency}`;

		cart.items.forEach((product: Product, index: number) => {
			const cartItem = cloneTemplate<HTMLButtonElement>(this.cartItemTemplateSelector);

			const itemIndex = cartItem.querySelector(bem('basket', 'item-index').class) as HTMLElement;
			const title = cartItem.querySelector(bem('card', 'title').class) as HTMLElement;
			const price = cartItem.querySelector(bem('card', 'price').class) as HTMLElement;
			const deleteButton = cartItem.querySelector(bem('basket', 'item-delete').class) as HTMLButtonElement;

			itemIndex.textContent = `${index + 1}.`;
			title.textContent = product.title;
			price.textContent = `${product.price} ${settings.currency}`;
			setElementData(deleteButton, { id: product.id });
			deleteButton.addEventListener('click', (e) => {
				const button	 = e.target as HTMLButtonElement;
				const id = button.dataset.id;
				events.emit('cart:delete', {id});
			});

			cartItems.appendChild(cartItem);
		});

		this.content.append(content);
		this.updateNextButtonState();
	}
}
