import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { DemoService } from './demo.service';
import { Observable, Subscriber } from 'rxjs';
import { PagedQueryResult } from 'app/_models/pagedQueryResult';
import { HttpParams, HttpClient } from '@angular/common/http';
import { PagedQuery } from 'app/_models/pagedQuery';
import { environment } from 'environments/environment';
import { CRUDService } from './CRUD.service';
import { Priloga } from 'app/_models/priloga';


@Injectable()
export class PrilogaService extends CRUDService<Priloga>{

	constructor(http: HttpClient) {
		super(http, "priloga");
	}
}