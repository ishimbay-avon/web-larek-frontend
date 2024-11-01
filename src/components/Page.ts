import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { EventEmitter } from "./base/events";

interface IPage {
    cardList: HTMLElement[];
}

export class Page extends Component<IPage> {
    protected galleryContaner: HTMLElement;
    protected headerBasketButton: HTMLButtonElement;
    protected headerBasketCounter: HTMLElement;

    constructor(container: HTMLElement,protected events: EventEmitter) {
        super(container);

        this.galleryContaner = ensureElement('.gallery', this.container);
        this.headerBasketCounter=ensureElement('.header__basket-counter', this.container);
        this.headerBasketButton = ensureElement('.header__basket', this.container) as HTMLButtonElement;

        this.headerBasketButton.addEventListener('click', () => {
            this.events.emit('basket:open');
        });
    }

    set counter(value: number) {
        this.setText(this.headerBasketCounter, String(value));
    }

    set cardList(items: HTMLElement[]){

        this.galleryContaner.replaceChildren(...items);
    }

    set locked(value: boolean) {
        if (value) {
            this.galleryContaner.classList.add('page__wrapper_locked');
        } else {
            this.galleryContaner.classList.remove('page__wrapper_locked');
        }
    }
}
