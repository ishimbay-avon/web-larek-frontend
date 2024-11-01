import { IContactsForm,IOrderForm,IOrder } from "../types";
import { IEvents } from "./base/events";


export type FormErrors = Partial<Record<keyof IOrder, string>>;

export class OrderModel {
    events:IEvents;

    order: IOrder = {
        payment: '',
        address: '',
        phone: '',
        email: '',
        items: []
    };    
    formErrors: FormErrors = {};

    constructor(events:IEvents){
        this.events=events;
    }

    setItems(items: string[]) {
        this.order.items = items;        
    }

    setOrderField(field: keyof IOrderForm, value: string) {        
        this.order[field] = value;
        this.events.emit('order-model:change');

        this.validateOrder();
    }

    setContactsField(field: keyof IContactsForm, value: string) {        
        this.order[field] = value;
        
        this.validateOrder();
    }

    validateOrder() {        
        const errors: typeof this.formErrors = {};
        if (!this.order.payment) {
            errors.payment = 'Необходимо указать способ оплаты';
        }
        if (!this.order.address) {
            errors.address = 'Необходимо указать адрес';
        }
        if (!this.order.email) {
            errors.email = 'Необходимо указать почту';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }  
}
