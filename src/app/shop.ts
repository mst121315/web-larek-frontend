import { WebLarekApi } from '../api/WebLarekApi';
import { API_URL, settings } from '../utils/constants';
import { ProductModel, Storage, CartModel, QuoteModel, OrderModel } from '@models';
import { ProductGridView, ProductPopupView, CartIconView,
	OrderStepPopupView, ContactsStepPopupView, OrderValidator, ContactsValidator,
	SuccessStepPopupView, CartValidator, CartStepPopupView, ProductGridItemView, CartItemView
} from '@components';
import { ProductPresenter, CartPresenter, CartStepPresenter,
	ProductPopupPresenter, CheckoutPresenter, OrderStepPresenter,
	ContactsStepPresenter, SuccessStepPresenter} from '@presenters';

const selectors = settings.selectors;

const storage = new Storage();
const cartModel = new CartModel(storage);

const api = new WebLarekApi(API_URL);
const productModel = new ProductModel(api);
const productGridView = new ProductGridView(selectors.productGridContainer);
const productGridItemView = new ProductGridItemView(selectors.productGridItemTemplate);
const productPresenter = new ProductPresenter(productModel, productGridView, productGridItemView);
productPresenter.init();

const productPopupView = new ProductPopupView(selectors.modalContainer, selectors.productPopupViewTemplate, cartModel);
const productPopupPresenter = new ProductPopupPresenter(productModel, productPopupView);
productPopupPresenter.init();

const cartIconView = new CartIconView(selectors.cartIcon);
const cartPresenter = new CartPresenter(cartModel, cartIconView);
cartPresenter.init();

const quoteModel = new QuoteModel(storage);

const cartValidator = new CartValidator(quoteModel);
const cartItemView = new CartItemView(selectors.cartPopupItemTemplate);
const cartStepPopupView = new CartStepPopupView(selectors.modalContainer, selectors.cartPopupTemplate);
const cartStepPresenter = new CartStepPresenter(cartModel, cartStepPopupView, cartItemView, cartValidator);

const orderValidator = new OrderValidator(quoteModel);
const orderStepPopupView = new OrderStepPopupView(selectors.modalContainer,  selectors.checkoutOrderStepTemplate);
const orderStepPresenter = new OrderStepPresenter(quoteModel, orderStepPopupView, orderValidator);

const contactsValidator = new ContactsValidator(quoteModel);
const contactsStepPopupView = new ContactsStepPopupView(selectors.modalContainer, selectors.checkoutContactsStepTemplate);
const contactsStepPresenter = new ContactsStepPresenter(quoteModel, contactsStepPopupView, contactsValidator);

const orderModel = new OrderModel(api);
const successStepPopupView = new SuccessStepPopupView(selectors.modalContainer,selectors.checkoutSuccessStepTemplate);
const successStepPresenter = new SuccessStepPresenter(quoteModel, orderModel, successStepPopupView);

const checkoutPresenter = new CheckoutPresenter(quoteModel, [cartStepPresenter, orderStepPresenter, contactsStepPresenter, successStepPresenter]);
checkoutPresenter.init();



