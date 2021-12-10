import { ProizvodService } from '../../../../_services/proizvod.service';
import { Component, Injector, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseFormComponent } from '../../base/base-form.component';
import { PagedQuery } from 'app/_models/pagedQuery';
import { ShemaService } from 'app/_services/shema.service';
import { Shema } from 'app/_models/shema';
import { ZascitenProizvod } from 'app/_models/zasciten-proizvod';
import { Proizvod } from 'app/_models/proizvod';
import { ZascitenProizvodService } from 'app/_services/zasciten-proizvod.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'proizvod-form',
  templateUrl: './proizvod-form.component.html',
  styleUrls: ['./proizvod-form.component.scss', "../../../../app.component.css"]
})

export class ProizvodFormComponent extends BaseFormComponent implements OnInit {
  public shemaPage = new PagedQuery();
  public shemaResult = [];
  public zakonPage = new PagedQuery();
  public zascitenProizvodPage = new PagedQuery();
  public zascitenProizvodResult = [];
  public proizvodPage = new PagedQuery();
  public proizvod: Proizvod;
  @Output() public valueChanged: EventEmitter<any> = new EventEmitter();

  private shemaService: ShemaService;
  private zascitenProizvodService: ZascitenProizvodService;

  constructor(
    private injector: Injector,
    service: ProizvodService) {
    super(injector, service);

    this.shemaService = this.injector.get(ShemaService);
    this.zascitenProizvodService = this.injector.get(ZascitenProizvodService);

    this.shemaPage.currentPage = 0;
    this.shemaPage.resultPerPage = 0; // no pageing -> all data instead
    this.zascitenProizvodPage.currentPage = 0;
    this.zascitenProizvodPage.resultPerPage = 0; // no pageing -> all data instead
  }

  ngOnInit() {
    this.proizvod = <Proizvod>this.selectedValue;

    if (!this.proizvod.zascitenProizvod) {
      this.proizvod.zascitenProizvod = new ZascitenProizvod();
      this.proizvod.zascitenProizvod.naziv = "";
    }

    if (!this.proizvod.zascitenProizvod.shema) {
      this.proizvod.zascitenProizvod.shema = new Shema();
      this.proizvod.zascitenProizvod.shema.naziv = "";
    }

    super.ngOnInit();
    this.reload();
  }

  public reload() {
    this.reloadShema();

    if (this.existsShema()) {
      this.reloadZascitenProizvod();
    }
  }

  createList(page: PagedQuery): string[] {
    if (!page || !page.result || page.result.length === 0) {
      return [];
    }

    return page.result.Select(x => x.naziv).ToArray();
  }

  public reloadShema() {
    this.shemaService.list(this.shemaPage).pipe(untilDestroyed(this)).subscribe(data => {
      this.shemaPage.populate(data);
      this.shemaResult = this.createList(this.shemaPage);
    });
  }

  public reloadZascitenProizvod() {
    if (this.existsShema()) {
      this.zascitenProizvodService.listByShema(this.proizvod.zascitenProizvod.shema).pipe(untilDestroyed(this)).subscribe(
        data => {
          this.zascitenProizvodPage.result = data.result;
          this.zascitenProizvodResult = this.createList(this.zascitenProizvodPage);
        });
    } else {
      this.zascitenProizvodPage.reset();
      this.zascitenProizvodResult = this.createList(this.zascitenProizvodPage);
    }
  }

  public existsShema(): boolean {
    return (this.proizvod && this.proizvod.zascitenProizvod.shema && !!this.proizvod.zascitenProizvod.shema.id);
  }

  public existsZascita(): boolean {
    return this.existsShema() && this.proizvod.zascitenProizvod && this.proizvod.zascitenProizvod.naziv !== "";
  }

  shemaChanged() {
    let value = <Proizvod>this.proizvod;
    let foundShema = (<Shema[]>this.shemaPage.result).First(x => x.naziv.toLowerCase() === value.zascitenProizvod.shema.naziv.toLowerCase());

    if (foundShema) {
      value.zascitenProizvod.shema = this.utils.clone(foundShema);
      this.reloadZascitenProizvod();
    }
    else {
      this.proizvod.zascitenProizvod.shema.id = null;
      this.zascitenProizvodPage.reset();
      this.zascitenProizvodResult = this.createList(this.zascitenProizvodPage);
    }
  }

  zascitenProizvodChanged() {
    let value = <Proizvod>this.proizvod;
    let foundZascitenProizvod = null;
    if (this.zascitenProizvodPage.result && this.zascitenProizvodPage.result.length > 0) {
      foundZascitenProizvod = (<ZascitenProizvod[]>this.zascitenProizvodPage.result).First(x => x.naziv.toLowerCase() === value.zascitenProizvod.naziv.toLowerCase());
    }

    if (foundZascitenProizvod) {
      value.zascitenProizvod = this.utils.clone(foundZascitenProizvod);
    }
    else {
      value.zascitenProizvod.id = null;
    }
  }
}