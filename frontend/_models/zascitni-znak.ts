import { Subjekt } from './subjekt'
import { ZascitenProizvod } from './zasciten-proizvod';
import { ZascitniznakProizvod } from './zascitniznak-proizvod';

export class ZascitniZnak {
	id: number;
	zzShema: string;
	imetnik: Subjekt;
	zascitenProizvod: ZascitenProizvod;
	zascitniznakProizvod: ZascitniznakProizvod[];
	nazivProizvoda: string;
	datOdl: Date;
	stOdl: string;
	certOrgan: string;
	neaktiven: boolean;
	stevilka: string;
	
	constructor(init?: Partial<ZascitniZnak>) {
		Object.assign(this, init);
	}
}