import { Product } from '@types';
import { settings, CDN_URL } from '../utils/constants';
import { cloneTemplate, setElementData, bem, ensureElement } from '../utils/utils';
import { events } from '@components/shared/events';
import { getProductClass } from '../utils/helper/product';

export class ProductGridItemView {

		constructor(private productGridItemTemplate: string) {
	}

	public render(product: Product): HTMLElement {
			const card = cloneTemplate<HTMLButtonElement>(this.productGridItemTemplate);

			const category = card.querySelector(bem('card', 'category').class) as HTMLElement;
			const title = card.querySelector(bem('card', 'title').class) as HTMLElement;
			const image = card.querySelector(bem('card', 'image').class) as HTMLImageElement;
			const price = card.querySelector(bem('card', 'price').class) as HTMLElement;
			category.classList.add(getProductClass(product));

			category.textContent = product.category;
			title.textContent = product.title;
			image.src = `${CDN_URL}${product.image}`;
			image.alt = product.title;
			price.textContent = `${product.price} ${settings.currency}`;

			setElementData(card, { id: product.id });

			return card;
	}
}
