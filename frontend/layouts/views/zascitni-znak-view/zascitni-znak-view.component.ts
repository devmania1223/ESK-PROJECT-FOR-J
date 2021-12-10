import { Component, OnInit, Injector } from '@angular/core';
import { ZascitniZnakService } from '../../../_services/zascitni-znak.service';
import { PagedViewComponent } from '../base/paged-view-component';

@Component({
  selector: 'in-zascitni-znak-view',
  templateUrl: './zascitni-znak-view.component.html',
  styleUrls: ['./zascitni-znak-view.component.scss', "../../../app.component.css"]
})

export class ZascitniZnakViewComponent extends PagedViewComponent implements OnInit {

  constructor(
    injector: Injector,
    myService: ZascitniZnakService) {
    super(injector, myService);
    this.permission = "ZZNAK_AZURIRAJ";
  }

  ngOnInit(): void {
    this.executeQuery();
  }
}