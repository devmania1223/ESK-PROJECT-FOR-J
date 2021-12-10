import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import "linqts";
import { Helpers } from 'app/_shared/helpers';
import { GridApi } from 'ag-grid-community';

@Injectable()
export class ExcelService {

  constructor(private utils: Helpers) {
  }

  public toExportFileName(excelFileName: string): string {
    return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
  }

  public exportAsExcelFileAsync(columns: any[], json: any[], excelFileName: string): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.utils.isEmpty(json) || (this.utils.isEmpty(json))) {
          resolve();
        } else {
          let flat = this.toFlat(columns, json);
          const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(flat);
          const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          resolve(XLSX.writeFile(workbook, this.toExportFileName(excelFileName)));
        };
      }, 100);
    });
  };

  public toFlat(columns: any[], data: any[]): any[] {
    var flatArray = [];
    data.forEach(row => {
      let flatObject = {};
      this.flatenizeArray(row, columns, flatObject, "");
      flatArray.push(flatObject);
    });

    return flatArray;
  }
 
  private flatenizeArray(row: any, columns: any[], flatObject, path: string) 
  {
    for (var colIdx in columns){
      var col = columns[colIdx];
      if (col['headerName']===undefined || 'checkboxSelection' in col) continue;
      if (col['field']===undefined && 'cellRenderer' in col){
          var funValue = col.cellRenderer({ data: row });
          flatObject[col.headerName] = funValue;
      }else{
        var value = this.fetchFromObject(row,col['field']);
        flatObject[col.headerName] = value;
      }
    }
  }

  private fetchFromObject(obj, prop) {
    if(typeof obj === 'undefined') {
        return false;
    }
    var _index = prop.indexOf('.')
    if(_index > -1) {
        return this.fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
    }

    return this.toDateFormat(obj[prop]);
  }

  private toDateFormat(obj){
    if (this.utils.isDate(obj)){
      return this.utils.toDateString(obj);
    }
    return obj;
  }


  print(gridApi: GridApi, element: any) {
    this.setPrinterFriendly(gridApi, element);
    setTimeout(function () {
      print();
      this.setNormal(gridApi, element);
    }, 2000);
  }

  setPrinterFriendly(gridApi: GridApi, element: any) {
    if (!element.style) {
      element.style = {};
    }
    element.style.width = "";
    element.style.height = "";
    gridApi.setDomLayout("print");
  }
  setNormal(gridApi: GridApi, element: any) {
    element.style.width = "600px";
    element.style.height = "200px";
    gridApi.setDomLayout(null);
  }
}