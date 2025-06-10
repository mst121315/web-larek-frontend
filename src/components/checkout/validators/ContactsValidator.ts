import { QuoteModel } from '@models';
import { Quote } from '@types';
import { AbstractValidator } from './AbstractValidator';

export class ContactsValidator extends AbstractValidator {
	private fields: HTMLElement[] = [];

	constructor(private model: QuoteModel) {
		super();
	}

	public setFields(fields: HTMLElement[]): void {
		this.fields = fields;
	}

	public isValid(): boolean {
		let isValid = true;
		const quote: Quote = this.model.getQuote();
		this.errors = [];

		this.fields.forEach((field: HTMLElement) => {
			if (!(field as HTMLInputElement).checkValidity()) {
				isValid = false;
			}
		});
		if(!isValid) {
			this.errors.push("Форма содержит ошибки");
		}
		if (!quote.email || !quote.email.length) {
			this.errors.push("Необходимо указать email.");
		}
		if (!quote.phone || !quote.phone.length) {
			this.errors.push("Необходимо указать телефон.");
		}
		if (isValid) {
			isValid = quote.email?.length > 0 && quote.phone?.length > 0;
		}

		return isValid;
	}
}
