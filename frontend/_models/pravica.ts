export class Pravica {
	id: number;
	naziv: string;
	tip: string;


	constructor(init?: Partial<Pravica>) {
		Object.assign(this, init);
	}
}