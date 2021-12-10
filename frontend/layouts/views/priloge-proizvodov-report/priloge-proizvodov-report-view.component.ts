import { Component, OnInit, Injector, Input } from '@angular/core';
import { PagedViewComponent } from '../base/paged-view-component';
import { PrilogeProizvodovReportService } from 'app/_services/priloge-proizvodov-report.service';
import { GridOptions } from 'ag-grid-community';
import { ValuePair } from 'app/_models/valuePair';
import { PagedQuery } from 'app/_models/pagedQuery';
import { List } from 'linqts';
import { PrilogeProizvodovReport } from 'app/_models/priloge-proizvodov-report';
import { ExcelService } from 'app/_services/excel.service';
import { PagedQueryResult } from 'app/_models/pagedQueryResult';
import { Certifikat } from 'app/_models/certifikat';
import { CertifikatService } from 'app/_services/certifikat.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'esk-priloge-proizvodov-report-view',
  templateUrl: './priloge-proizvodov-report-view.component.html',
  styleUrls: ['./priloge-proizvodov-report-view.component.scss', '../../../app.component.css']
})

export class PrilogeProizvodovReportViewComponent extends PagedViewComponent implements OnInit {
  public gridOptions: GridOptions = <GridOptions>{};
  public columnDefs: any;
  public searchConditions: List<ValuePair> = new List<ValuePair>();
  public page: PagedQuery = new PagedQuery();
  @Input() public selectedValue: any;
  public selection: PrilogeProizvodovReport[];
  public isComparing = false;

  constructor(
    injector: Injector,
    private service: PrilogeProizvodovReportService,
    private excel: ExcelService,
    private certifikatService: CertifikatService) {
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
        this.page.populate(this.customReMap(data));
        this.showProgress(false);
      },
      error => {
        console.log(error)
        this.showProgress(false);
      }
    );
  }

  customReMap(page: PagedQueryResult): PagedQueryResult {
    let list = new List<PrilogeProizvodovReport>();
    page.result.forEach(element => {

      let item = new PrilogeProizvodovReport();
      item.id = element[0];
      item.kmgmidImetnika = element[1];
      item.nazivImetnika = element[2];
      item.naslovImetnika = element[3];
      item.stevilkaCertifikata = element[4];
      item.nazivShema = element[5];
      item.nazivZascitenProizvod = element[6];
      item.nazivProizvod = element[7];
      item.stevilka = element[8];
      item.datIzdaje = this.utils.toDate(element[9]);
      item.datVelj = this.utils.toDate(element[10]);
      item.status = element[11];
      item.idCertifikat = element[12];
      item.datVnosa = this.utils.toDate(element[13]);
      list.Add(item);
    });

    page.result = list.ToArray();
    return page;
  }

  initGrid() {
    this.columnDefs = [
      {
        field: 'checked',
        checkboxSelection: true,
        headerName: 'Izberi',
        width: 80
      },
      {
        headerName: 'KMG-MID nosilca', field: 'kmgmidImetnika', width: 135
      },
      {
        headerName: 'Naziv nosilca', field: 'nazivImetnika'
      },
      {
        headerName: 'Št. certifikata', field: 'stevilkaCertifikata', width: 125
      },
      { headerName: 'Shema kakovosti', field: 'nazivShema' },
      {
        headerName: 'Zaščiten proizvod ali proizvod iz sheme kakovosti IK', field: 'nazivZascitenProizvod'
      },
      {
        headerName: 'Proizvod', field: 'nazivProizvod'
      },
      {
        headerName: 'Številka priloge', field: 'stevilka', width: 125
      },
      {
        headerName: 'Datum izdaje', field: 'datIzdaje', width: 125, cellRenderer: (data) => {
          return this.utils.toSlovenianDate(data.value);
        }
      },
      {
        headerName: 'Datum velj.', field: 'datVelj', width: 125, cellRenderer: (data) => {
          return this.utils.toSlovenianDate(data.value);
        }
      },
      {
        headerName: 'Status',
        field: 'status',
        width: 100
      },
      {
        headerName: 'Datum vnosa certifikata', field: 'datVnosa', width: 125, cellRenderer: (data) => {
          return this.utils.toSlovenianDate(data.value);
        }
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

  async exportToExcel() {
    this.showProgress(true);
    await this.excel.exportAsExcelFileAsync(this.columnDefs, this.page.result, 'priloge_proizvodov')
    this.showProgress(false);
  }

  compare() {
    if (!this.selection || this.selection.length !== 2) {
      this.toastr.info('Primerjate lahko samo dve prilogi hkrati.', 'Primerjava prilog');
      return;
    }

    this.isComparing = !this.isComparing;
  }

  onSelectionChanged() {
    this.selection = this.gridOptions.api.getSelectedRows();
  }

  onCloseComparing() {
    this.isComparing = !this.isComparing;
  }

  public certifikat: Certifikat;
  public editCertificate = false;
  openCertificate() {
    if (!this.selection || this.selection.length !== 1) {
      return;
    }
    let record = this.selection[0];
    this.certifikatService.get({ id: record.idCertifikat }).pipe(untilDestroyed(this)).subscribe(
      data => {
        this.certifikat = data;
        this.editCertificate = true;
      },
      error => {
        this.toastr.error('Prišlo je do napake pri pridobivanju certifikata.', 'Napaka pri pridobivanju certifikata');
        
      });
  }

  closeCertificate() {
    this.editCertificate = false;
    this.certifikat = null;
  }
}