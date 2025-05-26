interface IProduct {
    id: string;
    image: string;
    category: string;
    title: string;
    description: string;
    price: number;
}

class product implements IProduct {
    id: string;
    image: string;
    category: string;
    title: string;
    description: string;
    price: number;

    constructor(id: string, image: string, category: string, title: string, description: string, price: number) {
      this.id = id
      this.image = image
      this.category = category
      this.title = title
      this.description = description
      this.price = price
    }
}

type PaymentMethod = 'cash' | 'card';

interface IOrder {
  items: product[];
  payment: PaymentMethod;
  adress: string;
  email: string;
  phone: string;
}

interface Cart {
    items: product[];
    totalPrice: number;
}
