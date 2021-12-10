export class QueryParams {
    searchQuery: string;
    pageNumber: number = 1;
    resultPerPage: number = 30;
    constructor(init?: Partial<QueryParams>) {
      Object.assign(this, init);
      if (!this.pageNumber){
        this.pageNumber = 1;
      }
      if (!this.resultPerPage){
        this.resultPerPage = 30;
      }
    }
}