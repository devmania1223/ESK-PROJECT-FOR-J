export class PrilogeProizvodovReport {
	id: number;
	kmgmidImetnika: string;
	nazivImetnika: string;
	naslovImetnika: string;
	stevilkaCertifikata: string;
	nazivShema: string;
	nazivZascitenProizvod: string;
	nazivProizvod: string;
	stevilka: string;
	datIzdaje: Date;
	datVelj: Date;
	status: string;
	vsebina: string;
	idCertifikat: number;
	datVnosa: Date;
	
	constructor(init?: Partial<PrilogeProizvodovReport>) {
		Object.assign(this, init);
	}
}