import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { EventEmitter } from './base/events';

interface IFormState {
	valid: boolean;
	errors: string[];
}

export class Form<T> extends Component<IFormState> {
	protected orderButton: HTMLButtonElement;
	protected formErrors: HTMLSpanElement;

	constructor(protected container: HTMLFormElement,protected events: EventEmitter) {
		super(container);
		this.formErrors = ensureElement(
			'.form__errors',
			this.container
		) as HTMLSpanElement;
		this.orderButton = ensureElement(
			'button[type="submit"]',
			this.container
		) as HTMLButtonElement;

		this.container.addEventListener('submit', (evt) => {
			evt.preventDefault();			
			this.events.emit(`${this.container.name}:submit`);
		});

		this.container.addEventListener('input', (evt) => {
			const target = evt.target as HTMLInputElement;
			const field = target.name;
			const value = target.value;
			this.events.emit(`${this.container.name}:change`, { field, value });
		});		
	}

	set errors(value: string) {
		this.setText(this.formErrors, value);
	}

	set valid(value: boolean) {
		this.orderButton.disabled = !value;
	}

	render(state: Partial<T> & IFormState) {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}