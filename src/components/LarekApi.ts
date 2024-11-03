import { IProductItem, IOrder, IOrderResult } from '../types';
import { Api, ApiListResponse } from './base/api';

export class LarekApi extends Api {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProducts(): Promise<IProductItem[]> {
		return this.get('/product').then((data: ApiListResponse<IProductItem>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	setOrder(order: IOrder): Promise<IOrderResult> {              
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}