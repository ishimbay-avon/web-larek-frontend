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
- src/styles/styles.scss — корневой файл стилей
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

# -==Общее описание проекта==-
 С сервера загружаются и отображаются на странице карточки товаров.\
 Карточка товара открывается в отдельно окне при нажатии на неё и отображается детальная информация о товаре.\
 Товар можно положить в корзину.\
 При нажатии на иконку козины, открывается окно корзины, в котором содержится список добавленных товаров.\
 Товары можно удалить из корзины.\
 Через корзину можно оформить заказ.\

В проекте используется архитектурный паттерн MVP.\
Исходынй код проектра разделен на:
1. Model (Модель), задача которой, хранить и модифицировать исходные данные
2. View (Отображение), задача которой, отображать данные на странице в браузере
3. Presenter (Презентер), представляет основную логику приложения, связывает данные моделей и отображения.

Также в проекте используется СОП, через брокер сообщений EventEmitter. Благодаря брокеру можно регистрировать события и вызывать их в нужный момент,
также можно преедавать данные в событии.

# -==Данные, используемые в приложении==-

## Карточка товара
```
interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}
```

## Заказ
```
interface IOrderForm {
	address: string;
	errors: string;
}
```
## Контакты
```
interface IContactsForm {
	email: string;
	phone: string;
}
```
## Модальное окно
```
interface IModalContainerData {
	content: HTMLElement;
}
```
## Корзина
```
interface IBasket {
    basketList: HTMLElement[];
    total: number;
}
```
## Страница
```
interface IPage {
    cardList: HTMLElement[];
}
```
# -==Интерфейс API-клиента==-

## LarekApi
Класс LarekApi унаследован от base\api
Задача класс получить данные с сервера и вернуть их в JSON
- `getProducts()` - метод возвращает полученные с сервера данные в JSON
- `setOrder()` - метод отправляет заказ на сервер

# -==Интерфейсы модели данных (Model)==-

## LarekModel
Класс хранит список товаров, полученных с сервера.

Поля:
    items: IProductItem[] - массив содержащий информацию о товарах
    events: IEvents - объект, используемый для инициации событий, связанных с изменением данных в модели

Методы:
    Конструктор - передает объект класса EventEmitter
    addItem(item: IProductItem) - добавить товар в массив
    deleteItem(id: string) - удалить товар из массива
    getItems(): IProductItem[] - вернуть все товары
    getItem(id: string): IProductItem - вернуть товар по id
    getTotal() - вернуть количество товаров в массиве
    setItems(items: IProductItem[]) - добавить список товаров в массив

## BasketModel
Класс хранит список товаров, добавленных в корзину.

Поля:
    items: IProductItem[] - массив содержащий информацию о добавленных товарах
    events: IEvents - объект, используемый для инициации событий, связанных с изменением данных в модели

Методы:
    Конструктор - передает объект класса EventEmitter
    addItem(item: IProductItem) - добавить товар в массив
    getItems(): IProductItem[] - вернуть все товары
    deleteItem(id: string) - удалить товар из массива
    getTotal() - вернуть итоговую сумму товаров в массиве
    isItemInBasket(id: string) - проверить содержится ли товар в корзине
    getTotal() - вернуть количество товаров в массиве
    changed() - инициация события emit('basket:change')

## OrderModel
Класс хранит информацию о заказе

Поля:    
    events: IEvents - объект, используемый для инициации событий, связанных с изменением данных в модели
    payment: string - способ оплаты
    address: string - адрес
    errors: string - текст ошибки валидации
    phone: string - телефон
    email: string - почта
    items: string[] - список товаров

Методы:
    setOrderField(field: string, value: string) - валидация полей формы order и contacts
    setOrder() - отправка заказа на сервер

# -==Интерфейсы отображений (View)==-

## CardItem
Класс отвечает за отображение карточки на странице. Конструктор класса получает шаблон HTML-разметки отображаемой карточки.
Класс унаследован от базового класса Component.

Поля:
    элементы разметки шаблона карточки.
    events: IEvents - объект, используемый для инициации событий, связанных с изменением данных в модели

Методы:
    конструктор - содержит инициирует поля класса, отвечающие за разметку, регистрирует события для активных элементов (кнопки)
    set category(value: string) - устанавливает категорию карточки и цветовое оформление
    set id(value: string) - установить id карточки
	get id(): string - вернуть id карточки
    set title(value: string) - установить заголовок	
	set price(value: number) - установить цену
    set image(value: string) - установить картинку


## CardBasketItem
Класс отвечает за отображение карточки в корзине. Конструктор класса получает шаблон HTML-разметки отображаемой карточки.
Класс унаследован от базового класса Component.

Поля:
    элементы разметки шаблона карточки.
    events: IEvents - объект, используемый для инициации событий, связанных с изменением данных в модели

Методы:
    конструктор - содержит инициирует поля класса, отвечающие за разметку, регистрирует события для активных элементов (кнопки)
    set itemIndex(value: string) - устанавливае порядковый номер товара в корзине
    render(data: {id:string, index:number,title:string,price:number}) - переопределение метода базового класса Component, возвращает заполненную данными карточку.

## CardPreviewItem
Класс отвечает за отображение карточки с детализацией в отдельном модальном окне. Конструктор класса получает шаблон HTML-разметки отображаемой карточки.
Класс унаследован от базового класса Component.

Поля:
    элементы разметки шаблона карточки.
    events: IEvents - объект, используемый для инициации событий, связанных с изменением данных в модели

