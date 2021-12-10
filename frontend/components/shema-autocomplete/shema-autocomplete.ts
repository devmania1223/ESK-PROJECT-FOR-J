import { Component } from '@angular/core';
import { ShemaService } from 'app/_services/shema.service';
import { BaseAutoCompleteComponent } from '../base-autocomplete.component/base-autocomplete.component';

@Component({
  selector: 'shema-autocomplete',
  templateUrl: '../base-autocomplete.component/base-autocomplete.component.html',
  styleUrls: ['../base-autocomplete.component/base-autocomplete.component.scss'],
})

export class ShemaAutoCompleteComponent extends BaseAutoCompleteComponent {
  constructor(service: ShemaService) {
    super(service);
  }

  public valueMapper(key:any) {
    if (key === null || key === undefined)
      return "";

    return key.naziv;
  };
}
