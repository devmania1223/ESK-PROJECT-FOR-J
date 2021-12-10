import { ShemaService } from '../../../../_services/shema.service';
import { Component, Injector } from '@angular/core';
import { BaseFormComponent } from '../../base/base-form.component';

@Component({
  selector: 'esk-shema-form',
  templateUrl: './shema-form.component.html',
  styleUrls: ['./shema-form.component.scss',"../../../../app.component.css"]
})

export class ShemaFormComponent extends BaseFormComponent{
  constructor(injector: Injector, service: ShemaService) { 
    super(injector, service)
  }
}