import { ParentToProizvod } from "./parent-to-proizvod";

export class ZascitniznakProizvod extends ParentToProizvod{
    idZascitniznak: number;
    constructor(init?: Partial<ZascitniznakProizvod>) {
        super(init);
		Object.assign(this, init);
	}
}