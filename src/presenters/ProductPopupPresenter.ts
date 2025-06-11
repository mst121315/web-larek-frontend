import { ProductModel, CartModel } from '@models';
import { Product } from '@types';
import { ProductPopupView, events } from '@components';


export class ProductPopupPresenter {
	constructor(private model: ProductModel, private view: ProductPopupView, private cartModel: CartModel) {}

	public init(): void {
		events.on('product:view', this.handleProductView.bind(this));
	}

	public async handleProductView(data: { id: string }): Promise<void> {
		try {
			this.view.render();
			this.view.open();
			const product: Product = await this.model.getProductById(data.id);

			const isInCart = this.cartModel.isInCard(product);
			const isSalable = product.price > 0 && !isInCart;
			this.view.fillProductData(product, isSalable);
		} catch (error) {
			console.error(error);
		}
	}
}
