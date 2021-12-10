import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Ko } from 'app/_models/ko';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';



@Injectable()
export class KoService extends BaseService {

	constructor(private http: HttpClient) {
		super();
	}

	getByExtSif(sif: string): Observable<Ko> {
		let params = new HttpParams();
		params = params.append('sif', sif);
		return this.http.get('server/Ko/getByExtSif', { params })
			.map(response => <Ko>response)
			.catch(this.handleError);
	}

	list(): Observable<Ko[]> {

		return this.http.get('server/Ko/list')
		.map(response => <Ko[]>response)
		.catch(this.handleError);
	}
}
