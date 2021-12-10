import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CRUDService } from './CRUD.service';
import { Certifikat } from 'app/_models/certifikat';
import { Observable } from 'rxjs';
import { PagedQueryResult } from 'app/_models/pagedQueryResult';
import { PagedQuery } from 'app/_models/pagedQuery';
import { PrilogaClan } from 'app/_models/priloga-clan';


@Injectable()
export class CertifikatService extends CRUDService<Certifikat>{

	constructor(http: HttpClient) {
		super(http, "certifikat");
	}

	refreshData(cert: Certifikat): Observable<any> {
		return this.http.post('server/certifikat/refresh', cert)
			.map(response => <any>response)
			.catch(this.handleError);
	}

	removeClan(item: PrilogaClan): Observable<boolean> {
		return this.http.post('server/certifikat/removeClan', item)
			.map(response => <boolean>response)
			.catch(this.handleError);
	}

	getProizvodiIdList(id_certifikat: number): Observable<PagedQueryResult> {
		let params = new HttpParams();
		params = params.append("id", id_certifikat.toString());
		return this.http.get("server/certifikat/proizvodiIdList", { params })
			.map(response => <PagedQuery>response)
			.catch(this.handleError);
	}

	getProizvodi(id_certifikat: number): Observable<PagedQueryResult> {
		let params = new HttpParams();
		params = params.append("id", id_certifikat.toString());
		return this.http.get("server/certifikat/proizvodi", { params })
			.map(response => <PagedQuery>response)
			.catch(this.handleError);
	}

	getDejavnosti(id_certifikat: number): Observable<PagedQueryResult> {
		let params = new HttpParams();
		params = params.append("id", id_certifikat.toString());
		return this.http.get("server/certifikat/dejavnosti", { params })
			.map(response => <PagedQuery>response)
			.catch(this.handleError);
	}

	getPrilogaProizvod(id_certifikat: number): Observable<PagedQueryResult> {
		let params = new HttpParams();
		params = params.append("id", id_certifikat.toString());

		return this.http.get("server/certifikat/certifikatPrilogaProizvod", { params })
			.map(response => <PagedQuery>response)
			.catch(this.handleError);
	}

	getPrilogaClan(id_certifikat: number): Observable<PagedQueryResult> {
		let params = new HttpParams();
		params = params.append("id", id_certifikat.toString());

		return this.http.get("server/certifikat/certifikatPrilogaClan", { params })
			.map(response => <PagedQuery>response)
			.catch(this.handleError);
	}

	// WE NEED TO SEND WHOLE OBJECT INSIDE POST METHOD FOR VALIDATION PURPOSE
	finish(certifikat: Certifikat): Observable<Certifikat> {
		return this.http.post('server/certifikat/finish', certifikat)
			.map(response => <Certifikat>response)
			.catch(this.handleError);
	}
	// WE NEED TO SEND WHOLE OBJECT INSIDE POST METHOD FOR VALIDATION PURPOSE
	cancelation(certifikat: Certifikat): Observable<Certifikat> {
		return this.http.post('server/certifikat/cancellation', certifikat)
			.map(response => <Certifikat>response)
			.catch(this.handleError);
	}

	search(criteria: any): Observable<any> {
		return this.http.post("server/certifikat/search", criteria)
			.map(response => <any>response)
			.catch(this.handleError);
	}
}