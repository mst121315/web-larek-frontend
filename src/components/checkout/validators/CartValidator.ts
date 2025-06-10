import { QuoteModel } from '@models';
import { Quote } from '@types';
import { AbstractValidator } from './AbstractValidator';

export class CartValidator extends AbstractValidator {
	constructor(private model: QuoteModel) {
		super()
	}

	public isValid(): boolean {
		const quote: Quote = this.model.getQuote();

		return quote.cart.items.length > 0 && quote.cart.subtotal > 0;
	}
}
