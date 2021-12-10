import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedQuery } from 'app/_models/pagedQuery';
import { ProizvodKolicine } from 'app/_models/proizvod-kolicine';


@Injectable()
export class ProizvodKolicineService extends BaseService {

	constructor(private http: HttpClient) {
		super();
	}

	search(page: PagedQuery): Observable<ProizvodKolicine[]> {
		let params = new HttpParams();
		params = params.append('pageNumber', page.currentPage.toString());
		params = params.append('resultPerPage', page.resultPerPage.toString());

		page.conditions.forEach(condition => {
			console.log(condition);
			params = params.append(condition.id, !condition.value ? '' : condition.value.toString());
		});

		return this.http.get('server/ProizvodKolicine/search', { params: params })
			.map(response => <ProizvodKolicine[]>response)
			.catch(this.handleError);
	}
}
