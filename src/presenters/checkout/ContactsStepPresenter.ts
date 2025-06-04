import { QuoteModel } from '@models';
import { CheckoutStepPresenter, Quote } from '@types';
import { ContactsStepPopupView, events } from '@components';

export class ContactsStepPresenter implements CheckoutStepPresenter {
	constructor(private model: QuoteModel, private view: ContactsStepPopupView) {}

	public init(): void {
		events.on('checkout:email:set', this.handleSetEmail.bind(this));
		events.on('checkout:phone:set', this.handleSetPhone.bind(this));
		events.on('quote:update', this.view.updateNextButtonState.bind(this.view));
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
		this.view.open();
	}

	public complete (): void {
		this.view.close();
	}
}
