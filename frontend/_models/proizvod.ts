import { ZakonskaPodlaga } from "./zakonska-podlaga"
import { ZascitenProizvod } from "./zasciten-proizvod"

export class Proizvod {
	id: number;
	zascitenProizvod: ZascitenProizvod;
	naziv: string;
	zakonskaPodlaga: ZakonskaPodlaga;
	enota: string;
	neaktiven: boolean;

	constructor(init?: Partial<Proizvod>) {
		Object.assign(this, init);
	}
}