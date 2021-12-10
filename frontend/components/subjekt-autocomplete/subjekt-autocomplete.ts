import { Component, Input } from '@angular/core';
import { SubjektService } from 'app/_services/subjekt.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { BaseControl } from 'app/layouts/views/base/base.control';
import { PagedQuery } from 'app/_models/pagedQuery';
import { Subject } from 'rxjs';
import { ValuePair } from 'app/_models/valuePair';

@Component({
  selector: 'esk-subjekt-autocomplete',
  templateUrl: 'subjekt-autocomplete.component.html',
  styleUrls: ['subjekt-autocomplete.component.scss'],
})

export class EskSubjektAutoCompleteComponent extends BaseControl {
  @Input() public readonly: boolean;
  page: PagedQuery = new PagedQuery();
  searchTermChanged: Subject<any> = new Subject<any>();
  condition = new ValuePair({ id: 'query', value: '' });

  constructor(private service: SubjektService) {
    super();
  }

  onFind() {

    if (this.readonly) {
      return;
    }

    this.page.conditions = [];
    this.page.conditions.push(new ValuePair({ id: 'query', value: this.value }));

    this.service.list(this.page).pipe(untilDestroyed(this)).subscribe(
      data => {
        this.page.populate(data);
      }
    );
  }

  public valueMapper(key: any) {
    if (key === null || key === undefined) {
      return '';
    }

    if (key.id === null || key.id === undefined) {
      return '';
    }
    let value = key.kmgmid === null ? '' : key.kmgmid;

    if (value !== '') {
      value += ' | ';
    }

    value += (key.naziv === null ? key.ime + ' ' + key.priimek : key.naziv) + ', ';
    value += key.naslov;

    return value;
  }

  reset() {
    this.value = null;
    this.valueChange.emit(null);
    this.page.reset();
  }

  selectedOption(value: any) {
    if (this.readonly) {
      return;
    }

    this.value = value;
    this.valueChange.emit(value);
  }

  public keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onFind();
    }
  }
}
