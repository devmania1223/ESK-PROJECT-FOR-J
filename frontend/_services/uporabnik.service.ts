import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class UporabnikService extends BaseService{

	constructor(private http: HttpClient) {
		super();
	}
}