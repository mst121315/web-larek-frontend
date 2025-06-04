import { Product } from '../../types';
import { settings } from '../constants';
import { bem } from '../utils';

export function getProductClass(product: Product): string {
	const categoryClass = (settings.categoryClassMap as Record<string, string>)[product.category] ?? 'other';

	return bem('card', 'category_'+categoryClass).name;
}
