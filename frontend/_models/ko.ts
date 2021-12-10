export class Ko {
    id: number;
    sif: string;
    naziv: string;
    naslov: string;
    extSif: string;
    podpisnik: string;
    podpisnikVloga: string;


	constructor(init?: Partial<Ko>) {
		Object.assign(this, init);
	}
}
