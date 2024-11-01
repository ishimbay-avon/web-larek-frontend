import { IContactsForm } from '../types/index';
import { Form } from './Form';
import { EventEmitter } from './base/events';

export class Contacts extends Form<IContactsForm> {

	constructor(container: HTMLFormElement, events: EventEmitter) {
		super(container, events);
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value = value;
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
	}
}
