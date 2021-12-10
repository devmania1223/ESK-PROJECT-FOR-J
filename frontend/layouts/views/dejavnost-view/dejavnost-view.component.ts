import { Component, OnInit, Injector } from '@angular/core';
import { DejavnostService } from '../../../_services/dejavnost.service';
import { PagedViewComponent } from '../base/paged-view-component';

@Component({
  selector: 'in-dejavnost-view',
  templateUrl: './dejavnost-view.component.html',
  styleUrls: ['./dejavnost-view.component.scss', "../../../app.component.css"]
})

export class DejavnostViewComponent extends PagedViewComponent implements OnInit {

  constructor(
    injector: Injector,
    myService: DejavnostService) {
    super(injector, myService);
    this.permission = "DEJAVNOST_AZURIRAJ";
  }

  ngOnInit(): void {
    this.executeQuery();
  }
}