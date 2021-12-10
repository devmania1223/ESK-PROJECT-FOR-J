import { Proizvod } from "./proizvod";

export class ParentToProizvod {
	id: number;
	idProizvod: number;
	proizvod: Proizvod;
	constructor(init?: Partial<ParentToProizvod>) {
		Object.assign(this, init);
	}
}