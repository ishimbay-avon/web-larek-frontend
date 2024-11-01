import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

interface ISuccess {
    total: number;
}

interface ISuccessActions {
    onClick: () => void;
}

export class Success extends Component<ISuccess> {
    protected _close: HTMLElement;
    protected successDescription: HTMLElement;

    constructor(container: HTMLElement, actions: ISuccessActions) {
        super(container);
        
        this.successDescription = ensureElement<HTMLElement>('.order-success__description', this.container);
        this._close = ensureElement<HTMLElement>('.order-success__close', this.container);

        if (actions?.onClick) {
            this._close.addEventListener('click', actions.onClick);
        }
    }

    set total(value: string) {
		this.setText(this.successDescription, 'Списано '+ value +' синапсов');
	}    
}
