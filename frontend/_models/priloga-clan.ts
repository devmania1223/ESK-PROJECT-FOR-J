import { Subjekt } from "./subjekt"

export class PrilogaClan {
	id: number;
	clan: Subjekt;

	constructor(init?: Partial<PrilogaClan>) {
		Object.assign(this, init);
	}
}