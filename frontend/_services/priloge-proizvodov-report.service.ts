import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Rx'; 
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedQuery } from 'app/_models/pagedQuery';
import { PagedQueryResult } from 'app/_models/pagedQueryResult';
import { DemoService } from './demo.service';


@Injectable()
export class PrilogeProizvodovReportService extends BaseService{

	constructor(private http: HttpClient, private demo: DemoService) {
		super();
	}

	search(page: PagedQuery): Observable<PagedQueryResult> {	
		let params = new HttpParams();
		params = params.append("pageNumber", page.currentPage.toString());
		params = params.append("resultPerPage", page.resultPerPage.toString());

		page.conditions.forEach(condition => {
			console.log(condition);
			params = params.append(condition.id, !condition.value ? "" : condition.value.toString());
		});

		return this.http.get("server/PrilogeProizvodovReport/search", { params: params })
			.map(response => <PagedQueryResult>response)
			.catch(this.handleError);
	}
}