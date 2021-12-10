import { Component, OnInit, Injector } from '@angular/core';
import { ShemaService } from '../../../_services/shema.service';
import { PagedViewComponent } from '../base/paged-view-component';

@Component({
  selector: 'in-shema-view',
  templateUrl: './shema-view.component.html',
  styleUrls: ['./shema-view.component.scss',"../../../app.component.css"]
})

export class ShemaViewComponent extends PagedViewComponent implements OnInit {

  constructor(
    injector: Injector,
    myService: ShemaService) {
    super(injector, myService);
    }

  ngOnInit(): void {
    this.executeQuery();
  }
}