import { Cart, Quote } from '@types';
import { settings } from '../utils/constants';

export class Storage {
	public setCart(cart: Cart): void {
		const quote: Quote = this.getQuote();
		quote.cart = cart;
		this.setQuote(quote);
	}

	public getCart(): Cart {
		const quote = this.getQuote();
		return quote.cart;
	}

	public setQuote(quote: Quote): void {
		localStorage.setItem(settings.storage_quote_key, JSON.stringify(quote));
	}

	public clearQuote(): void {
		localStorage.removeItem(settings.storage_quote_key);
	}

	public getQuote(): Quote {
		const raw = localStorage.getItem(settings.storage_quote_key);
		if (raw) {
			try {
				return JSON.parse(raw) as Quote;
			} catch {
				console.error('Failed to parse quote from localStorage');
				localStorage.removeItem(settings.storage_quote_key);
			}
		}
		return {
			cart: {
				items: []
			},
		};
	}
}
