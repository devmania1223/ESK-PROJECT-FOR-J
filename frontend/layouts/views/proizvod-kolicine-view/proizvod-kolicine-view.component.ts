import { Component, OnInit, Injector, Input } from '@angular/core';
import { PagedViewComponent } from '../base/paged-view-component';
import { ProizvodKolicineService } from 'app/_services/proizvod-kolicine.service';
import { GridOptions } from 'ag-grid-community';
import { ValuePair } from 'app/_models/valuePair';
import { PagedQuery } from 'app/_models/pagedQuery';
import { List } from 'linqts';
import { ExcelService } from 'app/_services/excel.service';
import { ProizvodKolicine } from 'app/_models/proizvod-kolicine';
import { Certifikat } from 'app/_models/certifikat';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'esk-proizvod-kolicine-view',
  templateUrl: './proizvod-kolicine-view.component.html',
  styleUrls: ['./proizvod-kolicine-view.component.scss', '../../../app.component.css']
})

export class ProizvodKolicineViewComponent extends PagedViewComponent implements OnInit {
  public gridOptions: GridOptions = <GridOptions>{};
  public columnDefs: any;
  public ProjectStatus: Array<any> = [];
  public searchConditions: List<ValuePair> = new List<ValuePair>();
  public page: PagedQuery = new PagedQuery();
  public showFileUpload = false;
  @Input() public selectedValue: any;
  public selectYear = false;
  public selectedYear: number = (new Date()).getFullYear();
  public selectedSource: string = null;
  public editCertificate = false;
  public selection: ProizvodKolicine[];
  public certifikat: Certifikat;

  constructor(
    injector: Injector,
    private service: ProizvodKolicineService, private excel: ExcelService) {
    super(injector, service);
  }

  ngOnInit(): void {
    this.page.currentPage = 0;
    this.page.conditions = this.searchConditions.ToArray();
    this.page.resultPerPage = 25;

    this.initGrid();

    this.executeQuery();
  }

  executeQuery() {
    this.prepareConditions();
    this.showProgress(true);

    this.service.search(this.page).pipe(untilDestroyed(this)).subscribe(
      data => {
        console.log(data);
        this.page.result = data;
        this.page.resultLength = data ? data.length : 0;
        this.showProgress(false);
      },
      error => {
        
        this.showProgress(false);
      }
    );
  }

  initGrid() {
    this.columnDefs = [
      {
        headerName: 'KMG-MID nosilca', field: 'kmgmid', width: 135
      },
      {
        headerName: 'Naziv nosilca', field: 'nazivSubj'
      },
      {
        headerName: 'Naslov nosilca', field: 'naslov'
      },
      { headerName: 'Shema kakovosti', field: 'shema' },
      {
        headerName: 'Zaščiten proizvod ali proizvod iz sheme kakovosti IK', field: 'zascitenproizvod'
      },
      {
        headerName: 'Proizvod', field: 'proizvod'
      },
      {
        headerName: 'Količina | Površina', field: 'vrednost', type: 'numericColumn', width: 175
      },
      {
        headerName: 'Enota', field: 'enota', width: 80
      },
      {
        headerName: 'Leto zajema', field: 'leto', width: 120
      }
    ];

    this.gridOptions = {
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
      suppressRowClickSelection: false,
      groupSelectsChildren: true,
      debug: true,
      rowSelection: 'multiple',
      enableRangeSelection: true,
      columnDefs: this.columnDefs,
      pagination: true,
      enableCellTextSelection: true
    };

    this.utils.applyToolTipsToHeaderOnAgGrid(this.columnDefs);
  }

  rowData = [];

  importExcel() {
    this.showFileUpload = !this.showFileUpload;
  }

  async exportToExcel() {
    this.showProgress(true);
    await this.excel.exportAsExcelFileAsync(this.columnDefs, this.page.result, 'proizvod_kolicine');
    this.showProgress(false);
  }

  onUploadClose(result: any) {
    this.importExcel();
  }

  sourceSelect(source: string) {
    if (source) {
      this.selectedSource = source;
    } else {
      this.selectedSource = null;
    }
  }

  sourceGet() {
    this.selectedSource = null;
  }

  /*openCertificate() {
    if (!this.selection || this.selection.length !== 1) {
      return;
    }
    let cert = { id: !this.selection[0].id_certifikat ? 0 : this.selection[0].id_certifikat };
    this.certifikatService.get(cert).pipe(untilDestroyed(this)).subscribe(
      data => {
        if (this.utils.getValueOrNull(data) === null) {
          this.toastr.error("Certifikat ne obstaja.", "Napaka pri pridobivanju certifikata");
          return;
        }
        this.certifikat = data;
        this.editCertificate = true;
      },
      error => {
        this.toastr.error("Prišlo je do napake pri pridobivanju certifikata.", "Napaka pri pridobivanju certifikata");
        
      });
  }

  closeCertificate() {
    this.editCertificate = false;
    this.certifikat = null;
  }*/

  onSelectionChanged(event: any) {
    this.selection = this.gridOptions.api.getSelectedRows();
  }
}
