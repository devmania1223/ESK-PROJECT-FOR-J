export class BaseModel {
	id: number = 0;
	open: boolean = false;

	constructor(init?: Partial<BaseModel>) {
		Object.assign(this, init);
	}
}