import { Product } from '@types';
import { settings, CDN_URL } from '../utils/constants';
import { cloneTemplate, setElementData, bem, ensureElement } from '../utils/utils';
import { events } from '@components/shared/events';
import { getProductClass } from '../utils/helper/product';

export class ProductGridView {

	private container: HTMLElement;

	constructor(selector: string, private productGridItemTemplate: string) {
		this.container = ensureElement(selector);
		this.container.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
			const button = target.closest('[data-id]') as HTMLButtonElement;
			if (button) {
				const id = button.dataset.id;
				events.emit('product:view', {id});
			}
		});
	}

	public render(products: Product[]): void {
		this.container.innerHTML = '';
		products.forEach((product: Product) => {
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

			this.container.appendChild(card);
		});
	}
}
