import { bem, ensureElement } from '../utils/utils';

console.log('ModalView loaded');

export class ModalView {
	protected container: HTMLElement;
	protected content: HTMLElement;

	constructor(container: HTMLElement) {
		this.container = container;
		this.content = ensureElement(bem('modal', 'content').class, this.container);

		this.container.addEventListener('click', (e) => {
			if (e.target === this.container ||
				(e.target instanceof HTMLElement && e.target.closest('.modal__close'))
			) {
				this.close();
			}
		});
	}

	public open(): void {
		this.container.classList.add('modal_active');
	}

	public close(): void {
		this.container.classList.remove('modal_active');
	}
}
