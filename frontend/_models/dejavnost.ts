export class Dejavnost {
	id: number;
	naziv: string;
	neaktiven: boolean;
	
	constructor(init?: Partial<Dejavnost>) {
		Object.assign(this, init);
	}
}