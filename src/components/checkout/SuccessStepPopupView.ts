import { bem, cloneTemplate, ensureElement } from '../../utils/utils';
import { ModalView } from '@components/ModalView';
import { Order } from '@types';
import { settings } from '../../utils/constants';

export class SuccessStepPopupView extends ModalView {
	private successTitle: HTMLElement;
	private successDescription: HTMLElement;

	constructor(
		modalContainerSelector: string,
		private checkoutSuccessStepTemplate: string
	) {
		super(ensureElement(modalContainerSelector));
	}

	public render(): void {
		this.content.innerHTML = '';
		const content = cloneTemplate<HTMLElement>(this.checkoutSuccessStepTemplate);
		this.successTitle = content.querySelector(bem('order-success', 'title').class) as HTMLElement;
		this.successTitle.textContent = settings.orderProcessingText;
		this.successDescription = content.querySelector(bem('order-success', 'description').class) as HTMLElement;
		const closeButton = content.querySelector(bem('order-success', 'close').class) as HTMLButtonElement;
		closeButton.addEventListener('click', () => this.close());
		this.content.append(content);
	}

	public fillOrderData(order: Order): void {
		this.successTitle.textContent = settings.orderSuccessText;
		const description = settings.orderAmountText
			.replace('%1', order.total.toString())
			.replace('%2', settings.currency);
		this.successDescription.textContent = description;
	}
}
