export class ProizvodKolicine {
	id: number;
	vrednost: number;
	enota: string;
	proizvod: String;
	zascitenproizvod: String;
	shema: String;
	leto: number;
	kmgmid: String;
	nazivSubj: String;
	naslov: String;
	idPoste: String;
	posta: String;

	constructor(init?: Partial<ProizvodKolicine>) {
		Object.assign(this, init);
	}
}