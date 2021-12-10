export class ZakonskaPodlaga {
	id: number;
	stevilka: string;
	vsebina: string;
	neaktiven: boolean;

	constructor(init?: Partial<ZakonskaPodlaga>) {
		Object.assign(this, init);
	}
}