import { CheckoutStepPresenter } from '@types';

export abstract class AbstractStepPresenter implements CheckoutStepPresenter {
	protected isActive = false;

	public setIsActive(active: boolean): void {
		this.isActive = active;
	}

	public abstract complete(): void;

	public abstract init(): void;

	public abstract process(): void;
}
