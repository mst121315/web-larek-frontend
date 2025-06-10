import { CheckoutStepValidator, Quote } from '@types';
import { cloneTemplate, bem } from '../../utils/utils';
import { events } from '@components/shared/events';
import { AbstractFormPopupView } from '@components/checkout/AbstractFormPopupView';

export class OrderStepPopupView extends AbstractFormPopupView {
	constructor(
		modalContainerSelector: string,
		private checkoutOrderStepTemplate: string
	) {
		super(modalContainerSelector);
	}

	public render(quote: Quote): void {
		this.content.innerHTML = '';
		const form = cloneTemplate<HTMLElement>(this.checkoutOrderStepTemplate);
		this.processAddressField(form, quote);
		this.processPaymentButtons(form, quote);
		this.nextButton = form.querySelector(bem('order', 'button').class) as HTMLButtonElement;
		this.content.append(form);

		this.processFormSubmit(form);
	}

	private processPaymentButtons(form: HTMLElement, quote: Quote): void {
		const paymentButtonsContainer = form.querySelector(bem('order', 'buttons').class) as HTMLElement;
		const paymentButtons = paymentButtonsContainer.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
		paymentButtons.forEach((button) => {
			if (button.name == quote.payment) {
				button.classList.add('button_alt-active');
			}
			button.addEventListener('click', () => {
				paymentButtons.forEach((btn) => {
					btn.classList.remove('button_alt-active');
				});
				button.classList.add('button_alt-active');
				const payment = button.name;
				events.emit('checkout:payment:set', { payment });
			});
		});
	}

	private processAddressField(form: HTMLElement, quote: Quote): void {
		const addressField = form.querySelector('input[name="address"]') as HTMLInputElement;
		addressField.value = quote.address || '';
		addressField.addEventListener('input', () => {
			const address = addressField.value.trim();
			events.emit('checkout:address:set', { address });
		});
	}
}
