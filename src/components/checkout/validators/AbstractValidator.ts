import { CheckoutStepValidator } from '@types';

export abstract class AbstractValidator implements CheckoutStepValidator {
	protected errors: string[] = [];

	abstract isValid(): boolean;

	public getErrors(): string[] {
		return this.errors;
	}
}
