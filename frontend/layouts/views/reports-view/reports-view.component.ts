import { Component, OnInit, Injector, ViewChild, ElementRef } from '@angular/core';
import { PagedViewComponent } from '../base/paged-view-component';
import { ReportsService } from 'app/_services/reports.service';
import { GridOptions } from 'ag-grid-community';
import { ValuePair } from 'app/_models/valuePair';
import { PagedQuery } from 'app/_models/pagedQuery';
import { List } from 'linqts';
import { ExcelService } from 'app/_services/excel.service';
import { DownloadService } from 'app/_services/download.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'esk-reports-view',
  templateUrl: './reports-view.component.html',
  styleUrls: ['./reports-view.component.scss', '../../../app.component.css']
})

export class ReportsViewComponent extends PagedViewComponent implements OnInit {
  public gridOptionsRPT1: GridOptions = <GridOptions>{};
  public gridOptionsRPT2: GridOptions = <GridOptions>{};
  public gridOptionsRPT3: GridOptions = <GridOptions>{};
  public gridOptionsRPT4: GridOptions = <GridOptions>{};
  public gridOptionsRPT5: GridOptions = <GridOptions>{};
  public gridOptionsRPT6: GridOptions = <GridOptions>{};
  public columnDefs1: any;
  public columnDefs2: any;
  public columnDefs3: any;
  public columnDefs4: any;
  public columnDefs5: any;
  public columnDefs6: any;
  public ProjectStatus: Array<any> = [];
  public searchConditions: List<ValuePair> = new List<ValuePair>();
  public page: PagedQuery = new PagedQuery();
  public year: number = (new Date()).getFullYear();
  public selectedOption = 'RPTALL';
  @ViewChild('myGrid', null) elGrid1: ElementRef;

  constructor(
    injector: Injector,
    private service: ReportsService, private excel: ExcelService, private downloadService: DownloadService) {
    super(injector, service);
  }

  ngOnInit(): void {
    this.page.currentPage = 0;
    this.page.resultPerPage = 0;

    this.initGrids();
  }

  initGrids() {
    this.columnDefs1 = [
      { headerName: 'Shema kakovosti', field: 'name' },
      {
        headerName: 'Število nosilcev', field: 'value', type: 'numericColumn'
      }
    ];

    this.utils.applyToolTipsToHeaderOnAgGrid(this.columnDefs1);
    this.columnDefs2 = [
      {
        headerName: 'Zaščiten proizvod ali proizvod iz sheme kakovosti IK', field: 'name'
      },
      {
        headerName: 'Število nosilcev', field: 'value', type: 'numericColumn'
      }
    ];
    this.utils.applyToolTipsToHeaderOnAgGrid(this.columnDefs2);
    this.columnDefs3 = [
      { headerName: 'Shema kakovosti', field: 'name' },
      {
        headerName: 'Število KMG-MID', field: 'value', type: 'numericColumn'
      }
    ];
    this.utils.applyToolTipsToHeaderOnAgGrid(this.columnDefs3);
    this.columnDefs4 = [
      {
        headerName: 'Zaščiten proizvod ali proizvod iz sheme kakovosti IK', field: 'name'
      },
      {
        headerName: 'Število KMG-MID', field: 'value', type: 'numericColumn'
      }
    ];
    this.utils.applyToolTipsToHeaderOnAgGrid(this.columnDefs4);
    this.columnDefs5 = [
      {
        headerName: 'Proizvod', field: 'name'
      },
      {
        headerName: 'Površina', field: 'value', type: 'numericColumn'
      },
      {
        headerName: 'Enota', field: 'unit'
      }
    ];
    this.utils.applyToolTipsToHeaderOnAgGrid(this.columnDefs5);
    this.columnDefs6 = [
      {
        headerName: 'Proizvod', field: 'name'
      },
      {
        headerName: 'Količina', field: 'value', type: 'numericColumn'
      },
      {
        headerName: 'Enota', field: 'unit'
      }
    ];

    this.utils.applyToolTipsToHeaderOnAgGrid(this.columnDefs6);

    this.gridOptionsRPT1 = {
      defaultColDef: {
        editable: false,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        tooltip: (params) => {
          return params.value;
        }
      },
      suppressRowClickSelection: true,
      groupSelectsChildren: true,
      debug: true,
      rowSelection: 'multiple',
      enableRangeSelection: true,
      columnDefs: this.columnDefs1,
      pagination: true,
      enableCellTextSelection: true
    };
    this.gridOptionsRPT2 = {
      defaultColDef: {
        editable: false,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        tooltip: (params) => {
          return params.value;
        }
      },
      suppressRowClickSelection: true,
      groupSelectsChildren: true,
      debug: true,
      rowSelection: 'multiple',
      enableRangeSelection: true,
      columnDefs: this.columnDefs2,
      pagination: true,
      enableCellTextSelection: true
    };
    this.gridOptionsRPT3 = {
      defaultColDef: {
        editable: false,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        tooltip: (params) => {
          return params.value;
        }
      },
      suppressRowClickSelection: true,
      groupSelectsChildren: true,
      debug: true,
      rowSelection: 'multiple',
      enableRangeSelection: true,
      columnDefs: this.columnDefs3,
      pagination: true,
      enableCellTextSelection: true
    };
    this.gridOptionsRPT4 = {
      defaultColDef: {
        editable: false,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        tooltip: (params) => {
          return params.value;
        }
      },
      suppressRowClickSelection: true,
      groupSelectsChildren: true,
      debug: true,
      rowSelection: 'multiple',
      enableRangeSelection: true,
      columnDefs: this.columnDefs4,
      pagination: true,
      enableCellTextSelection: true
    };
    this.gridOptionsRPT5 = {
      defaultColDef: {
        editable: false,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        tooltip: (params) => {
          return params.value;
        }
      },
      suppressRowClickSelection: true,
      groupSelectsChildren: true,
      debug: true,
      rowSelection: 'multiple',
      enableRangeSelection: true,
      columnDefs: this.columnDefs5,
      pagination: true,
      enableCellTextSelection: true
    };
    this.gridOptionsRPT6 = {
      defaultColDef: {
        editable: false,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        tooltip: (params) => {
          return params.value;
        }
      },
      suppressRowClickSelection: true,
      groupSelectsChildren: true,
      debug: true,
      rowSelection: 'multiple',
      enableRangeSelection: true,
      columnDefs: this.columnDefs6,
      pagination: true,
      enableCellTextSelection: true
    };
  }

