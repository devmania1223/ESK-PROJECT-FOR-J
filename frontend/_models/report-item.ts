export class ReportItem {
	id: number;
	report: string;
	name: string;
	value: number;
	unit: string;

	constructor(init?: Partial<ReportItem>) {
		Object.assign(this, init);
	}
}