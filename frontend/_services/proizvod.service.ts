import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CRUDService } from './CRUD.service';
import { Proizvod } from 'app/_models/proizvod';
import { Observable } from 'rxjs';
import { PagedQueryResult } from 'app/_models/pagedQueryResult';
import { PagedQuery } from 'app/_models/pagedQuery';


@Injectable()
export class ProizvodService extends CRUDService<Proizvod> {
	constructor(http: HttpClient) {
		super(http, "Proizvod");
	}
	
	getProizvodList4ZascitenProizvod(id: number): Observable<PagedQueryResult> {
		let params = new HttpParams();
		params = params.append("id", id.toString());

		return this.http.get("server/Proizvod/ByZascitenProizvod", { params: params })
			.map(response => <PagedQueryResult>response)
			.catch(this.handleError);
	}
}