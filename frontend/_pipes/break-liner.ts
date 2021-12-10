import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'break-line' })
export class BreakLinePipe implements PipeTransform {
  transform(value: string, limit = 20, patternToFind: string = ' ', patternToReplace: string = '<br>') {
    if (value === null || value === undefined || value.length === 0 || value.trim() === '') {
      return value;
    }

    const myArray = value.split(patternToFind);
    let totalLength = 0;
    let lineNum = 1;
    const breakList = new Array<number>();

    myArray.forEach(element => {
      if (totalLength + element.length > lineNum * limit) {
        if (Math.abs(totalLength - (lineNum * limit)) < Math.abs(totalLength + element.length - (lineNum * limit))) {
          breakList.push(totalLength);
        } else {
          breakList.push(totalLength + element.length);
        }
        totalLength += element.length;
        lineNum++;
      }
    });

    let result = '';
    totalLength = 0;

    myArray.forEach(element => {
      totalLength += element.length;
      result += element;

      if (breakList.findIndex(x => x === totalLength)) {
        result += patternToReplace;
      } else {
        result += patternToFind;
      }
    });

    return result;
  }
}
