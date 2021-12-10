import { NativeDateAdapter } from '@angular/material';

export class UserDateAdapter extends NativeDateAdapter {
  parse(value: any): Date | null {
    //Your custom parse method 
    if ((typeof value === 'string') && (value.indexOf('.') > -1) &&
      value.length == 10) {
      const str = value.split('.');
      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const date = Number(str[0]);
      return new Date(year, month, date);
    } else {
      return new Date(undefined);
    }
  }
}

export const DateFormat = {
  parse: {
    dateInput: 'input',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD.MM.YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};