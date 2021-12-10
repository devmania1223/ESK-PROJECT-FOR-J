export class PagedQueryResult {
    resultLength: number = 0
    result: any[] = [];

	constructor(){
	}
}

export class PagedQueryGenericResult<T> {
    resultLength: number = 0
    result: T[] = [];

	constructor(){
	}
}