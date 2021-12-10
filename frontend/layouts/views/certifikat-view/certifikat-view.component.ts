import { Component, OnInit, Injector, ChangeDetectorRef } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { ValuePair } from 'app/_models/valuePair';
import { CertifikatService } from 'app/_services/certifikat.service';
import { List } from 'linqts';
import { PagedQuery } from 'app/_models/pagedQuery';
import { ButtonRendererComponent } from 'app/components/ag-grid-button-renderer';
import { PagedViewComponent } from '../base/paged-view-component';
import { Certifikat } from 'app/_models/certifikat';
import { DialogOverviewComponent } from 'app/components/dialog-overview-component/dialog-overview-component';
import { AuthenticationService } from 'app/_services';
import { ExcelService } from 'app/_services/excel.service';
import { Dejavnost } from 'app/_models/dejavnost';
import { ZascitenProizvod } from 'app/_models/zasciten-proizvod';
import { Shema } from 'app/_models/shema';
import { Subjekt } from 'app/_models/subjekt';
import { Uporabnik } from 'app/_models/uporabnik';
import { DownloadService } from 'app/_services/download.service';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'certifikat-view',
  templateUrl: './certifikat-view.component.html',
  styleUrls: ['./certifikat-view.component.css', '../../../app.component.css']
})
export class CertifikatViewComponent extends PagedViewComponent implements OnInit {

  public page: PagedQuery = new PagedQuery();
  public gridOptions: GridOptions = <GridOptions>{};
  public columnDefs: any;
  public statusList: string[] = [];
  public searchConditions: List<ValuePair> = new List<ValuePair>();
  public frameworkComponents: any;
  public showCriteria: false;
  public criteria: any = {};
  public selection: Certifikat[];
  public isComparing = false;
  public showPageLoader: boolean;
  public showSearchPanel = true;
  public selectedValue: Certifikat;

  constructor(
    private service: CertifikatService,
    injector: Injector,
    private cdref: ChangeDetectorRef,
    public user: AuthenticationService,
    private excel: ExcelService,
    private downloadService: DownloadService,
    private route: ActivatedRoute) {
    super(injector, service);
    this.page.currentPage = 0;
    this.page.resultPerPage = 0;
    this.criteria.proizvod = [];
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
  }

