export class Shema {
	id: number;
	naziv: string;


	constructor(init?: Partial<Shema>) {
		Object.assign(this, init);
	}
}