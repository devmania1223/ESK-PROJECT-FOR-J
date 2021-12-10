export class Subjekt {
	// data from table subjekt
	id: number;
	kmgmid: string;
	ime: string;
	priimek: string;
	naziv: string;
	naslov: string;
	maticna: string;
	davcna: string;
	idPoste: string;
	posta: string;
	telSt: string;
	email: string;
	// data from view evSubjekt
	obId: string;
	obcina: string;
	subjId: number;
	datZs: Date;


	constructor(init?: Partial<Subjekt>) {
		Object.assign(this, init);
	}
}