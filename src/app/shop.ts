import { WebLarekApi } from '../api/WebLarekApi';
import { API_URL, settings } from '../utils/constants';
import { ProductModel, Storage, CartModel, QuoteModel, OrderModel } from '@models';
import { ProductGridView, ProductPopupView, CartIconView,
	OrderStepPopupView, ContactsStepPopupView, OrderValidator, ContactsValidator,
	SuccessStepPopupView, CartValidator, CartStepPopupView
} from '@components';
import { ProductPresenter, CartPresenter, CartStepPresenter,
	ProductPopupPresenter, CheckoutPresenter, OrderStepPresenter,
	ContactsStepPresenter, SuccessStepPresenter, } from '@presenters';

const selectors = settings.selectors;

const api = new WebLarekApi(API_URL);
const productModel = new ProductModel(api);
const productGridView = new ProductGridView(selectors.productGridContainer, selectors.productGridItemTemplate);
const productPresenter = new ProductPresenter(productModel, productGridView);
productPresenter.init();

const productPopupView = new ProductPopupView(selectors.modalContainer, selectors.productPopupViewTemplate);
const productPopupPresenter = new ProductPopupPresenter(productModel, productPopupView);
productPopupPresenter.init();

const storage = new Storage();
const cartModel = new CartModel(storage);
const cartIconView = new CartIconView(selectors.cartIcon);
const cartPresenter = new CartPresenter(cartModel, cartIconView);
cartPresenter.init();

const quoteModel = new QuoteModel(storage);

const cartValidator = new CartValidator(quoteModel);
const cartStepPopupView = new CartStepPopupView(selectors.modalContainer, cartValidator, selectors.cartPopupTemplate, selectors.cartPopupItemTemplate);
const cartStepPresenter = new CartStepPresenter(cartModel, cartStepPopupView);

const orderValidator = new OrderValidator(quoteModel);
const orderStepPopupView = new OrderStepPopupView(selectors.modalContainer, orderValidator,selectors.checkoutOrderStepTemplate);
const orderStepPresenter = new OrderStepPresenter(quoteModel, orderStepPopupView);

const contactsValidator = new ContactsValidator(quoteModel);
const contactsStepPopupView = new ContactsStepPopupView(selectors.modalContainer, contactsValidator,selectors.checkoutContactsStepTemplate);
const contactsStepPresenter = new ContactsStepPresenter(quoteModel, contactsStepPopupView);

const orderModel = new OrderModel(api);
const successStepPopupView = new SuccessStepPopupView(selectors.modalContainer,selectors.checkoutSuccessStepTemplate);
const successStepPresenter = new SuccessStepPresenter(quoteModel, orderModel, successStepPopupView);

const checkoutPresenter = new CheckoutPresenter(quoteModel, [cartStepPresenter, orderStepPresenter, contactsStepPresenter, successStepPresenter]);
checkoutPresenter.init();



