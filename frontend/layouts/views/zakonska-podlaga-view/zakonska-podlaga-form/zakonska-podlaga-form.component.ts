import { ZakonskaPodlagaService } from '../../../../_services/zakonska-podlaga.service';
import { Component, Injector } from '@angular/core';
import { BaseFormComponent } from '../../base/base-form.component';

@Component({
  selector: 'esk-zakonska-podlaga-form',
  templateUrl: './zakonska-podlaga-form.component.html',
  styleUrls: ['./zakonska-podlaga-form.component.scss', "../../../../app.component.css"]
})

export class ZakonskaPodlagaFormComponent extends BaseFormComponent {

  constructor(injector: Injector, service: ZakonskaPodlagaService) {
    super(injector, service)
  }

  public tools: object = {
    items: [
      'Bold', 'Italic', 'Underline', '|',
      'FontSize', 'FontColor', '|',
      'Alignments', '|'
    ]
  };
}