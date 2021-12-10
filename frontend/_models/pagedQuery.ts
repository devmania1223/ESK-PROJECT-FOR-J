import { ValuePair } from './valuePair';
import { PagedQueryResult } from './pagedQueryResult';

export class PagedQuery {
    currentPage = 0;
    resultPerPage = 10;
    resultLength: number;
    conditions: ValuePair[] = [];
    result: any[] = [];

    constructor(init?: Partial<PagedQuery>) {
        Object.assign(this, init);
    }

    public populate(data: PagedQueryResult) {
        this.result = data.result;
        this.resultLength = data.resultLength;
    }

    public reset() {
        this.result = [];
        this.resultLength = 0;
    }
}

