import { CheckoutStepValidator } from '@types';
import { bem, ensureElement } from '../../utils/utils';
import { ModalView } from '@components/ModalView';
import { events } from '@components/shared/events';

export abstract class AbstractFormPopupView extends ModalView {
	protected nextButton: HTMLButtonElement;

	protected constructor(
		modalContainerSelector: string
	) {
		super(ensureElement(modalContainerSelector));
	}

	public updateNextButtonState(isValid: boolean): void {
		this.nextButton && (this.nextButton.disabled = !isValid);
	}

	protected processFormSubmit(form: HTMLElement): void {
		form.addEventListener('submit', (event) => {
			event.preventDefault();
			events.emit('checkout:next');
		});
	}

	public showErrors(errors: string[]): void {
		const errorContainer = this.content.querySelector(bem('form', 'errors').class) as HTMLElement;
		errorContainer.innerHTML = '';
		if (errors.length > 0) {
			errors.forEach((error) => {
				const errorItem = document.createElement('div');
				errorItem.textContent = error;
				errorContainer.appendChild(errorItem);
			});
		}
	}
}
