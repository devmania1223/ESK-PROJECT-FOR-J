import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Dashboard } from 'app/_models/dashboard';
import { CRUDService } from './CRUD.service';


@Injectable()
export class DashboardService extends CRUDService<Dashboard> {
	constructor(http: HttpClient) {
		super(http, 'dashboard');
	}

	getByUser(id: number): Observable<Dashboard> {
		let params = new HttpParams();
		params = params.append('id', id.toString());
		return this.http.get('server/dashboard/user', {params} )
		  .map(response => <Dashboard>response)
		  .catch(this.handleError);
	}
}
