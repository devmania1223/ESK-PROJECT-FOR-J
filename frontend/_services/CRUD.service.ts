import { BaseService } from './base.service';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedQuery } from 'app/_models/pagedQuery';
import { PagedQueryGenericResult } from 'app/_models/pagedQueryResult';

export class CRUDService<T> extends BaseService {
	constructor(public http: HttpClient, private apiEntity: string) {
        super();
    }

	list(page: PagedQuery): Observable<PagedQueryGenericResult<T>> {
		let params = new HttpParams();
		params = params.append("pageNumber", page.currentPage.toString());
		params = params.append("resultPerPage", page.resultPerPage.toString());

		page.conditions.forEach(condition => {
			params = params.append(condition.id, !condition.value ? "" : condition.value.toString());
		});

		return this.http.get("server/" + this.apiEntity + "/list", { params })
			.map(response => <PagedQueryGenericResult<T>>response)
			.catch(this.handleError);
	}

	get(item: any): Observable<T> {
		let params = new HttpParams();
		params = params.append("id", item.id);
		return this.http.get("server/" + this.apiEntity, { params })
			.map(response => <T>response)
			.catch(this.handleError);
	}
	post(item: any): Observable<T> {
		return this.http.post("server/" + this.apiEntity, item)
			.map(response => <T>response)
			.catch(this.handleError);
	}
	put(item: any): Observable<T> {
		return this.http.put("server/" + this.apiEntity, item)
			.map(response => <T>response)
			.catch(this.handleError);
	}
	delete(item: any): Observable<boolean> {
        let params = new HttpParams();
        params = params.append("id", item.id);
        
		return this.http.delete("server/" + this.apiEntity + "/", { params })
			.map(response => <boolean>response)
			.catch(this.handleError);
	}
}