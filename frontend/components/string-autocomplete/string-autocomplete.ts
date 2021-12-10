import { Component } from '@angular/core';
import { BaseControl } from 'app/layouts/views/base/base.control';
import { Helpers } from 'app/_shared/helpers';

@Component({
  selector: 'string-autocomplete',
  templateUrl: 'string-autocomplete.html',
  styleUrls: ['string-autocomplete.scss']
})

export class StringAutoCompleteComponent extends BaseControl {
  public filteredData: any[];
  
  constructor(private utils: Helpers) {
    super();
  }

  onFind() {
    this.valueChange.emit(this.value);

    if (!this.data || this.data.length === 0) {
      this.filteredData = [];
      return;
    }

    let val = this.utils.getValueOrDefault(this.value);
    this.filteredData = this.data.filter(option => option && option.toLowerCase().indexOf(val.toLowerCase()) > -1);
  }

  selectedOption(value: any) {
    this.value == this.utils.getValueOrNull(value);
    this.valueChange.emit(this.value);
  }
}
