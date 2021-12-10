import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ZascitniZnak } from 'app/_models/zascitni-znak';
import { CRUDService } from './CRUD.service';


@Injectable()
export class ZascitniZnakService extends CRUDService<ZascitniZnak> {

	constructor(http: HttpClient) {
		super(http, 'ZascitniZnak');
	}
}
