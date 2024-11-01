import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { CDN_URL, API_URL } from './utils/constants';
import { LarekApi } from './components/LarekApi';
import { LarekModel } from './components/LarekModel';
import { BasketModel } from './components/BasketModel';
import { OrderModel } from './components/OrderModel';
import { CardItem } from './components/CardItem';
import { CardPreviewItem } from './components/CardPreviewItem';
import { CardBasketItem } from './components/CardBasketItem';
import { Order } from './components/Order';
import { Contacts } from './components/Contacts';
import { Page } from './components/Page';
import { Basket } from './components/Basket';
import { ModalContainer } from './components/ModalContainer';
import { cloneTemplate } from './utils/utils';
import { IOrderForm, IContactsForm } from './types';
import { Success } from './components/Success';

const events = new EventEmitter();

const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement; //шаблон просмотра карточки
const successTemplate = document.querySelector('#success') as HTMLTemplateElement; //шаблон успех
const cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement; //шаблон карточка товара в корзине
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement; //шаблон корзина
const orderFormTemplate = document.querySelector('#order') as HTMLTemplateElement; //шаблон форма заказа
const contactsFormTemplate = document.querySelector('#contacts') as HTMLTemplateElement; //шаблон форма контакты

const api = new LarekApi(CDN_URL, API_URL);
const page = new Page(document.querySelector('.page__wrapper') as HTMLDivElement,events);
const modalContainer = new ModalContainer(document.querySelector('#modal-container') as HTMLTemplateElement,events); //универсальный контейнер
const order = new Order(cloneTemplate(orderFormTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsFormTemplate), events);

const cardPreview = new CardPreviewItem(cloneTemplate(cardPreviewTemplate),events);
const basket = new Basket(cloneTemplate(basketTemplate), events);

const itemTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement; //шаблон карточки

const larekModel = new LarekModel(events);
const basketModel = new BasketModel(events);
const orderModel = new OrderModel(events);

// Загрузить карточки с сервера в модель
api.getProducts()
	.then((data) => {
		larekModel.setItems(data);
	})
	.catch((err) => console.log(err));

// Открыть форму Заказ
events.on('order:open', () => {
	modalContainer.close();
	modalContainer.render({
		content: order.render({
			address: '',
			payment: '',
			valid: false,
			errors: [],
		}),
	});
});

// Открыть форму Контакты
events.on('order:submit', () => {
	modalContainer.close();
	modalContainer.render({
		content: contacts.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
});

// Отправить заказ на сервер
events.on('contacts:submit', () => {
	orderModel.setItems(basketModel.getIdItems());

	api
		.setOrder(orderModel.order, basketModel.getTotal())
		.then((result) => {
			const success = new Success(cloneTemplate(successTemplate), {
				onClick: () => {
					modalContainer.close();
					basketModel.clearBasket();
				},
			});
			modalContainer.render({
				content: success.render({ total: result.total }),
			});
		})
		.catch((err) => {
			console.error(err);
		});
});

// Валидация полей формы Заказ
events.on(
	'order:change',
	(event: { field: keyof IOrderForm; value: string }) => {
		orderModel.setOrderField(event.field, event.value);
	}
);

// Валидация полей формы Контакты
events.on(
	'contacts:change',
	(event: { field: keyof IContactsForm; value: string }) => {
		orderModel.setContactsField(event.field, event.value);
	}
);

// Ответ из OrderModel с результатом валидации формы
events.on(
	'formErrors:change',
	(errors: Partial<IOrderForm & IContactsForm>) => {
		const { address, payment, phone, email } = errors;
		order.valid = !address && !payment;
		order.errors = Object.values({ payment, address })
			.filter((i) => !!i)
			.join('; ');
		contacts.valid = !phone && !email;
		contacts.errors = Object.values({ email, phone })
			.filter((i) => !!i)
			.join('; ');
	}
);

// Изменим кнопки вариантов оплаты
events.on('order-model:change', () => {
	order.payment = orderModel.order.payment;
});

// Произошли изменения в модели данных карточек
events.on('items:changed', () => {
	const itemsHTMLArray = larekModel
		.getItems()
		.map((item) =>
			new CardItem(cloneTemplate(itemTemplate), events).render(item)
		);
	page.render({ cardList: itemsHTMLArray });
});

// Удалить товар из корзины
events.on('card-basket-item:remove', (event: { id: string }) => {
	basketModel.deleteItem(event.id);
});

//Добавить карточку в корзину
events.on('card-basket-item:add', (event: { id: string }) => {
	basketModel.addItem(larekModel.getItem(event.id));
	modalContainer.close();
});

// Метод рендеринга карточек в корзине
function renderBasket() {
	if (basketModel.getItems().length > 0) {
		const itemsHTMLArray = basketModel.getItems().map((item, index) => {
			const cardObj = {
				id: item.id,
				index: index + 1,
				title: item.title,
				price: item.price,
			};
			const cardBasket = new CardBasketItem(
				cloneTemplate(cardBasketTemplate),
				events
			);
			return cardBasket.render(cardObj);
		});

		basket.basketList = itemsHTMLArray;
		basket.total = basketModel.getTotal();
		page.counter = basketModel.getCount();
	} else {
		const empty: HTMLElement[] = [];
		basket.basketList = empty;
		basket.total = 0;
		page.counter = 0;
	}
}

// Состав товаров в корзине изменился
events.on('basket:change', () => {
	renderBasket();
});

// Открыть корзину
events.on('basket:open', () => {
	renderBasket();
	modalContainer.render({
		content: basket.render(),
	});
});

// Открыть карточку
events.on('card-item:open', ({ id }: { id: string }) => {
	const cardObj = {
		...larekModel.getItem(id),
		canBuy: basketModel.isItemInBasket(id),
	};
	modalContainer.render({ content: cardPreview.render(cardObj) });
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});
