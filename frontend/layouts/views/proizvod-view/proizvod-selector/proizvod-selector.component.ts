import { ProizvodService } from '../../../../_services/proizvod.service';
import { Component, Injector, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { BaseFormComponent } from '../../base/base-form.component';
import { Shema } from 'app/_models/shema';
import { Proizvod } from 'app/_models/proizvod';
import { ZascitenProizvod } from 'app/_models/zasciten-proizvod';
import { ParentToProizvod } from 'app/_models/parent-to-proizvod';
import { ShemaService } from 'app/_services/shema.service';
import { PagedQuery } from 'app/_models/pagedQuery';
import { ValuePair } from 'app/_models/valuePair';
import { error } from 'protractor';

@Component({
  selector: 'proizvod-selector',
  templateUrl: './proizvod-selector.component.html',
  styleUrls: ['./proizvod-selector.component.scss', "../../../../app.component.css"]
})

export class ProizvodSelectorComponent extends BaseFormComponent implements OnInit {
  @Input() public readonly: boolean;
  @Input() public zascitenProizvod: ZascitenProizvod;
  @Input() public proizvodi: ParentToProizvod;
  @Input() public shema: Shema; // need for nested object and nullable reference
  @Output() public onShemaChanged: EventEmitter<Shema> = new EventEmitter();
  @Output() public onProizvodiChanged: EventEmitter<Proizvod[]> = new EventEmitter();
  @Output() public onZascitenProizvodChanged: EventEmitter<ZascitenProizvod> = new EventEmitter();
  public shemaList: Shema[] = [];

  constructor(
    injector: Injector,
    private shemaService: ShemaService,
    service: ProizvodService) {
    super(injector, service);
  }

  ngOnInit() {
    super.ngOnInit();

    const page = new PagedQuery();
    page.resultPerPage = 1000;
    page.currentPage = 0;

    page.conditions = [];
    page.conditions.push(new ValuePair({ id: 'query', value: '' }));

    if (!this.selectedValue) {
      this.selectedValue = {};
    }

    if (!this.zascitenProizvod) {
      this.zascitenProizvod = new ZascitenProizvod();
    }

    this.shemaService.list(page).subscribe(
      data => {
        this.shemaList = data.result;
        this.shema = this.zascitenProizvod.shema;
        console.log(this.shema);
      },
      error1 => {
        console.log(error1);
      }
    );
  }
  shemaChanged(value: Shema) {
    this.zascitenProizvod = null;
    this.onZascitenProizvodChanged.emit(null);
    this.onProizvodiChanged.emit(null);
    this.onShemaChanged.emit(value);
  }

  zascitenProizvodChanged(value: ZascitenProizvod) {
    this.onZascitenProizvodChanged.emit(value);
    this.onProizvodiChanged.emit(null);
  }

  proizvodiChanged(proizvodi: Proizvod[]) {
    this.onProizvodiChanged.emit(proizvodi);
  }

  compareShema(i1, i2) {
    return i1 && i2 && i1.id === i2.id;
  }
}
