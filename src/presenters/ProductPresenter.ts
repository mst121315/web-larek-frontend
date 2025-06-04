import { ProductModel } from '@models';
import { ProductGridView } from '@components';

export class ProductPresenter {
	constructor(private model: ProductModel, private view: ProductGridView) {}

	public async init(): Promise<void> {
		try {
			const products = await this.model.getProductList();
			this.view.render(products);
		} catch (error) {
			console.error(error);
		}
	}
}
