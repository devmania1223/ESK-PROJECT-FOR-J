import { ParentToProizvod } from "./parent-to-proizvod";

export class CertifikatProizvod extends ParentToProizvod{
    idCertifikat: number;
    constructor(init?: Partial<CertifikatProizvod>) {
        super(init);
		Object.assign(this, init);
	}
}