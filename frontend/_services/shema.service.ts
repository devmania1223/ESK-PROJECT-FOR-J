import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CRUDService } from './CRUD.service';
import { Shema } from 'app/_models/shema';


@Injectable()
export class ShemaService extends CRUDService<Shema>{

	constructor(http: HttpClient) {
		super(http, "Shema");
	}
}