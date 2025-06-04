import { QuoteModel } from '@models';
import { Quote, CheckoutStepValidator } from '@types';

export class ContactsValidator implements CheckoutStepValidator{
	private fields: HTMLInputElement[] = [];

	constructor(private model: QuoteModel) {
	}

	public setFields(fields: HTMLInputElement[]): void {
		this.fields = fields;
	}

	public isValid(): boolean {
		let isValid = true;
		const quote: Quote = this.model.getQuote();

		this.fields.forEach((field: HTMLInputElement) => {
			if (!field.checkValidity()) {
				isValid = false;
			}
		});
		if (isValid) {
			isValid = quote.email?.length > 0 && quote.phone?.length > 0;
		}

		return isValid;
	}
}
