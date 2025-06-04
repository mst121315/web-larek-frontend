import { QuoteModel } from '@models';
import { Quote, CheckoutStepValidator } from '@types';

export class CartValidator implements CheckoutStepValidator {
	constructor(private model: QuoteModel) {
	}

	public isValid(): boolean {
		const quote: Quote = this.model.getQuote();

		return quote.cart.items.length > 0 && quote.cart.subtotal > 0;
	}
}
