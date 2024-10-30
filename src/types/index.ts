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
	address: string;
	errors: string;
}

export interface IContactsForm {
	email: string;
	phone: string;
}

export interface IModalContainerData {
	content: HTMLElement;
}

export interface IBasket {
    basketList: HTMLElement[];
}

export interface IPage {
    cardList: HTMLElement[];
}
