import { Priloga } from "./priloga";

export class CertifikatPriloga {
	id: number; // this identity from proizvod_priloga table
	priloga: Priloga;
	constructor(init?: Partial<CertifikatPriloga>) {
		Object.assign(this, init);
	}
}