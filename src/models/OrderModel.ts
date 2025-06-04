import { Order, OrderRequest, Quote } from '@types';
import { QuoteModel } from '@models/QuoteModel';
import { WebLarekApi } from '../api/WebLarekApi';

export class OrderModel {
	constructor(private api: WebLarekApi) {}

	public async createOrder(quote: Quote): Promise<Order> {
		const orderRequest = this.quoteToOrderRequest(quote);
		return await this.api.createOrder(orderRequest);
	}

	private quoteToOrderRequest(quote: Quote): OrderRequest {
		return {
			items: quote.cart.items.map((item) => item.id),
			total: quote.cart.subtotal ?? 0,
			payment: quote.payment,
			address: quote.address,
			email: quote.email,
			phone: quote.phone,
		};
	}
}
