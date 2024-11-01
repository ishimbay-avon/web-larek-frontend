import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { EventEmitter } from "./base/events";

interface IBasket {
    basketList: HTMLElement[];    
}

export class Basket extends Component<IBasket> {
    protected basketContaner: HTMLElement;
    protected basketButton:HTMLButtonElement;
    protected basketPrice: HTMLSpanElement;

    constructor(container: HTMLElement,protected events: EventEmitter) {
        super(container);

        this.basketContaner = ensureElement('.basket__list', this.container);
        this.basketPrice = ensureElement('.basket__price', this.container) as HTMLSpanElement;

        this.basketButton = ensureElement('.basket__button', this.container) as HTMLButtonElement;

        this.basketButton.addEventListener('click', () => {
            this.events.emit('order:open');
        });
    }

    set basketList(items: HTMLElement[]){
        this.basketContaner.replaceChildren(...items);
    }

    set selected(status: boolean) {
        this.setDisabled(this.basketButton, status);
    }

    set total(total: number) {        
        if (total===0){
            this.setText(this.basketPrice, "0 синапсов");
            this.selected=true;
        }
        else if (total===null) {
            this.setText(this.basketPrice, "Бесценно");
            this.selected=true;
        }
        else{
            this.setText(this.basketPrice, String(total)+" синапсов");
            this.selected=false;
        }
    }
}
