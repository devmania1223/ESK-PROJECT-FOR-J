import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CRUDService } from './CRUD.service';
import { ZascitenProizvod } from 'app/_models/zasciten-proizvod';
import { Shema } from 'app/_models/shema';
import { Observable } from 'rxjs';
import { PagedQueryResult, PagedQueryGenericResult } from 'app/_models/pagedQueryResult';
import { PagedQuery } from 'app/_models/pagedQuery';
import { ValuePair } from 'app/_models/valuePair';


@Injectable()
export class ZascitenProizvodService extends CRUDService<ZascitenProizvod>{

	constructor(http: HttpClient) {
		super(http, "ZascitenProizvod");
	}

	listByShema(shema: Shema): Observable<PagedQueryResult> {
		let page = new PagedQuery();
		page.resultPerPage = 0; // no page-ing, instead all data retrieved
		page.conditions = [];
		page.conditions.push(new ValuePair({ id: "idShema", value: shema.id.toString()}));
		
		let params = new HttpParams();
		params = params.append("pageNumber", page.currentPage.toString());
		params = params.append("resultPerPage", page.resultPerPage.toString());

		page.conditions.forEach(condition => {
			params = params.append(condition.id, !condition.value ? "" : condition.value.toString());
		});

		return this.http.get("server/ZascitenProizvod/ByIdShema", { params })
			.map(response => <PagedQueryGenericResult<ZascitenProizvod>>response)
			.catch(this.handleError);
	}
}
