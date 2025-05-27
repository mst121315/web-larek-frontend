interface IProduct {
    id: string;
    image: string;
    category: string;
    title: string;
    description: string;
    price: number | null;
}

class Cart {
  items: IProduct[];
  subtotal(): number;
}

type PaymentMethod = 'cash' | 'card';

class Quote {
  cart: Cart;
  payment: PaymentMethod;
  adress: string;
  email: string;
  phone: string;
}

interface IOrder {
  id: string;
  total: number;
}

abstract class ModalView {
  open(): void;
  close(): void;
}

class ProductPreviewView extends ModalView {
  render(IProduct): void
  onBuyClick(): void
}

class PaymantAdressView extends ModalView {
  onClickPaymentMethod(): void
  isValid(): boolean
  onClick: void
}

class ContactView extends ModalView {
  isValid(): boolean
  onClickPayment: void
}

class FinishView extends ModalView {
  render(TotalPrice): number;
  onClickFinish: void
}

class WebLarek extends API {
  constructor(baseUrl: string) {
  }

  productList(): Product[]
  productItem(id: string): Product
  order(Quote): Order
}