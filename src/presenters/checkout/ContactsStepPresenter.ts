import { QuoteModel } from '@models';
import { CheckoutStepValidator, Quote } from '@types';
import { ContactsStepPopupView, ContactsValidator, events } from '@components';
import { AbstractStepPresenter } from '@presenters/checkout/AbstractStepPresenter';

export class ContactsStepPresenter extends AbstractStepPresenter {
	constructor(private model: QuoteModel, private view: ContactsStepPopupView, private validator: CheckoutStepValidator) {
		super();
	}

	public init(): void {
		events.on('checkout:email:set', this.handleSetEmail.bind(this));
		events.on('checkout:phone:set', this.handleSetPhone.bind(this));
		events.on('quote:update', this.validateView.bind(this));
	}

	private handleSetEmail({ email }: { email: string }): void {
		const quote: Quote = this.model.getQuote();
		quote.email = email;
		this.model.setQuote(quote);
	}

	private handleSetPhone({ phone }: { phone: string }): void {
		const quote: Quote = this.model.getQuote();
		quote.phone = phone;
		this.model.setQuote(quote);
	}

	public process(): void {
		const quote: Quote = this.model.getQuote();
		this.view.render(quote);
		const formFields = this.view.getFormFields();
		(this.validator as ContactsValidator).setFields(formFields);

		this.view.open();
		this.validateView();
	}

	private validateView(): void {
		if (this.isActive) {
			this.view.updateNextButtonState(this.validator.isValid());
			this.view.showErrors(this.validator.getErrors());
		}
	}

	public complete (): void {
		this.view.close();
	}
}
