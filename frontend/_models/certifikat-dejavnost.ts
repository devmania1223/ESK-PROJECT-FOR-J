import { Dejavnost } from "./dejavnost";

export class CertifikatDejavnost{
    idCertifikat: number;
    idDejavnost: number
    dejavnost: Dejavnost;

    constructor(init?: Partial<CertifikatDejavnost>) {
		Object.assign(this, init);
	}
}