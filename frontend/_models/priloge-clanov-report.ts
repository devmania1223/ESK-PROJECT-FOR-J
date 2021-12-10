export class PrilogeClanovReport {
	id: number;
	kmgmidImetnika: string;
	nazivImetnika: string;
	naslovImetnika: string;
	stevilkaCertifikata: string;
	shema: string;
	nazivZascitenProizvod: string;
	nazivShema: string;
	kmgmidClana: string;
	nazivClana: string;
	naslovClana: string;
	stevilka: string;
	datIzdaje: Date;
	datVelj: Date;
	status: string;
	idCertifikat: number;
	datVnosa: Date;

	constructor(init?: Partial<PrilogeClanovReport>) {
		Object.assign(this, init);
	}
}