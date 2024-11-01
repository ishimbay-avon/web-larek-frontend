import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { EventEmitter } from './base/events';

export class ModalCard<T> extends Component<T> {
    protected cardTitle: HTMLSpanElement;
    protected cardPrice: HTMLSpanElement;
    protected cardId: string;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
        this.cardPrice = ensureElement('.card__price', this.container);
        this.cardTitle = ensureElement('.card__title', this.container);
	}

	set id(value: string) {
		this.cardId = value;
	}
    get id(): string {
        return this.cardId;
    }

	set title(value: string) {
		this.setText(this.cardTitle, value);
	}

    set price(value: number) {
        if (value === null){
            this.setText(this.cardPrice, "Бесценно");
        }
        else{
            this.setText(this.cardPrice, String(value)+" синапсов");
        }
    }

    categoryType(cardCategory:string):string{
        let category='';
        switch (cardCategory){
            case 'софт-скил':category='card__category_soft';break;
            case 'другое':category='card__category_other';break;
            case 'дополнительное':category='card__category_additional';break;
            case 'кнопка':category='card__category_button';break;
            case 'хард-скил':category='card__category_hard';break;
        }
        return category;
    }
}
