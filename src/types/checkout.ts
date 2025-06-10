export interface CheckoutStepPresenter {
	init(): void;
	process(): void;
	complete(): void;
	setIsActive(active: boolean): void
}

export interface CheckoutStepValidator {
	isValid(): boolean;
	getErrors(): string[];
}
