import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ValuePair } from 'app/_models/valuePair';
import { BaseControl } from 'app/layouts/views/base/base.control';
import { PagedQuery } from 'app/_models/pagedQuery';
import { BaseService } from 'app/_services/base.service';
import { Component, Input } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'base-autocomplete',
  templateUrl: 'base-autocomplete.component.html',
  styleUrls: ['base-autocomplete.component.scss'],
})

export class BaseAutoCompleteComponent extends BaseControl {
  @Input() public readonly: boolean;
  page: PagedQuery = new PagedQuery();
  searchTermChanged: Subject<any> = new Subject<any>();
  condition = new ValuePair({ id: 'query', value: ''});

  constructor(private service: BaseService) {
    super();
    this.page.resultPerPage = 10;
    this.page.currentPage = 0;

    this.page.conditions = [];
    this.page.conditions.push(this.condition);
  }

  onFind() {
    console.log("OnFind");
    if (this.readonly) {
      return;
    }
    if (this.searchTermChanged.observers.length === 0) {
      this.searchTermChanged.pipe(debounceTime(500), distinctUntilChanged())
        .pipe(untilDestroyed(this)).subscribe(term => {
          const val: String = (term === Object(term)) || !term ? '' : term;
          this.condition.value = val;
          this.service.list(this.page).pipe(untilDestroyed(this)).subscribe(
            data => {
              console.log(data.result);
              this.page.populate(data);

              if (val === null || val === undefined || val.trim() === '') {
                this.value = null;
                this.valueChange.emit(null);
              }
            }
          );
        });
    }
    this.searchTermChanged.next(this.value);
  }

  selectedOption(value: any) {
    console.log("selectedOption");
    if (this.readonly) {
      return;
    }

    this.value = value;
    this.valueChange.emit(value);
  }

  keyDown(value: string) {
    console.log("keyDown");
    if (this.readonly) {
      return;
    }

    if (!value || value === null || value === undefined || value.trim() === '') {
      this.valueChange.emit(null);
    }

    this.onFind();
  }

  public valueMapper(value: any) {
    console.log(value);
  }
}
