import { QuoteModel, OrderModel } from '@models';
import { CheckoutStepPresenter } from '@types';
import { SuccessStepPopupView } from '@components';

export class SuccessStepPresenter implements CheckoutStepPresenter {
	constructor(private quoteModel: QuoteModel, private orderModel: OrderModel, private view: SuccessStepPopupView) {}

	public init(): void {
	}

	public async process(): Promise<void> {
		this.view.render();
		this.view.open();
		const quote = this.quoteModel.getQuote();
		try {
			const order = await this.orderModel.createOrder(quote);
			this.view.fillOrderData(order);
			this.quoteModel.clearQuote();
		} catch (error) {
			console.error(error);
		}
	}

	public complete (): void {
		this.view.close();
	}
}
