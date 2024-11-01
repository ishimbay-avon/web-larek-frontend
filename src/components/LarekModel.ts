import { IProductItem } from "../types";
import { IEvents } from "./base/events";

export class LarekModel {
    protected items: IProductItem[] = [];

    constructor(protected events: IEvents ) {}

    getItems(): IProductItem[] {
        return this.items;
    }

    getItem(id: string): IProductItem {
        return this.items.find(item => item.id === id);
    }
    
    setItems(items: IProductItem[]) {
        this.items = items;
        this.events.emit('items:changed');
    }
}
