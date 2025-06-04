export interface CheckoutStepPresenter {
	init(): void;
	process(): void;
	complete(): void;
}

export interface CheckoutStepValidator {
	isValid(): boolean;
}
