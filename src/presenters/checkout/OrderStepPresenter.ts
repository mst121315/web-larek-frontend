import { QuoteModel } from '@models';
import { CheckoutStepValidator, Quote } from '@types';
import { OrderStepPopupView, events } from '@components';
import { AbstractStepPresenter } from '@presenters/checkout/AbstractStepPresenter';

export class OrderStepPresenter extends AbstractStepPresenter {
	constructor(private model: QuoteModel, private view: OrderStepPopupView, private validator: CheckoutStepValidator) {
		super();
	}

	public init(): void {
		events.on('checkout:payment:set', this.handleSetPayment.bind(this));
		events.on('checkout:address:set', this.handleSetAddress.bind(this));
		events.on('quote:update', this.validateView.bind(this));
	}

	public process(): void {
		const quote: Quote = this.model.getQuote();
		this.view.render(quote);
		this.view.open();
		this.validateView();
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

	private validateView(): void {
		if (this.isActive) {
			this.view.updateNextButtonState(this.validator.isValid());
			this.view.showErrors(this.validator.getErrors());
		}
	}

	public complete(): void {
		this.view.close();
	}
}
