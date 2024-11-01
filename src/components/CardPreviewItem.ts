import { IProductItem } from '../types';
import { ensureElement } from '../utils/utils';
import { EventEmitter } from './base/events';
import { ModalCard } from './ModalCard';

export class CardPreviewItem extends ModalCard<IProductItem> {
	protected cardCategory: HTMLElement;
	protected cardImage: HTMLImageElement;
	protected cardText: HTMLElement;
	protected cardButton: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container,events);
		this.cardCategory = ensureElement('.card__category', this.container);
		this.cardImage = ensureElement('.card__image',	this.container) as HTMLImageElement;

		this.cardText = ensureElement('.card__text', this.container);
		this.cardButton = ensureElement(
			'.card__button',
			this.container
		) as HTMLButtonElement;

		this.cardButton.addEventListener('click', () => {
			this.events.emit('card-basket-item:add', { id: this.cardId });
		});
	}

	set description(value: string) {
		this.setText(this.cardText, value);
	}

	set category(value: string) {
		this.setText(this.cardCategory, value);
		this.cardCategory.classList.add(this.categoryType(value));
	}

	set canBuy(status: boolean) {
		this.setDisabled(this.cardButton, status);
		this.cardButton.textContent = status ? 'В корзине' : 'Купить';
	}

	set image(value: string) {
        this.setImage(this.cardImage, value, this.title)
    }
}
