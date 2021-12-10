import { Component, Injector } from '@angular/core';
import { AuthenticationService } from 'app/_services';
import { PagedViewComponent } from 'app/layouts/views/base/paged-view-component';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent  extends PagedViewComponent {

  public showFileUpload = true;
  public action: string = "CERTIFIKAT";

  constructor(injector: Injector, public user: AuthenticationService) { 
    super(injector);
  }

  import(action: string){
    this.showFileUpload = true;
    this.action = action;
  }

  onUploadClose(result: any) {
    this.showFileUpload = false;
  }
}
