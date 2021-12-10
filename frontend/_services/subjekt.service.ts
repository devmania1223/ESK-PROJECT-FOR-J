import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CRUDService } from './CRUD.service';
import { Subjekt } from 'app/_models/subjekt';


@Injectable()
export class SubjektService extends CRUDService<Subjekt>{

	constructor(http: HttpClient) {
		super(http, "Subjekt");
	}
}