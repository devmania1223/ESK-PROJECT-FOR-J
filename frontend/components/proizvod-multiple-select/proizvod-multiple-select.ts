import { Component, Input, SimpleChange, OnChanges, OnDestroy } from "@angular/core";
import { BaseControl } from "app/layouts/views/base/base.control";
import { PagedQuery } from "app/_models/pagedQuery";
import { Subject, Subscription } from "rxjs";
import { ValuePair } from "app/_models/valuePair";
import { ProizvodService } from "app/_services/proizvod.service";
import { ZascitenProizvod } from "app/_models/zasciten-proizvod";
import { Helpers } from "app/_shared/helpers";
import { Proizvod } from "app/_models/proizvod";
import { ParentToProizvod } from "app/_models/parent-to-proizvod";
import { CertifikatProizvod } from "app/_models/certifikat-proizvod";
import { untilDestroyed } from "ngx-take-until-destroy";

/** @title Select with multiple selection */
@Component({
  selector: 'proizvod-multiple-select',
  templateUrl: 'proizvod-multiple-select.html',
  styleUrls: ['proizvod-multiple-select.css'],
})

export class ProizvodMultipleSelectComponent extends BaseControl implements OnChanges {

  page: PagedQuery = new PagedQuery();
  searchTermChanged: Subject<string> = new Subject<string>();
  condition = new ValuePair({ id: "*", value: "" });
  @Input() public zascitenProizvod: ZascitenProizvod;
  defaultValuePassed = false;

  constructor(private service: ProizvodService, private utils: Helpers) {
    super();
    this.page.resultPerPage = 10;
    this.page.currentPage = 0;

    this.page.conditions = [];
    this.page.conditions.push(this.condition);
  }

  ngOnChanges(changes: any) {
    if (changes.zascitenProizvod) {
      let change: SimpleChange = changes.zascitenProizvod;
      if (this.utils.getValueOrDefault(change.currentValue) !== this.utils.getValueOrDefault(change.previousValue)) {
        if (this.defaultValuePassed) {
          this.value = null;
        }
        else {
          this.defaultValuePassed = true;
        }

        this.executeQuery();
      }
    }
  }

  private executeQuery() {
    if (this.paramsValid()) {
      this.service.getProizvodList4ZascitenProizvod(this.zascitenProizvod.id).pipe(untilDestroyed(this)).subscribe(data => {
        this.page.populate(data);
      }, error => {
        
        this.page.reset();
      });
    }
    else {
      this.page.reset();
    }
  }

  paramsValid(): boolean {

    if (!this.zascitenProizvod || !this.zascitenProizvod.id) {
      return false;
    }

    if (!this.zascitenProizvod.shema || !this.zascitenProizvod.shema.id) {
      return false;
    }

    return true;
  }

  selectionChange(event: any) {
    // we need to manipulate result outside, because this form is used for multiple objects like (Certifikat, Zascitni znak ...)
    this.valueChange.emit(event.value);
  }

  public valueMapper(key: any) {
    if (key === null || key === undefined)
      return "";

    return key.naziv;
  };

  compareObjects(proizvod: Proizvod, value2: ParentToProizvod): boolean {
    let result = (proizvod && value2) && proizvod.id === value2.idProizvod;
    return result;
  }

  public getText() {
    let selItems: CertifikatProizvod[] = this.value;
    let allList: Proizvod[] = this.page.result;

    let result = "";

    if (selItems) {
      selItems.forEach(certifikatProizvod => {
        allList.forEach(proizvod => {
          if (proizvod.id == certifikatProizvod.idProizvod) {
            result += proizvod.naziv + ",";
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