import { PrilogaClan } from "./priloga-clan";

export class Priloga {
	id: number;
	stevilka: string;
	datIzdaje: Date;
	datVelj: Date;
	status: string = "Vnos";
	vsebina: string;
	prilogaClan: PrilogaClan[];

	constructor(init?: Partial<Priloga>) {
		Object.assign(this, init);
	}
}