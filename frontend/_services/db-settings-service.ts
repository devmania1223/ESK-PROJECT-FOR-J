import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CRUDService } from './CRUD.service';
import { DbSettings } from 'app/_models/db-settings';


@Injectable()
export class DbSettingsService extends CRUDService<DbSettings> {

	constructor(http: HttpClient) {
		super(http, 'settings');
	}
}
