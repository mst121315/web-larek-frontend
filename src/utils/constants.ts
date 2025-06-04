export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
	selectors: {
		productGridContainer: 'main.gallery',
		modalContainer: '#modal-container',
		cartIcon: 'button.header__basket',
		productGridItemTemplate: '#card-catalog',
		productPopupViewTemplate: '#card-preview',
		cartPopupTemplate: '#basket',
		cartPopupItemTemplate: '#card-basket',
		checkoutOrderStepTemplate: '#order',
		checkoutContactsStepTemplate: "#contacts",
		checkoutSuccessStepTemplate: "#success",
	},
	storage_quote_key: 'weblarek-quote',
	currency: 'синапсов',
	categoryClassMap: {
		'софт-скил': 'soft',
		'хард-скил': 'hard',
		'другое': 'other',
		'дополнительное': 'additional',
		'кнопка': 'button',
	},
	orderProcessingText: 'Обработка заказа...',
	orderSuccessText: 'Заказ оформлен',
	orderAmountText: 'Списано %1 %2',
};
