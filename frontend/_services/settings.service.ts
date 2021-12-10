import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IZtConfig } from '../_models/config.model';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Injectable()
export class ConfigService {
    private settings: IZtConfig;

    constructor(private http: HttpClient) {
    }

    public load(): Promise<any> {
        const jsonFile = `./assets/config.json`;
        return new Promise((resolve, reject) => {
            this.http.get<IZtConfig>(jsonFile).subscribe((response: any) => {
              this.settings = response;
              resolve(true);
        });
      });
    }

    getApiRoot() {
        if (!this.settings) {
            return 'SERVER';
        }
        return this.settings.apiRoot;
    }

    appPurpose() {
        if (!this.settings) {
            return 'PUBLIC';
        }
        return this.settings.appPurpose;
    }

    executionPeriod() {
        if (!this.settings) {
            return 2 * 60 * 60 * 1000;
        }
        return this.settings.lockPeriodInMs == null ? (2 * 60 * 60 * 1000) : this.settings.lockPeriodInMs;
    }
}
