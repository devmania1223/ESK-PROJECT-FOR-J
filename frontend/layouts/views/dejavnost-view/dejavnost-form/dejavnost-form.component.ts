import { DejavnostService } from '../../../../_services/dejavnost.service';
import { Component, Injector } from '@angular/core';
import { BaseFormComponent } from '../../base/base-form.component';

@Component({
  selector: 'esk-dejavnost-form',
  templateUrl: './dejavnost-form.component.html',
  styleUrls: ['./dejavnost-form.component.scss',"../../../../app.component.css"]
})

export class DejavnostFormComponent extends BaseFormComponent{
  constructor(injector: Injector, service: DejavnostService) { 
    super(injector, service)
  }
}