import { QuoteModel } from '@models';
import { Quote } from '@types';
import { AbstractValidator } from '@components/checkout/validators/AbstractValidator';

export class OrderValidator extends AbstractValidator {
	constructor(private model: QuoteModel) {
		super();
	}

	public isValid(): boolean {
		const quote: Quote = this.model.getQuote();
		this.errors = [];
		if (!quote.payment || quote.payment.length === 0) {
			this.errors.push('Необходимо указать способ оплаты.');
		}
		if (!quote.address || quote.address.length === 0) {
			this.errors.push('Необходимо указать адрес доставки.');
		}

		return quote.payment?.length > 0 && quote.address?.length > 0;
	}
}
