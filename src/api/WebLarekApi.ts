import {Api, ApiListResponse} from '@components';
import { Product, OrderRequest, Order } from '@types';

export class WebLarekApi extends Api {

	public getProductList(): Promise<Product[]> {
		return this.get('/product')
			.then((res) => (res as ApiListResponse<Product>).items);
	}

	public getProductById(id: string): Promise<Product> {
		return this.get(`/product/${id}`) as Promise<Product>;
	}

	public createOrder(orderRequest: OrderRequest): Promise<Order> {
		return this.post('/order', orderRequest) as Promise<Order>;
	}
}