Методы:
    конструктор - содержит инициирует поля класса, отвечающие за разметку, регистрирует события для активных элементов (кнопки)
    set description(value: string) - устанавливае описание товара
    set category(value: string) - устанавливает категорию карточки и цветовое оформление
	set canBuy(status: boolean) - проверка на повторное добавление товара в корзину

## Page
Класс отвечает за отображение карточек на странице (.gallery). Конструктор класса получает шаблон HTML-разметки страницы (.page__wrapper).
Класс унаследован от базового класса Component.

Поля:
    элементы разметки шаблона карточки.
    events: IEvents - объект, используемый для инициации событий, связанных с изменением данных в модели

Методы:
    конструктор - содержит инициирует поля класса, отвечающие за разметку, регистрирует события для активных элементов (кнопки)
    set cardList(items: HTMLElement[]) - сохраняет список товаров в массив
    set counter(value: number) - отображает количество товаров в корзине
    set locked(value: boolean) - блокируем прокрутку страницы, при открытии модального окна

## Basket
Класс отвечает за отображение карточек товаров добавленных в корзину. Конструктор класса получает шаблон HTML-разметки отображаемой корзины.
Класс унаследован от базового класса Component.

Поля:
    элементы разметки шаблона карточки.
    events: IEvents - объект, используемый для инициации событий, связанных с изменением данных в модели

Методы:
    конструктор - содержит инициирует поля класса, отвечающие за разметку, регистрирует события для активных элементов (кнопки)
    set basketList(items: HTMLElement[]) - сохраняет список карточек в массив
    set selected(status: boolean) - активность кнопки Оформить
    set total(total: number) - отображение итоговой суммы товаров в корзине


# ModalContainer
Класс отвечает за отображение модального окна. Модальное окно общее для CardPreviewItem, Basket, Order, Contacts, Success. 
Класс унаследован от базового класса Component.

Так же предоставляет методы `open` и `close` для управления отображением модального окна. Устанавливает слушатели на клавиатуру, для закрытия модального окна по Esc, на клик в оверлей и кнопку-крестик для закрытия попапа.  

Поля:
    элементы разметки шаблона карточки.
    events: IEvents - объект, используемый для инициации событий, связанных с изменением данных в модели

Методы:
    конструктор - содержит инициирует поля класса, отвечающие за разметку, регистрирует события для активных элементов (кнопки)
    set content(value: HTMLElement) - наполняет модальное окно разметкой
    open() - делает окно видимым
    close() - делает окно невидимым
    render(data: IModalContainerData): HTMLElement - переопределение метода базового класса Component


# Order
Класс отвечает за отображение модального окна формы заказа. Содержит тип оплаты и адрес. Получает информацию о валидации.

Поля класса:
    элементы разметки шаблона карточки.
    events: IEvents - объект, используемый для инициации событий, связанных с изменением данных в модели

Методы:
    onInputChange(field: string, value: string) - инициирует событие при изменении поля адрес
    set address(value: string)  - изменяет поле адреса
    set setPayment(value: string) - изменяет тип оплаты
    set errors(value: string) - изменяет поле ошибки
    set valid(value: boolean)  - делает кнопку активной/неактивной


# Contacts
Класс отвечает за отображение модального окна формы контактов. Содержит телефон и почту. Получает информацию о валидации.

Поля класса:
    элементы разметки шаблона карточки.
    events: IEvents - объект, используемый для инициации событий, связанных с изменением данных в модели

Методы:
    onInputChange(field: string, value: string) - инициирует событие при изменении поля адрес    
    set email(value: string)  - изменяет поле почта
    set phone(value: string)  - изменяет поле телефон
    set errors(value: string) - изменяет поле ошибки
    set valid(value: boolean) - делает кнопку активной/неактивной
    setOrder() - инициирует событие отправки заказа


# --=Интерфейсы базовых классов==-

В проекте имеется базовый класс api реализующий методы выполнения запросов к серверу.
В базовом классе определены два важных метода get и post отвечающие за прием и отправку данных на сервер.

В проекте имеется базовый класс events реализующий модель СОП и содержащий класс EventEmitter.
Объект этого класса будет использоваться повсеместно в требуемых местах, где следует инициировать событие emit и установить обработчик на это событие событие on.

В проекте имеется базовый класс Component отвечающий за отображение комопнентов на странице.
От данного класса будут унаследованы классы отображения View.


# -==Перечисление событий и их интерфейсы==-

order:open - открыть форму заказа
contacts:open - открыть форму контакты
order:change - изменение поей заказа
contacts:change - изменение полей контактов
formErrors:change - валидация
items:changed - изменение модели данных LarkModel
card-basket-item:remove - удалить карточку из корзины
card-basket-item:add - добавить карточку в корзину
basket:change - изменения модели данных BasketModel
basket:open - открытие корзины в модальном окне
card-item:open - открытие карточки в модально окне
modal:open - блокировка прокрутки страницы, если открыта модалка
modal:close - разблокировка прокрутки страницы, если открыта модалка
success:open - открыть форму после успешной отправки заказа
success:close - закрыть форму

# -==Взаимодействие компонентов Презентер==-
За роль презентера отвечает код, содержащийся в файле index.ts.
В начале файла инициализируются перменные хранящие шаблоны HTML-разметки страницы
Инициализируются объекты моделей карточек, корзины и заказа.
В данном файле выполняется обращение к серверу, для получения карточек и отправки заказа.
Определены все обработчики событий брокера EventEmitter.