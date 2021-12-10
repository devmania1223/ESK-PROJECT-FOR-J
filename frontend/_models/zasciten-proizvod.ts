import { Shema } from "./shema";

export class ZascitenProizvod {
	id: number;
	naziv: string;
	shema: Shema;

	constructor(init?: Partial<ZascitenProizvod>) {
		Object.assign(this, init);
	}
}