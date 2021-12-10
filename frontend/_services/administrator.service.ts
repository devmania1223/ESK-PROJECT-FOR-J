import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CRUDService } from './CRUD.service';


@Injectable()
export class AdministratorService extends CRUDService<any>{

	constructor(http: HttpClient) {
		super(http, "administrator");
	}
}