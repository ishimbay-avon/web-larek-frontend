import { IProductItem } from "../types";
import { ensureElement } from "../utils/utils";
import { EventEmitter } from "./base/events";
import { ModalCard } from "./ModalCard";

export class CardItem extends ModalCard<IProductItem> {
protected cardCategory: HTMLElement;
protected cardImage: HTMLImageElement;
protected galleryItemButton: HTMLButtonElement;
protected cardText: HTMLElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container,events);
        this.cardCategory = ensureElement('.card__category', this.container);
        this.cardImage = ensureElement('.card__image', this.container) as HTMLImageElement;

        this.galleryItemButton = this.container as HTMLButtonElement;

        this.galleryItemButton.addEventListener('click', () => {
            this.events.emit('card-item:open', {id: this.cardId});
        });
    }

    set category(value: string) {
        this.setText(this.cardCategory, value);
        this.cardCategory.classList.add(this.categoryType(value));
    }

    set image(value: string) {
        this.setImage(this.cardImage, value, this.title)
    }
}
