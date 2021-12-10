import { Component, OnInit, Injector } from '@angular/core';
import { ZakonskaPodlagaService } from '../../../_services/zakonska-podlaga.service';
import { PagedViewComponent } from '../base/paged-view-component';

@Component({
  selector: 'in-zakonska-podlaga-view',
  templateUrl: './zakonska-podlaga-view.component.html',
  styleUrls: ['./zakonska-podlaga-view.component.scss', "../../../app.component.css"]
})

export class ZakonskaPodlagaViewComponent extends PagedViewComponent implements OnInit {

  constructor(
    injector: Injector,
    myService: ZakonskaPodlagaService) {
    super(injector, myService);
    this.permission = "ZAK_PODL_AZURIRAJ";
  }

  ngOnInit(): void {
    this.executeQuery();
  }
}