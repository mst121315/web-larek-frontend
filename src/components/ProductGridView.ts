import { Product } from '@types';
import { settings, CDN_URL } from '../utils/constants';
import { cloneTemplate, setElementData, bem, ensureElement } from '../utils/utils';
import { events } from '@components/shared/events';
import { getProductClass } from '../utils/helper/product';

export class ProductGridView {

	private container: HTMLElement;

	constructor(selector: string) {
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

	public render(cards: HTMLElement[]): void {
		this.container.innerHTML = '';
		cards.forEach((card: HTMLElement) => {
			this.container.appendChild(card);
		});
	}
}
