import { Component, Input, SimpleChange, OnChanges, OnInit } from '@angular/core';
import { BaseControl } from 'app/layouts/views/base/base.control';
import { PagedQuery } from 'app/_models/pagedQuery';
import { Subject } from 'rxjs';
import { ValuePair } from 'app/_models/valuePair';
import { DejavnostService } from 'app/_services/dejavnost.service';
import { Helpers } from 'app/_shared/helpers';
import { Dejavnost } from 'app/_models/dejavnost';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'esk-dejavnost-multiple-select',
  templateUrl: 'dejavnost-multiple-select.html',
  styleUrls: ['dejavnost-multiple-select.css'],
})

export class DejavnostMultipleSelectComponent extends BaseControl implements OnInit {
  page: PagedQuery = new PagedQuery();
  searchTermChanged: Subject<string> = new Subject<string>();
  condition = new ValuePair({ id: '*', value: '' });
  defaultValuePassed = false;
  @Input() public multi = true;

  constructor(private service: DejavnostService, private utils: Helpers) {
    super();
    this.page.resultPerPage = 1000;
    this.page.currentPage = 0;

    this.page.conditions = [];
    this.page.conditions.push(this.condition);
  }

  ngOnInit(): void {
    this.executeQuery();
  }

  public executeQuery(): void {
    this.service.list(this.page).pipe(untilDestroyed(this)).subscribe(
      data => {
        data.result = data.result.OrderBy(x => x.naziv).ToArray();
        this.page.populate(data);
        console.log(this.value);
      },
      error => {  this.page.reset(); });
  }

  selectionChange(event: any) {
    // we need to manipulate result outside,
    // because this form is used for multiple objects like (Certifikat, Zascitni znak ...)
    this.valueChange.emit(event.value);
  }

  public valueMapper(key: any) {
    if (key === null || key === undefined) {
      return '';
    }

    return key.naziv;
  }

  compareObjects(d: Dejavnost, cd: Dejavnost): boolean {
    const result = (d && cd) && d.id === cd.id;
    return result;
  }

  public getText() {
    const selItems: Dejavnost[] = this.value;
    const allList: Dejavnost[] = this.page.result;

    let result = '';

    if (selItems) {
      selItems.forEach(dejavnost2 => {
        allList.forEach(dejavnost => {
          if (dejavnost.id === dejavnost2.id) {
            result += dejavnost.naziv + ',';
          }
        });
      });
    }

    if (result.length > 0) {
      result = result.substring(0, result.length - 1);
    }

    return result;
  }
}
