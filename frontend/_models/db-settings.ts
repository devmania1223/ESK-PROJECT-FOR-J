export class DbSettings {
	id: number;
	verzija = '1.0';
	appName = 'ORACLE';
	className = 'offline';

	constructor(init?: Partial<DbSettings>) {
		Object.assign(this, init);
	}
}
