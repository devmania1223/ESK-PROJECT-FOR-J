import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'html2text' })
export class HtmlToTextPipe implements PipeTransform {
  transform(value: string) {
    var index = 0;

    if (value == null || value == undefined || value == "")
      return value;

    var result = "";
    var skip = false;

    while(index < value.length){
      if (value[index] == "<"){
        skip = true;
      }

      if (!skip)
        result += value[index];

      if (value[index] == ">"){
        skip = false;
      }

      index++;
    }

    return result;
  }
}