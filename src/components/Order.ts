import { IOrderForm } from '../types/index';
import { ensureElement } from '../utils/utils';
import { Form } from './Form';
import { EventEmitter } from './base/events';

export class Order extends Form<IOrderForm> {
	protected cardButton: HTMLButtonElement;
	protected cashButton: HTMLButtonElement;
	
	constructor(container: HTMLFormElement, events: EventEmitter) {
		super(container, events);

		this.cardButton = ensureElement(
			'button[name="card"]',
			this.container
		) as HTMLButtonElement;
		this.cashButton = ensureElement(
			'button[name="cash"]',
			this.container
		) as HTMLButtonElement;
		
		this.cashButton.addEventListener('click', (evt) => {
			const target = evt.target as HTMLButtonElement;

			this.clickChange(target.name);
		});
		this.cardButton.addEventListener('click', (evt) => {
			const target = evt.target as HTMLButtonElement;

			this.clickChange(target.name);
		});
	}

	clickChange(name: string) {
		const field = 'payment';
		const value = name;
		this.events.emit(`${this.container.name}:change`, { field, value });
	}

	set address(value: string) {			
		(this.container.elements.namedItem('address') as HTMLInputElement).value = value;		
	}

	set payment(value: string) {				
		this.toggleClass(this.cardButton, 'button_alt', value === 'card')
		this.toggleClass(this.cashButton, 'button_alt', value === 'cash')
	}		
}
