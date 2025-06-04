import { QuoteModel } from '@models';
import { Quote, CheckoutStepValidator } from '@types';

export class OrderValidator implements CheckoutStepValidator {
	constructor(private model: QuoteModel) {
	}

	public isValid(): boolean {
		const quote: Quote = this.model.getQuote();

		return quote.payment?.length > 0 && quote.address?.length > 0;
	}
}
