//# -==Данные, используемые в приложении==-

interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

interface IOrderForm {
	address: string;
	errors: string;
}

interface IContactsForm {
	email: string;
	phone: string;
}

interface IModalContainerData {
	content: HTMLElement;
}

interface IBasket {
    basketList: HTMLElement[];
    total: number;
}

interface IPage {
    cardList: HTMLElement[];
}

/*
# -==Интерфейс API-клиента==-

class LarekApi extends Api {
    readonly cdn: string;

    constructor() {}
	getProducts():Promise<IProductItem[]>  {...}
	setOrder(){}
}
*/

/*
# -==Интерфейсы модели данных (Model)==-

class LarekModel {
    protected items: IProductItem[] = [];
	protected events: IEvents;

    constructor() {}

    addItem(item: IProductItem) {}

    deleteItem(id: string) {}

    getItems(): IProductItem[] {}

    getItem(id: string): IProductItem {}

    getTotal() {}

    setItems(items: IProductItem[]) {}
}
*/

/*
class BasketModel {
    events:IEvents;
    protected items: IProductItem[] = [];

    constructor(events:IEvents){}

    addItem(item: IProductItem) {}

    getItems(): IProductItem[] {}

    deleteItem(id: string) {}

    getTotal():number{}

    isItemInBasket(id: string): boolean {}

    getCount():number{}

    protected changed(){}
}
*/

/*
class OrderModel {
    events:IEvents;

    protected payment: string;
    protected address: string;
    protected errors: string;
    protected phone: string;
    protected email: string;
    protected items: string[];

    constructor(events:IEvents){}

    setOrderField(field: string, value: string) {}
	setOrder(){}
}
*/

/*
# -==Интерфейсы отображений (View)==-

class CardItem extends Component<IProductItem> {
	protected cardCategory: HTMLElement;
	protected cardTitle: HTMLElement;
	protected cardImage: HTMLImageElement;
	protected cardPrice: HTMLElement;
	protected galleryItemButton: HTMLButtonElement;
	protected cardId: string;
	protected cardText: HTMLElement;
	
		constructor(container: HTMLElement, protected events: EventEmitter) {
			super(container);
			...
		}

		set category(value: string) {}	
		set id(value: string) {}
		get id(): string {}	
		set title(value: string) {}	
		set price(value: number) {}	
		categoryType(cardCategory:string):string{}
		set image(value: string) {}
}
*/

/*
class CardBasketItem extends Component<IProductItem> {
protected basketItemIndex: HTMLSpanElement;
protected cardTitle: HTMLSpanElement;
protected cardPrice: HTMLSpanElement;
protected cardId: string;
protected basketItemDeleteButton:HTMLButtonElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);
		...
    }
    set id(value: string) {}
    get id(): string {}
    set itemIndex(value: string) {}
    set title(value: string) {}
    set price(value: number) {}
    render(data: {id:string, index:number,title:string,price:number}): HTMLElement {}
}
*/

/*
class CardPreviewItem extends Component<IProductItem> {
	protected cardCategory: HTMLElement;
	protected cardTitle: HTMLElement;
	protected cardImage: HTMLImageElement;
	protected cardPrice: HTMLElement;
	protected galleryItemButton: HTMLButtonElement;
	protected cardId: string;
	protected cardText: HTMLElement;
	protected cardButton: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		...
	}

	set description(value: string) {}
	set category(value: string) {}
	set canBuy(status: boolean) {}
	set id(value: string) {}
    get id(): string {}    
    set title(value: string) {}
    set price(value: number) {}
}
*/

/*
class Page extends Component<IPage> {
    protected galleryContaner: HTMLElement;
    protected headerBasketButton: HTMLButtonElement;
    protected headerBasketCounter: HTMLElement;

    constructor(container: HTMLElement,protected events: EventEmitter) {
        super(container);
		...
    }

    set counter(value: number) {}

    set cardList(items: HTMLElement[]){}

    set locked(value: boolean) {}
}
*/

/*class Basket extends Component<IBasket> {
    protected basketContaner: HTMLElement;
    protected basketButton:HTMLButtonElement;
    protected basketPrice: HTMLSpanElement;

    constructor(container: HTMLElement,protected events: EventEmitter) {
        super(container);
		...
    }

    set basketList(items: HTMLElement[]){}

    set selected(status: boolean) {}
    
    set total(total: number) {}
}
*/

/*
class ModalContainer extends Component<IModalContainerData> {
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);
		...
    }

    set content(value: HTMLElement) {}

    open() {}

    close() {}

    render(data: IModalContainerData): HTMLElement {}
}
*/

/*
class Order extends Component<IOrderForm> {

    protected cardButton: HTMLButtonElement;
    protected cashButton: HTMLButtonElement;

    protected addressInputField: HTMLInputElement;
    protected orderButton: HTMLButtonElement;
    protected formErrors: HTMLSpanElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);
		...
    }

    set address(value: string) {}
    set errors(value: string) {}
}
*/

/*
class Contacts extends Component<IContactsForm> {

    protected emailInputField: HTMLInputElement;
    protected phoneInputField: HTMLInputElement;

    protected submitButton: HTMLButtonElement;
    protected formErrors: HTMLSpanElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);
		...
    }

    set email(value: string) {}
    set phone(value: string) {}
    set errors(value: string) {}
}
*/

/*
# --=Интерфейсы базовых классов==-
base\api.ts
base\Component.ts
base\event.ts
*/



/*
# -==Перечисление событий и их интерфейсы==-

events.on('order:open', () => {});
events.on('contacts:open', () => {});
events.on('order:change', (event: { field: string, value:string }) => {});
events.on('contacts:change', (event: { field: string, value:string }) => {});
events.on('formErrors:change', (errors: { error: string }) => {});
events.on('items:changed', () => {});
events.on('card-basket-item:remove', (event: { id: string }) => {});
events.on('card-basket-item:add', (event:{id:string})=>{});
events.on('basket:change', () => {});
events.on('basket:open', () => {});
events.on('card-item:open', ({ id }: { id: string }) => {});
events.on('modal:open', () => {});
events.on('modal:close', () => {});
*/