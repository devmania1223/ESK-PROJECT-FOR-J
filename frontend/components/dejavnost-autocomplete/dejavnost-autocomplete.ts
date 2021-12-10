import { Component } from '@angular/core';
import { DejavnostService } from 'app/_services/dejavnost.service';
import { BaseAutoCompleteComponent } from '../base-autocomplete.component/base-autocomplete.component';

@Component({
  selector: 'esk-dejavnost-autocomplete',
  templateUrl: '../base-autocomplete.component/base-autocomplete.component.html',
  styleUrls: ['../base-autocomplete.component/base-autocomplete.component.scss'],
})

export class EskDejavnostAutoCompleteComponent extends BaseAutoCompleteComponent {
  constructor(service: DejavnostService) {
    super(service);
  }

  public valueMapper(key:any) {
    if (key === null || key === undefined)
      return "";

    return key.naziv;
  };
}
