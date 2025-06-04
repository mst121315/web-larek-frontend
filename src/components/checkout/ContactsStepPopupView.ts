import { CheckoutStepValidator, Quote } from '@types';
import { cloneTemplate, bem } from '../../utils/utils';
import { events } from '@components/shared/events';
import { ContactsValidator } from '@components/checkout/validators/ContactsValidator';
import { AbstractFormPopupView } from '@components/checkout/AbstractFormPopupView';

export class ContactsStepPopupView extends AbstractFormPopupView {

	constructor(
		modalContainerSelector: string,
		validator: CheckoutStepValidator,
		private checkoutContactsStepTemplate: string
	) {
		super(modalContainerSelector, validator);
	}

	public render(quote: Quote): void {
		this.content.innerHTML = '';
		const form = cloneTemplate<HTMLElement>(this.checkoutContactsStepTemplate);
		const emailField = this.processEmailField(form, quote);
		const phoneField = this.processPhoneField(form, quote);
		this.content.append(form);
		(this.validator as ContactsValidator).setFields([emailField, phoneField]);
		this.nextButton = form.querySelector(bem('contacts', 'button').class) as HTMLButtonElement;

		this.processFormSubmit(form);
		this.updateNextButtonState();
	}

	private processEmailField(form: HTMLElement, quote: Quote): HTMLInputElement {
		const emailField = form.querySelector('input[name="email"]') as HTMLInputElement;
		emailField.value = quote.email || '';
		emailField.addEventListener('input', () => {
			const email = emailField.value.trim();
			events.emit('checkout:email:set', { email });
			emailField.setCustomValidity('');
			if (!emailField.checkValidity()) {
				emailField.reportValidity();
			}
		});

		return emailField;
	}

	private processPhoneField(form: HTMLElement, quote: Quote): HTMLInputElement {
		const phoneField = form.querySelector('input[name="phone"]') as HTMLInputElement;
		phoneField.value = quote.phone || '';
		phoneField.addEventListener('input', () => {
			const phone = phoneField.value.trim();
			events.emit('checkout:phone:set', { phone });
			phoneField.setCustomValidity('');
			if (!phoneField.checkValidity()) {
				const message = phoneField.dataset.errorMessage;
				phoneField.setCustomValidity(message);
				phoneField.reportValidity();
			}
		});

		return phoneField;
	}
}
