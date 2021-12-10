import { Component, OnInit, Injector } from '@angular/core';
import { ProizvodService } from '../../../_services/proizvod.service';
import { PagedViewComponent } from '../base/paged-view-component';

@Component({
  selector: 'proizvod-view',
  templateUrl: './proizvod-view.component.html',
  styleUrls: ['./proizvod-view.component.scss',"../../../app.component.css"]
})

export class ProizvodViewComponent extends PagedViewComponent implements OnInit {

  constructor(
    injector: Injector,
    myService: ProizvodService) {
    super(injector, myService);
      this.permission = "PROIZVOD_AZURIRAJ";
  }

  ngOnInit(): void {
    this.executeQuery();
  }
}