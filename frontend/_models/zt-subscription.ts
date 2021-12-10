import { Subscription } from "rxjs";

export class ZtSubscription {
	id: string;
	sub: Subscription;
	constructor(init?: Partial<ZtSubscription>) {
		Object.assign(this, init);
	}
}