import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedQuery } from 'app/_models/pagedQuery';
import { Observable, Subscriber } from 'rxjs';
import { PagedQueryResult } from 'app/_models/pagedQueryResult';
import { DemoService } from './demo.service';
import { environment } from 'environments/environment';
import { ReportItem } from 'app/_models/report-item';


@Injectable()
export class ReportsService extends BaseService{
	constructor(private http: HttpClient, private demo: DemoService) {
		super();
	}

	list(page: PagedQuery): Observable<ReportItem[]> {

		let params = new HttpParams();

		page.conditions.forEach(condition => {
			params = params.append(condition.id, !condition.value ? "" : condition.value.toString());
		});

		return this.http.get("server/report/list", {params : params})
		.map(response => <ReportItem[]>response)
		.catch(this.handleError);
	}
}