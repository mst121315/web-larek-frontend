import { Cart } from '@types';
import { bem, ensureElement } from '../utils/utils';
import { events } from '@components/shared/events';

export class CartIconView {
	private icon: HTMLElement;

	constructor(selector: string) {
		this.icon = ensureElement(selector);
		this.icon.addEventListener('click', (e) => {
			// events.emit('cart:view');
			events.emit('checkout:start');
		});
	}

	public render(cart: Cart): void {
		const counter = ensureElement(
			bem('header', 'basket-counter').class,
			this.icon
		);
		counter.textContent = cart.items.length.toString();
	}
}
