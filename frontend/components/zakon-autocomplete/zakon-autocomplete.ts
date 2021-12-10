import { Component } from '@angular/core';
import { ZakonskaPodlagaService } from 'app/_services/zakonska-podlaga.service';
import { BaseAutoCompleteComponent } from '../base-autocomplete.component/base-autocomplete.component';

@Component({
  selector: 'esk-zakon-autocomplete',
  templateUrl: '../base-autocomplete.component/base-autocomplete.component.html',
  styleUrls: ['../base-autocomplete.component/base-autocomplete.component.scss'],
})

export class ZakonskaPodlagaAutoCompleteComponent extends BaseAutoCompleteComponent {
  constructor(service: ZakonskaPodlagaService) {
    super(service);
  }

  public valueMapper(key:any) {
    if (key === null || key === undefined)
      return "";

    return key.stevilka;
  };
}
