import { IProductItem } from "../types";
import { ensureElement } from "../utils/utils";
import { EventEmitter } from "./base/events"
import { ModalCard } from "./ModalCard";

export class CardBasketItem extends ModalCard<IProductItem> {
protected basketItemIndex: HTMLSpanElement;
protected basketItemDeleteButton:HTMLButtonElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container,events);
        this.basketItemIndex = ensureElement('.basket__item-index', this.container) as HTMLSpanElement;

        this.basketItemDeleteButton = ensureElement('.basket__item-delete', this.container) as HTMLButtonElement;

        this.basketItemDeleteButton.addEventListener('click', () => {
            this.events.emit('card-basket-item:remove', {id:this.id});
        });
    }

    set itemIndex(value: string) {
        this.setText(this.basketItemIndex, value);
    }

    render(data: {id:string, index:number,title:string,price:number}): HTMLElement {
        this.itemIndex=String(data.index);
        return super.render(data);
    }
}
