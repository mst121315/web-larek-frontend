import { Product, Cart } from '@types';
import { settings } from '../../utils/constants';
import { cloneTemplate, bem, setElementData } from '../../utils/utils';
import { events } from '@components/shared/events';
import { CartValidator } from '@components/checkout/validators/CartValidator';
import { AbstractFormPopupView } from '@components/checkout/AbstractFormPopupView';

export class CartStepPopupView extends AbstractFormPopupView {

	constructor(modalContainerSelector: string, private cartTemplateSelector: string) {
		super(modalContainerSelector);
	}

	public render(cart: Cart, cartItemElements: HTMLElement[]): void {
		this.content.innerHTML = '';
		const content = cloneTemplate<HTMLElement>(this.cartTemplateSelector);

		const cartItems = content.querySelector(bem('basket', 'list').class) as HTMLElement;
		const subtotal = content.querySelector(bem('basket', 'price').class) as HTMLElement;
		this.nextButton = content.querySelector(bem('basket', 'button').class) as HTMLButtonElement;
		this.nextButton.addEventListener('click', (e) => {
			events.emit('checkout:next');
		});

		subtotal.textContent = `${cart.subtotal} ${settings.currency}`;

		cartItemElements.forEach((cartItemElement: HTMLElement) => {
			cartItems.appendChild(cartItemElement);
		});

		this.content.append(content);
	}
}
