import { QuoteModel } from '@models';
import { CheckoutStepPresenter } from '@types';
import { events } from '@components';

export class CheckoutPresenter {
	private currentIndex = 0;

	constructor(private model: QuoteModel, private steps: CheckoutStepPresenter[]) {}

	public init(): void {
		events.on('checkout:start', this.handleStartCheckout.bind(this));
		events.on('checkout:next', this.handleNextStep.bind(this));
		this.steps.forEach(step => step.init());
	}

	private handleStartCheckout(): void {
		this.currentIndex = 0;
		this.processStep();
	}

	private handleNextStep(): void {
		const presenter = this.steps[this.currentIndex];
		presenter.complete();
		if (this.currentIndex < this.steps.length - 1) {
			this.currentIndex++;
			this.processStep();
		} else {
			console.log('Unexpected Step');
		}
	}

	private processStep(): void {
		const presenter = this.steps[this.currentIndex];
		this.setActiveStep(presenter);
		presenter.process();
	}

	private setActiveStep(presenter: CheckoutStepPresenter): void {
		this.steps.forEach(step => step.setIsActive(false));
		presenter.setIsActive(true);
	}
}
