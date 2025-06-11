import { Product } from '@types';
import { settings, CDN_URL } from '../utils/constants';
import { cloneTemplate, bem, ensureElement } from '../utils/utils';
import { ModalView } from '@components/ModalView'
import { events } from '@components/shared/events';
import { getProductClass } from '../utils/helper/product';


export class ProductPopupView extends ModalView {
	private title: HTMLElement;
	private image: HTMLImageElement;
	private category: HTMLElement;
	private description: HTMLElement;
	private price: HTMLElement;
	private button: HTMLButtonElement;
	
	constructor(modalContainerSelector: string, private templateSelector: string) {
		super(ensureElement(modalContainerSelector));
	}

	public render(): void {
		this.content.innerHTML = '';
		const content = cloneTemplate<HTMLElement>(this.templateSelector);

		this.title = ensureElement(bem('card', 'title').class, content);
		this.image = ensureElement<HTMLImageElement>(bem('card', 'image').class, content);
		this.category = ensureElement(bem('card', 'category').class, content);
		this.description = ensureElement(bem('card', 'text').class, content);
		this.price = ensureElement(bem('card', 'price').class, content);
		this.button = ensureElement<HTMLButtonElement>(bem('card', 'button').class, content);
		this.button.disabled = true;

		this.content.append(content);
	}

	public fillProductData(product: Product, isSalable: boolean): void {
		this.category.classList.add(getProductClass(product));

		this.title.textContent = product.title;
		this.image.src = `${CDN_URL}${product.image}`;
		this.category.textContent = product.category;
		this.description.textContent = product.description;
		this.price.textContent = `${product.price} ${settings.currency}`;

		this.button.disabled = false;

		if (!isSalable) {
			this.button.disabled = true;
		}
		
		this.button.addEventListener('click', () => {
			events.emit('cart:add', product);
			this.close();
		});
	}
}
