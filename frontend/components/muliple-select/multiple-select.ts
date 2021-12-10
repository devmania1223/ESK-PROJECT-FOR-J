import {Component} from '@angular/core';
import { BaseControl } from 'app/layouts/views/base/base.control';

/** @title Select with multiple selection */
@Component({
  selector: 'multiple-select',
  templateUrl: 'multiple-select.html',
  styleUrls: ['multiple-select.css'],
})

export class MultipleSelectComponent extends BaseControl {
  public selection: string[];

  constructor() {
    super();
  }
}