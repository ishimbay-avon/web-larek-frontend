import { IProductItem } from "../types";
import { IEvents } from "./base/events";


export class BasketModel {
    events:IEvents;
    protected items: IProductItem[] = [];

    constructor(events:IEvents){
        this.events=events;
    }

    addItem(item: IProductItem) {
        this.items = [item, ...this.items];
        this.changed();
    }

    getItems(): IProductItem[] {
        return this.items;
    }

    getIdItems(): string[] {
        return this.items.filter(item => item.price !== null).map(item=>item.id);
    }

    deleteItem(id: string) {
        this.items = this.items.filter(item => item.id !== id);
        this.changed();
    }

    getTotal():number{
        return this.getItems().map(item => item.price).reduce((previousValue, item) => previousValue + item);
    }

    isItemInBasket(id: string): boolean {
        return this.items.some(item => item.id === id);
    }

    getCount():number{
        return this.getItems().length;
    }

    clearBasket() {
        this.items=[];
        this.changed();
    }

    protected changed(){
        this.events.emit('basket:change');
    }
}
