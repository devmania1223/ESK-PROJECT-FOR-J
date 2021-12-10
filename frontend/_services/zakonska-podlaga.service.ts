import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CRUDService } from './CRUD.service';
import { Dejavnost } from 'app/_models/dejavnost';


@Injectable()
export class ZakonskaPodlagaService extends CRUDService<Dejavnost>{

	constructor(http: HttpClient) {
		super(http, "ZakonskaPodlaga");
	}
}