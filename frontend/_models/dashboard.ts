export class Dashboard {
	veljavniTotal: number;
	vIzteku: number;
	vnosTotal: number;

	constructor(init?: Partial<Dashboard>) {
		Object.assign(this, init);
	}
}