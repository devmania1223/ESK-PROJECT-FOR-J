import { Component, EventEmitter, Output, Injector, Input, OnInit } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { AuthenticationService } from 'app/_services';
import { BaseCommonComponent } from 'app/layouts/views/base/base-common.component';
import { ConfigService } from 'app/_services/settings.service';

@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload.component.html',
  styleUrls: ['file-upload.component.scss'],
})

export class FileUploadComponent extends BaseCommonComponent implements OnInit {
  private URL: string;
  uploader: FileUploader;
  public error: string = null;
  uploadAction = "CERTIFIKAT";
  @Input() set action(value: string) {
    this.uploadAction = value;
    this.uploadSuccess = false;
  }
  uploadSuccess = false;

  @Output() public onClose: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onResponse: EventEmitter<any> = new EventEmitter<any>();

  constructor(private auth: AuthenticationService, injector: Injector, private config: ConfigService) {
    super(injector);
  }

  ngOnInit(): void {
    const token = this.auth.getToken();
    const headers = [{name: 'Accept', value: 'application/json'}, {name: 'Authorization', value: 'Bearer ' + token}];
    this.URL = this.config.getApiRoot() + '/files/upload?action=' + this.uploadAction;
    this.uploader = new FileUploader({ url: this.URL, removeAfterUpload: false, autoUpload: true, headers: headers,  });

    this.uploader.onErrorItem = (item: FileItem, response: any) => {
      this.showProgress(false);
      this.uploadSuccess = false;
      const result = JSON.parse(response);
      console.log("napaka - error: " + response);
      if (result.status === 409) {   
        this.toastr.warning("Med uvozom datoteke je prišlo do nekaterih napak. Prosimo, da jih odpravite in ponovite uvoz.", 'Uvoz datotek'); 
        this.error = result.message;
        return;
      } 
      if (result.status === 401) {
        this.auth.logout();
        this.toastr.error("Prijavno sejo ni mogoče vzpostaviti.", 'Neavtoriziran dostop');
        this.error = "Prijavno sejo ni mogoče vzpostaviti.";
        return;
      }

      if (result.status === 500) {
        this.toastr.error('Interna strežniška napaka', 'Napaka');
        return;
      }
      
      this.toastr.warning('Med prenosom je prišlo do napake. Lahko da gre za preveliko datoteko!');
    };

    this.uploader.onSuccessItem = (item: FileItem, response: string) => {
      this.toastr.info('Datoteka uspešno obdelana!');
      this.uploadSuccess = true;
      this.showProgress(false);
      this.onResponse.emit(JSON.parse(response));
    };

    this.uploader.onBeforeUploadItem = () => {
      console.log("Uploading file ...");
      this.error = null;
      this.showProgress(true);
      this.uploadSuccess = false;
    };
  }

  close(result: any) {
    this.onClose.emit(result);
  }
}
