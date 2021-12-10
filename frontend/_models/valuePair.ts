export class ValuePair {
    id: any = null;
    value: any = null;
    constructor(init?: Partial<ValuePair>) {
        Object.assign(this, init);
    }
}
