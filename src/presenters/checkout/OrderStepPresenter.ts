import { QuoteModel } from '@models';
import { CheckoutStepPresenter, Quote } from '@types';
import { OrderStepPopupView, events } from '@components';

export class OrderStepPresenter implements CheckoutStepPresenter {
	constructor(private model: QuoteModel, private view: OrderStepPopupView) {}

	public init(): void {
		events.on('checkout:payment:set', this.handleSetPayment.bind(this));
		events.on('checkout:address:set', this.handleSetAddress.bind(this));
		events.on('quote:update', this.view.updateNextButtonState.bind(this.view));
	}

	public process(): void {
		const quote: Quote = this.model.getQuote();
		this.view.render(quote);
		this.view.open();
	}

	private handleSetAddress({ address }: { address: string }): void {
		const quote: Quote = this.model.getQuote();
		quote.address = address;
		this.model.setQuote(quote);
	}

	private handleSetPayment({ payment }: { payment: string }): void {
		const quote: Quote = this.model.getQuote();
		quote.payment = payment;
		this.model.setQuote(quote);
	}

	public complete(): void {
		this.view.close();
	}
}
