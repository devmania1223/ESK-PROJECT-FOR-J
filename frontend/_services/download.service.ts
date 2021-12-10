import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as fileSaver from 'file-saver'; // npm i --save file-saver
import { CRUDService } from './CRUD.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DownloadService extends CRUDService<any> {

  constructor(http: HttpClient, private toastr: ToastrService) {
    super(http, 'files');
  }

  downloadFileSystem(filename: string): Observable<HttpResponse<Blob>> {
    return this.download('server/files/pdf/', filename);
  }

  download(url: string, filename: string): Observable<HttpResponse<Blob>> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/pdf; charset=utf-8');
    headers = headers.append('Accept', 'application/json; charset=utf-8');

    return this.http.get(url + filename, {
      headers: headers,
      observe: 'response',
      responseType: 'blob'
    });
  }

  saveFile(data: any, filename?: string) {
    if (data.size === 0) {
      this.toastr.info('Datoteka ne obstaja.');
      return;
    }

    const blob = new Blob([data], { type: 'application/pdf; charset=utf-8' });
    fileSaver.saveAs(blob, filename);
  }
}
