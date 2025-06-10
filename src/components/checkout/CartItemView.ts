import { Product, Cart } from '@types';
import { settings } from '../../utils/constants';
import { cloneTemplate, bem, setElementData } from '../../utils/utils';
import { events } from '@components/shared/events';
import { CartValidator } from '@components/checkout/validators/CartValidator';
import { AbstractFormPopupView } from '@components/checkout/AbstractFormPopupView';

export class CartItemView  {

	constructor(private cartItemTemplateSelector: string) {
	}

	public render(product: Product, index: number): HTMLElement {
			const cartItem = cloneTemplate<HTMLElement>(this.cartItemTemplateSelector);

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

			return cartItem;
	}
}