  ngOnInit() {
    this.statusList.push('Vnos');
    this.statusList.push('Veljaven');
    this.statusList.push('Neveljaven');
    this.statusList.push('Razveljavljen');
    this.statusList.push('Arhiv');
    this.initGrid();
    this.page.conditions = this.searchConditions.ToArray();

    let action: String = null;
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        action = params['action'] || null;
      });

    if (action === 'IND') {
      this.showSearchPanel = false;
      this.newCertificate('I');
    }

    if (action === 'SKUP') {
      this.showSearchPanel = false;
      this.newCertificate('S');
    }

    if (action === 'IZTEK') {
      this.criteria.status = 'Veljaven';
      this.criteria.datVeljOd = this.utils.today();
      this.criteria.datVeljDo = this.utils.addDaysFromToday(30);
      this.searchData();
    }

    if (action === 'VNOS') {
      this.criteria.status = 'Vnos';
      this.searchData();
    }

    if (action === 'VELJAVNI') {
      this.criteria.status = 'Veljaven';
      this.searchData();
    }
  }

  initGrid() {

    this.columnDefs = [
      {
        field: 'checked',
        checkboxSelection: true,
        headerName: 'Izberi',
        width: 80
      },
      { headerName: 'Tip', field: 'tip', width: 60 },
      { headerName: 'Številka', field: 'stevilka', width: 100 },
      {
        headerName: 'Status',
        field: 'status',
        width: 100
      },
      {
        headerName: 'KMG-MID', field: 'imetnik.kmgmid', width: 100
      },
      {
        headerName: 'Shema kakovosti', field: 'zascitenProizvod.shema.naziv'
      },
      {
        headerName: 'Zaščiten proizvod ali proizvod iz sheme kakovosti IK', field: 'zascitenProizvod.naziv'
      },
      {
        headerName: 'Dejavnost', field: 'dejavnost.naziv', width: 100
      },
      {
        headerName: 'Kontrolor', field: 'kontrolor', width: 120
      },
      {
        headerName: 'Nosilec', field: 'imetnik.naziv'
      },
      {
        headerName: 'Naslov', field: 'imetnik.naslov'
      },
      {
        headerName: 'Občina', field: 'imetnik.obcina'
      },
      {
        headerName: 'Tel. št.', cellRenderer: (row) => {
          const cert: Certifikat = row.data;
          return cert.telSt ? cert.telSt : cert.imetnik.telSt;
        }
      },
      {
        headerName: 'Email', cellRenderer: (row) => {
          const cert: Certifikat = row.data;
          return cert.email ? cert.email : cert.imetnik.email;
        }
      },
      {
        headerName: 'Datum zad. kontrole', field: 'datKontrole', width: 130, cellRenderer: (data) => {
          return this.utils.toSlovenianDate(data.value);
        }
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
        headerName: 'Datum vnosa', field: 'datVnosa', width: 125, cellRenderer: (data) => {
          return this.utils.toSlovenianDate(data.value);
        }
      },
      {
        headerName: 'Vnašalec certifikata', field: 'uporabnik.delavecIme'
      },
      {
        headerName: 'Organizacija', field: 'organizacija'
      },
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

  newCertificate(tip: string) {
    if (!this.hasPermission()) {
      return;
    }
    const cert = new Certifikat({ tip: tip, organizacija: this.user.getAccount().orgSif });
    this.selectedValue = cert;
    this.selectedValue.open = true;
    this.page.result.unshift(cert);
  }

  editCertificate() {
    if (!this.hasPermission()) {
      return;
    }
    this.selectedValue.open = !this.selectedValue.open;
  }

  showForm() {
    if (!this.hasPermission()) {
      return;
    }
    if (!this.selectedValue) {
      return false;
    }

    return this.selectedValue.open;
  }

  downloadCertificate() {
    if (this.selectedValue.status === 'Vnos') {
      this.toastr.info('Prenos certifikata ni mogoč, če je status certifikata Vnos.', 'Prenos certifikata');
      return;
    }

    this.downloadService.downloadFileSystem(this.selectedValue.id.toString())
      .pipe(untilDestroyed(this)).subscribe(response => {
        const filename = response.headers.get('filename');

        this.downloadService.saveFile(response.body, this.selectedValue.stevilka + '.pdf');
      });
  }

  compareCertificates() {
    if (!this.selection || this.selection.length !== 2) {
      this.toastr.info('Primerjate lahko samo dva certifikata hkrati.', 'Primerjava certifikatov');
      return;
    }

    this.isComparing = !this.isComparing;
  }

  openResetDialog(): void {
    const dialogData = {
      title: 'Ponastavitev',
      question: 'Ali res želite ponastaviti iskalne kriterije?',
      yes: 'Ponastavi',
      no: 'Prekliči'
    };
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe(result => {
      if (result === dialogData.yes) {
        this.criteria = {};
        this.cdref.detectChanges();
        // this.criteria.proizvod = [];
        // this.criteria.shema = null;
      }
    });
  }

  searchData() {
    this.showProgress(true);
    this.service.search(this.criteria).pipe(untilDestroyed(this)).subscribe(
      data => {
        this.page.result = this.castToCertificateList(data.result);

        this.showProgress(false);
        this.showSearchPanel = false;
      },
      error => { console.log(error), this.showProgress(false); }
    );
  }

  castToCertificateList(result: any[]): Certifikat[] {
    const res = new List<Certifikat>();
    result.forEach(row => {
      const cert = new Certifikat();
      // IMPLICIT CAST DUE TO PERFORMANCE KEEP
      cert.id = row[0];
      cert.tip = row[1];
      cert.stevilka = row[2];
      cert.datKontrole = this.utils.toDate(row[3]);
      cert.datIzdaje = this.utils.toDate(row[4]);
      cert.datVelj = this.utils.toDate(row[5]);
      cert.status = row[6];
      cert.telSt = row[7];
      cert.email = row[8];
      cert.opomba = row[9];
      cert.datVnosa = this.utils.toDate(row[10]);
      cert.kontrolor = row[11];
      cert.dejavnost = new Dejavnost();
      cert.dejavnost.id = row[12];
      cert.dejavnost.naziv = row[13];
      cert.zascitenProizvod = new ZascitenProizvod();
      cert.zascitenProizvod.id = row[14];
      cert.zascitenProizvod.naziv = row[15];
      cert.zascitenProizvod.shema = new Shema();
      cert.zascitenProizvod.shema.id = row[16];
      cert.zascitenProizvod.shema.naziv = row[17];
      cert.imetnik = new Subjekt();
      cert.imetnik.id = row[18];
      cert.imetnik.kmgmid = row[19];
      cert.imetnik.ime = row[20];
      cert.imetnik.priimek = row[21];
      cert.imetnik.naziv = row[22];
      cert.imetnik.naslov = row[23];
      cert.imetnik.idPoste = row[24];
      cert.imetnik.posta = row[25];
      cert.imetnik.telSt = row[26];
      cert.imetnik.email = row[27];
      cert.imetnik.subjId = row[28];
      cert.imetnik.obId = row[29];
      cert.imetnik.obcina = row[30];
      cert.imetnik.datZs = this.utils.toDate(row[31]);
      cert.uporabnik = new Uporabnik();
      cert.uporabnik.id = row[32];
      cert.uporabnik.orgSif = row[33];
      cert.uporabnik.userName = row[34];
      cert.uporabnik.delavecIme = row[35];
      cert.idParent = row[36];
      cert.organizacija = row[37];
      res.Add(cert);
    });
    return res.ToArray();
  }

  proizvodChanged(value: any) {
    this.criteria.proizvod = value;
  }

  zascitenProizvodChanged(value: any) {
    if (value === null && this.criteria.zascitenProizvod) {
      this.criteria.zascitenProizvod.id = 0;
      this.criteria.zascitenProizvod.naziv = '';
    } else {
      this.criteria.zascitenProizvod = value;
    }
  }

  shemaChanged(value: Shema) {
    console.log(value);
    this.criteria.shema = value;
  }

  async exportToExcel() {
    if (!this.checkPermission('CERTIFIKAT_IZVOZ')) {
      return;
    }
    this.showProgress(true);
    await this.excel.exportAsExcelFileAsync(this.columnDefs, this.page.result, 'seznam_certifikatov');
    this.showProgress(false);
  }

  onRowDoubleClicked(event: any) {
    if (!this.checkPermission('CERTIFIKAT_AZURIRAJ')) {
      return;
    }
    this.selectedValue.open = !this.selectedValue.open;
  }

  onSelectionChanged(event: any) {
    this.selection = this.gridOptions.api.getSelectedRows();
    // THE HACK HERE IS TO SELECT VALUE INSTEAD OF CERTIFICATE - VALUE PROPAGATION DOESN'T WORK
    if (this.selection.length > 0) {
      const value = this.selection[this.selection.length - 1];
      value.open = false;
      this.selectedValue = value;
    } else {
      this.selectedValue = null;
    }
  }

  onCloseComparing() {
    this.isComparing = !this.isComparing;
  }

  public takeoverData() {
    // import data from external source
  }
}
