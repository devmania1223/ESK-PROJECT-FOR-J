import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { ZascitenProizvodService } from 'app/_services/zasciten-proizvod.service';
import { BaseAutoCompleteComponent } from '../base-autocomplete.component/base-autocomplete.component';
import { Shema } from 'app/_models/shema';
import { Helpers } from 'app/_shared/helpers';
import 'linqts';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'zasciten-proizvod-autocomplete',
  templateUrl: '../base-autocomplete.component/base-autocomplete.component.html',
  styleUrls: ['../base-autocomplete.component/base-autocomplete.component.scss'],
})

export class ZascitenProizvodAutoCompleteComponent extends BaseAutoCompleteComponent {
  @Input() public shema: Shema;
  zpService: ZascitenProizvodService;

  constructor(service: ZascitenProizvodService, private utils: Helpers) {
    super(service);
    this.zpService = service;
  }

  ngOnChanges(changes: any) {
    if (changes.shema) {
      const shema: SimpleChange = changes.shema;
      if (this.utils.getValueOrDefault(shema.currentValue) !== this.utils.getValueOrDefault(shema.previousValue)) {
        this.reloadData();
      }
    }
  }

  private reloadData() {
    if (!this.shema || !this.shema.id) {
      this.page.reset();
    } else {
      this.zpService.listByShema(this.shema).pipe(untilDestroyed(this)).subscribe(
        data => { this.page.populate(data); },
        error => { this.page.reset() });
    }
  }

  // Override BASE mathod to do nothing
  onFind() {
  }

  public valueMapper(key: any) {
    if (key === null || key === undefined) {
      return '';
    }
    return key.naziv;
  }

  keyDown(value: string) {
    console.log(event);
    if (!value || value === null || value === undefined || value.trim() === '') {
      this.valueChange.emit(null);
    }

    this.onFind();
  }
}
