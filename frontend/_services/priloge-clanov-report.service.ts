import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { PagedQuery } from 'app/_models/pagedQuery';
import { Observable } from 'rxjs';
import { PagedQueryResult } from 'app/_models/pagedQueryResult';
import { HttpParams, HttpClient } from '@angular/common/http';


@Injectable()
export class PrilogeClanovReportService extends BaseService{

	constructor(private http: HttpClient) {
		super();
	}

	search(page: PagedQuery): Observable<PagedQueryResult> {	
		let params = new HttpParams();
		params = params.append("pageNumber", page.currentPage.toString());
		params = params.append("resultPerPage", page.resultPerPage.toString());

		page.conditions.forEach(condition => {
			params = params.append(condition.id, !condition.value ? "" : condition.value.toString());
		});

		return this.http.get("server/PrilogeClanovReport/search", { params: params })
			.map(response => <PagedQueryResult>response)
			.catch(this.handleError);
	}
}