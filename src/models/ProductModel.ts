import { Product } from '@types';
import { WebLarekApi } from '../api/WebLarekApi';

export class ProductModel {
	constructor(private api: WebLarekApi) {}

	public async getProductList(): Promise<Product[]> {
		const products = await this.api.getProductList();
		return products.map(this.normalizeProduct);
	}

	public async getProductById(id: string): Promise<Product> {
		const product = await this.api.getProductById(id);
		return this.normalizeProduct(product);
	}

	private normalizeProduct(product: Product): Product {
		return {
			...product,
			price: product.price ?? 0,
		};
	}
}