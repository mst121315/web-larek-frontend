import { Quote } from '@types';
import { Storage } from '@models/Storage';
import { events } from '@components';

export class QuoteModel {

	constructor(private storage: Storage) {
	}

	public getQuote(): Quote {
		return this.storage.getQuote();
	}

	public setQuote(quote: Quote): void {
		this.storage.setQuote(quote);
		events.emit('quote:update');
	}

	public clearQuote(): void {
		this.storage.clearQuote();
		events.emit('quote:clear');
	}


}
