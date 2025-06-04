import { CheckoutStepValidator } from '@types';
import { ensureElement } from '../../utils/utils';
import { ModalView } from '@components/ModalView';
import { events } from '@components/shared/events';

export abstract class AbstractFormPopupView extends ModalView {
	protected nextButton: HTMLButtonElement;

	protected constructor(
		modalContainerSelector: string,
		protected validator: CheckoutStepValidator,
	) {
		super(ensureElement(modalContainerSelector));
	}

	public updateNextButtonState() {
		const isValid = this.validator.isValid();
		this.nextButton && (this.nextButton.disabled = !isValid);
	}

	protected processFormSubmit(form: HTMLElement): void {
		form.addEventListener('submit', (event) => {
			event.preventDefault();
			if (this.validator.isValid()) {
				events.emit('checkout:next');
			}
		});
	}
}
