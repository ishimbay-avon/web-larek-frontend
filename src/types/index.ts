//# -==Данные, используемые в приложении==-

export interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IOrderForm {
	payment:string;
	address: string;	
}

export interface IContactsForm {
	email: string;
	phone: string;
}

export interface IBasket {
    basketList: HTMLElement[];
}

export interface IPage {
    cardList: HTMLElement[];
}

export interface IOrder extends IOrderForm, IContactsForm{    
}

export interface IOrderResult {
    id: string;
	total: number;
}