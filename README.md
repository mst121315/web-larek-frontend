# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```



1. Модели

Product - описаниe товара: id товара, изображение, категорию, название, описание, цену
Поля
    id: string;
    image: string;
    category: string;
    title: string;
    description: string;
    price: number;


Cart - корзина: массив товаров Product, subtotal метод расчета общую стоимость товаров 
  Поля
    items: Product[];   
    subtotal(): number;


Quote - описания заказа: массив продуктов, способ отплаты, адрес доставки, email, телефон. Валидирует данные пользовотеля
Поля
  cart: Cart;  Корзина
  payment: string;
  address: string;
  email: string;
  phone: string;
  validatePayment(): boolean |string 
  validateShipping(): boolean |string 

Order
  id: string
  total: number


2. Представления

 ModalView базовое модальное окно
 методы: 
 open(): void
 close(): void


ProductPreviewView показывает детальную информацию о товаре в модальном окне. Наследуется от ModalView
методы: 
render(IProduct): void    отображение одного товара
onBuyClick()   добавить товар в корзину


CartView корзина показывает товары, добавленные в корзину, общую стоимость, кнопку удаления товара, кнопку оформления. Наследуется от ModalView
методы: 
render(IProduct[]): void     отображение всех довабленных товаров
totalPrice: number;     подсчет общей стоимости товаров 
onDelete(Product): void    удалить товар из корзины
onClick: void  оформить корзину

PaymantAdressView окно выбора способа оплаты и адреса доставки. Валидация адреса доставки. Наследуется от ModalView
методы
onClickPaymentMethod(): void       выбор способа оплаты
isValid(): boolean   вылидация введенного пользоватлем адреса
onClick: void  кнопка далее

ContactView окно ввода контактных данных клиента. Валидация контактных данных клиента. Кнопка оплаты. Наследуется от ModalView
методы
isValid(): boolean   вылидация ввода контактных данных клиента
onClickPayment: void

FinishView окно успешного оформления заказа. Информация о списании средств. Кнопка возврата на главную страницу. Наследуется от ModalView
методы 
render(TotalPrice): number; вывоб списаннай суммы
onClickFinish: void  кнопка возврата на главную страницу


3. API - базовый класс для работы с API
WebLarek  экстендит API
    
    