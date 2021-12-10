import { Shema } from "./shema"
import { ZascitenProizvod } from "./zasciten-proizvod"
import { Subjekt } from "./subjekt"
import { Uporabnik } from "./uporabnik"
import { Dejavnost } from "./dejavnost"
import { CertifikatPriloga } from "./certifikat-priloga";
import { BaseModel } from "./base-model";
import { CertifikatProizvod } from "./certifikat-proizvod";
import { CertifikatDejavnost } from "./certifikat-dejavnost"

export class Certifikat extends BaseModel{
	id: number;
	tip: string;
	stevilka: string;
	zascitenProizvod: ZascitenProizvod;
	certifikatProizvod: CertifikatProizvod[];
	dejavnosti: Dejavnost[];
	imetnik: Subjekt;
	certifikatPrilogaClan: CertifikatPriloga[];
	certifikatPrilogaProizvod: CertifikatPriloga[];
	uporabnik: Uporabnik;
	datKontrole: Date;
	datIzdaje: Date;
	datVelj: Date;
	dejavnost: Dejavnost;
	status: string = "Vnos";
	telSt: string;
	email: string;
	opomba: string;
	datVnosa: Date;
	kontrolor: string;
	idParent: number;
	organizacija: string;

	constructor(init?: Partial<Certifikat>) {
		super();
		Object.assign(this, init);
	}
}
