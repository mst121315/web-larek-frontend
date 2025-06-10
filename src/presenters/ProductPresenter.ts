import { ProductModel } from '@models';
import { ProductGridView, ProductGridItemView } from '@components';

export class ProductPresenter {
	constructor(private model: ProductModel, private view: ProductGridView, private itemView: ProductGridItemView) {}

	public async init(): Promise<void> {
		try {
			const products = await this.model.getProductList();
			const cards: HTMLElement[] = [];
			products.forEach((product) => {
				const card = this.itemView.render(product);
				cards.push(card);
			});
			this.view.render(cards);
		} catch (error) {
			console.error(error);
		}
	}
}