  onSearch() {
    this.searchConditions = new List<ValuePair>();
    this.searchConditions.Add(new ValuePair({ id: 'report', value: this.selectedOption }));
    this.searchConditions.Add(new ValuePair({ id: 'year', value: this.year.toString() }));
    this.page.conditions = this.searchConditions.ToArray();
    this.service.list(this.page).pipe(untilDestroyed(this)).subscribe(
      data => {
        this.page.result = data;
        this.page.resultLength = data.length;
      },
      error => {
        
        this.toastr.error('Napaka pri pridobivanju podatkov.', 'Poročila')
      }
    );
  }

  onGridReady(params) {
    params.api.sizeColumnsToFit();
  }

  resetData(){
    this.page.result = [];
    console.log('On reset data ...')
  }

  exportToExcel() {
    this.showProgress(true);
    if (this.selectedOption === 'RPT1'){
      this.excel.exportAsExcelFileAsync(this.columnDefs1, this.page.result, 'poročilo_rpt1');
    }
    if (this.selectedOption === 'RPT2'){
      this.excel.exportAsExcelFileAsync(this.columnDefs2, this.page.result, 'poročilo_rpt2');
    }
    if (this.selectedOption === 'RPT3'){
      this.excel.exportAsExcelFileAsync(this.columnDefs3, this.page.result, 'poročilo_rpt3');
    }
    if (this.selectedOption === 'RPT4'){
      this.excel.exportAsExcelFileAsync(this.columnDefs4, this.page.result, 'poročilo_rpt4');
    }
    if (this.selectedOption === 'RPT5'){
      this.excel.exportAsExcelFileAsync(this.columnDefs5, this.page.result, 'poročilo_rpt5');
    }
    if (this.selectedOption === 'RPT6'){
      this.excel.exportAsExcelFileAsync(this.columnDefs6, this.page.result, 'poročilo_rpt6');
    }
    this.showProgress(false);
  }

  print() {
    this.showProgress(true);
    this.downloadService.download('server/report/pdf/', this.year.toString())
    .pipe(untilDestroyed(this)).subscribe(response => {
      this.showProgress(false);
      this.downloadService.saveFile(response.body, 'poročiloESK' + this.year.toString() + '.pdf');
    });
  }
}