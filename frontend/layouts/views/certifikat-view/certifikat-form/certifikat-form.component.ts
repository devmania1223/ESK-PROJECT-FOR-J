import { CertifikatService } from '../../../../_services/certifikat.service';
import { Component, Injector, OnInit } from '@angular/core';
import { BaseFormComponent } from '../../base/base-form.component';
import { Proizvod } from 'app/_models/proizvod';
import { DialogOverviewComponent } from 'app/components/dialog-overview-component/dialog-overview-component';
import { MatDialog } from '@angular/material';
import { Subjekt } from 'app/_models/subjekt';
import { GridOptions } from 'ag-grid-community';
import { ExcelService } from 'app/_services/excel.service';
import { Priloga } from 'app/_models/priloga';
import { Certifikat } from 'app/_models/certifikat';
import { CertifikatPriloga } from 'app/_models/certifikat-priloga';
import { CertifikatProizvod } from 'app/_models/certifikat-proizvod';
import { ZascitenProizvod } from 'app/_models/zasciten-proizvod';
import { PrilogaClan } from 'app/_models/priloga-clan';
import { AuthenticationService } from 'app/_services';
import { DownloadService } from 'app/_services/download.service';
import { forkJoin } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DejavnostMultipleSelectComponent } from 'app/components/dejavnost-multiple-select/dejavnost-multiple-select';
import { DejavnostService } from 'app/_services/dejavnost.service';
import { PagedQuery } from 'app/_models/pagedQuery';
import { ValuePair } from 'app/_models/valuePair';
import { Dejavnost } from 'app/_models/dejavnost';

@Component({
  selector: 'esk-certifikat-form',
  templateUrl: './certifikat-form.component.html',
  styleUrls: ['./certifikat-form.component.scss', '../../../../app.component.css']
})

export class CertifikatFormComponent extends BaseFormComponent implements OnInit {
  public selectedChild: PrilogaClan = null;
  public selectedRow = 0;
  public dialog: MatDialog;
  public uploadTitle = '';
  public showFileUpload = false;
  public gridOptions: GridOptions = <GridOptions>{};
  public columnDefs: any;
  public selection: PrilogaClan[];
  public certifikatPrilogaProizvod: CertifikatPriloga = new CertifikatPriloga();
  public certifikatPrilogaClan: CertifikatPriloga = new CertifikatPriloga();
  public manageChild = false;
  public selectedValue: Certifikat;
  public canDelete = false;
  public unknownError = false;
  certOrganList: string[] = [];
  public fullPermission = false;
  public showOpomba = false;
  public debugMode = false;
  public finishing = false;
  public dejavnosti: Dejavnost[] = [];

  public iframe: object = { enable: true };

  public tools: object = {
    type: 'MultiRow',
    items: [
      'Bold', 'Italic', 'Underline', '|',
      'FontSize', 'FontColor', '|',
      'Alignments', '|'
    ]
  };

  public mojaVrednost = '';

  public selectedTab = 0;

  // tslint:disable-next-line: max-line-length
  constructor(injector: Injector,
    private service: CertifikatService,
    private excel: ExcelService,
    private user: AuthenticationService,
    private downloadService: DownloadService,
    private dejavnostService: DejavnostService) {
    super(injector, service);
    this.dialog = injector.get(MatDialog);
    this.initGrid();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.selectedValue.tip === 'S') {
      this.selectedValue.certifikatPrilogaClan = [];
      this.certifikatPrilogaClan.priloga = new Priloga();
      this.certifikatPrilogaClan.priloga.status = this.selectedValue.status;
      this.certifikatPrilogaClan.priloga.prilogaClan = [];
      this.selectedValue.certifikatPrilogaClan.push(this.certifikatPrilogaClan);
    }
    this.selectedValue.certifikatPrilogaProizvod = [];
    this.certifikatPrilogaProizvod.priloga = new Priloga();
    this.certifikatPrilogaProizvod.priloga.status = this.selectedValue.status;
    this.selectedValue.certifikatPrilogaProizvod.push(this.certifikatPrilogaProizvod);

    this.selectedValue.certifikatProizvod = [];
    this.copyValue = this.utils.clone(this.selectedValue);
    this.canDelete = this.selectedValue.status === 'Vnos';
    this.reloadManyToManyData();

    this.certOrganList.push('KONCERT');
    this.certOrganList.push('BUREAU');
    this.certOrganList.push('IKC');

    this.fullPermission = this.user.hasPermission('CERTIFIKAT_PREG_VSE');
    this.loadDejavnosti();
  }

  public loadDejavnosti(): void {
    const pageDej: PagedQuery = new PagedQuery();
    pageDej.resultPerPage = 1000;
    pageDej.currentPage = 0;

    pageDej.conditions = [];
    pageDej.conditions.push(new ValuePair({ id: '*', value: '' }));

    this.dejavnostService.list(pageDej).pipe(untilDestroyed(this)).subscribe(
      data => {
        data.result = data.result.OrderBy(x => x.naziv).ToArray();
        this.dejavnosti = data.result;
      },
      error => {  pageDej.reset(); });
  }

  reloadManyToManyData() {
    if (this.utils.notEmpty(this.selectedValue) && this.utils.notEmpty(this.selectedValue.id)) {

      forkJoin(
        this.service.getProizvodiIdList(this.selectedValue.id),
        this.service.getPrilogaProizvod(this.selectedValue.id),
        this.service.getPrilogaClan(this.selectedValue.id),
        this.service.getDejavnosti(this.selectedValue.id),
      ).pipe(untilDestroyed(this)).subscribe(([proizvodi, prilogaProizvod, prilogaClani, dejavnosti]) => {
        this.selectedValue.certifikatProizvod = proizvodi.result ? proizvodi.result : [];
        this.selectedValue.dejavnosti = dejavnosti.result;

        if (prilogaProizvod.result && prilogaProizvod.result.length > 0) {
          this.certifikatPrilogaProizvod = prilogaProizvod.result.FirstOrDefault();
          this.selectedValue.certifikatPrilogaProizvod = [];
          this.selectedValue.certifikatPrilogaProizvod.push(this.certifikatPrilogaProizvod);
        }

        if (prilogaClani.result && prilogaClani.result.length > 0) {
          this.certifikatPrilogaClan = prilogaClani.result.FirstOrDefault();
          this.selectedValue.certifikatPrilogaClan = [];
          this.selectedValue.certifikatPrilogaClan.push(this.certifikatPrilogaClan);
        }

        this.copyValue = this.utils.clone(this.selectedValue);
        this.resetData(this.selectedValue, true);

      },
        error => {
          this.unknownError = true;
          
          // tslint:disable-next-line: max-line-length
          this.toastr.error('Pri pridobivanu metapodatkov certifikata je prišlo do napake! Ažuriranje certifikata ni mogoče.', 'Pridobivanje članov');
        }
      );
    }
  }
  reloadManyToManyData2() {
    if (this.utils.notEmpty(this.selectedValue) && this.utils.notEmpty(this.selectedValue.id)) {
      this.service.getProizvodiIdList(this.selectedValue.id).pipe(untilDestroyed(this)).subscribe(
        data => {
          this.selectedValue.certifikatProizvod = data.result ? data.result : [];
          this.resetData(this.selectedValue, true);
        },
        error => { this.unknownError = true;  }
      );

      this.service.getPrilogaProizvod(this.selectedValue.id).pipe(untilDestroyed(this)).subscribe(
        data => {
          if (!data.result || data.result.length === 0) {
            return;
          }

          this.certifikatPrilogaProizvod = data.result.FirstOrDefault();
          this.selectedValue.certifikatPrilogaProizvod = [];
          this.selectedValue.certifikatPrilogaProizvod.push(this.certifikatPrilogaProizvod);
          this.resetData(this.selectedValue, true);
        },
        error => {
          // tslint:disable-next-line: max-line-length
          this.toastr.error('Pri pridobivanu prilog proizvodov je prišlo do nepričakovane napake. Ažuiriranje certifikata zelo odsvetujemo.', 'Pridobivanje članov');
          this.unknownError = true;
          
        }
      );

      if (this.selectedValue.tip === 'S') {
        this.service.getPrilogaClan(this.selectedValue.id).pipe(untilDestroyed(this)).subscribe(
          data => {
            if (!data.result || data.result.length === 0) {
              return;
            }

            this.certifikatPrilogaClan = data.result.FirstOrDefault();
            this.selectedValue.certifikatPrilogaClan = [];
            this.selectedValue.certifikatPrilogaClan.push(this.certifikatPrilogaClan);
            this.copyValue = this.utils.clone(this.selectedValue);
          },
          error => {
            this.unknownError = true;
            // tslint:disable-next-line: max-line-length
            this.toastr.error('Pri pridobivanu članov je prišlo do nepričakovane napake. Ažuiriranje certifikata zelo odsvetujemo.', 'Pridobivanje članov'); 
          }
        );
      }
    }
  }

  autogrow() {
    const textArea = document.getElementById('description')
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
    textArea.style.overflowY = 'scroll';
  }

  proizvodiChanged(proizvodi: Proizvod[]) {
    // this parse result to right database format
    this.selectedValue.certifikatProizvod = this.parseProizvodi(proizvodi);
  }

  zascitenProizvodChanged(value: ZascitenProizvod) {
    if (value === null && this.selectedValue.zascitenProizvod) {
      this.selectedValue.zascitenProizvod.id = 0;
      this.selectedValue.zascitenProizvod.naziv = '';
    } else {
      this.selectedValue.zascitenProizvod = value;
    }
  }

  parseProizvodi(proizvodi: Proizvod[]): CertifikatProizvod[] {
    if (!proizvodi || proizvodi.length === 0) {
      return null;
    }
    const list: CertifikatProizvod[] = [];
    proizvodi.forEach(proizvod => {
      list.push(new CertifikatProizvod({ idProizvod: proizvod.id, idCertifikat: this.selectedValue.id }));
    });

    return list;
  }

  newChild() {
    const clan = new Subjekt();
    const certifikatPrilogaClan = new PrilogaClan();
    certifikatPrilogaClan.clan = clan;
    this.selectedChild = certifikatPrilogaClan;
    this.manageChild = !this.manageChild;
  }

  applyChild() {
    const found = this.certifikatPrilogaClan.priloga.prilogaClan.FirstOrDefault(x => x.clan.subjId === this.selectedChild.clan.subjId);
    if (found) {
      this.toastr.info('Na seznamu članov že obstaja izbran subjekt.', 'Obstoječ član');
      return;
    }
    this.certifikatPrilogaClan.priloga.prilogaClan.unshift(this.selectedChild);
    this.manageChild = !this.manageChild;
  }

  cancelChild() {
    this.manageChild = !this.manageChild;
    this.selectedChild = null;
  }

  public removeChilds() {
    const dialogData = { title: 'Brisanje članov', question: 'Ali res želite izbrisati označene zapise?', yes: 'Izbriši', no: 'Prekliči' };
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe(result => {
      if (result === dialogData.yes) {
        this.selection.forEach(clan => {
          this.removeChild(clan);
        });
        if (this.gridOptions.api) {
          this.gridOptions.api.setRowData(this.certifikatPrilogaClan.priloga.prilogaClan);
        }
        this.selection = [];
      }
    });
  }

  public removeChild(item: PrilogaClan): any {
    if (this.utils.getValueOrNull(item.id) !== null && item.id > 0) {
      this.service.removeClan(item).pipe(untilDestroyed(this)).subscribe(
        () => {
          // tslint:disable-next-line: max-line-length
          this.certifikatPrilogaClan.priloga.prilogaClan = this.certifikatPrilogaClan.priloga.prilogaClan.filter(obj => obj.clan.subjId !== item.clan.subjId);
          this.selectedChild = null;
        },
        error => {  }
      )
    } else {
      // tslint:disable-next-line: max-line-length
      this.certifikatPrilogaClan.priloga.prilogaClan = this.certifikatPrilogaClan.priloga.prilogaClan.filter(obj => obj.clan.subjId !== item.clan.subjId);
      this.selectedChild = null;
    }
  }

  refreshMembers(result: Subjekt[]) {
    const data: PrilogaClan[] = [];
    result.forEach(element => {
      data.push(new PrilogaClan({ clan: element, id: 0 }))
    });
    this.certifikatPrilogaClan.priloga.prilogaClan = data;
    this.selectedValue.certifikatPrilogaClan = [];
    this.selectedValue.certifikatPrilogaClan.push(this.certifikatPrilogaClan);
    this.copyValue = this.utils.clone(this.selectedValue);
  }

  importFile(title: string) {

    // tslint:disable-next-line: max-line-length
    const dialogData = { title: 'Uvoz članov', question: 'Uvoz članov izbriše obstoječe zapise in pripravi nove. Ali želite nadaljevati?', yes: 'Nadaljuj', no: 'Prekliči' };
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe(result => {
      if (result === dialogData.yes) {
        this.uploadTitle = title;
        this.showFileUpload = !this.showFileUpload;
      }
    });
  }

  closeImportFile() {
    this.uploadTitle = '';
    this.showFileUpload = !this.showFileUpload;
  }

  certificateCancel() {
    if (!this.hasPermission('CERTIFIKAT_RAZVELJAVI')) {
      return;
    }
    this.cancel();
  }

  certificateDelete() {
    if (!this.hasPermission('CERTIFIKAT_AZURIRAJ')) {
      return;
    }

    const dialogData = { title: 'Brisanje zapisa', question: 'Ali res želite izbrisati certifikat?', yes: 'Izbriši', no: 'Prekliči' };
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe(result => {
      console.log(result);
      if (result === dialogData.yes) {
        this.executeDelete();
      }
    });

  }

  certificateSave() {
    if (!this.hasPermission('CERTIFIKAT_AZURIRAJ')) {
      return;
    }
    const action = this.utils.isEmpty(this.selectedValue.id) ? 'NEW' : 'EDIT';
    this.showProgress(true);
    if (action === 'NEW') {
      this.service.post(this.selectedValue).subscribe
        (
          res => {
            this.resetData(res, false);
            this.toastr.info('Certifikat uspešno shranjen.', 'Shranjevanje certifikata');
          }
        );
    } else {
      this.service.put(this.selectedValue).subscribe
        (
          res => {
            this.resetData(res, false);
            this.toastr.info('Certifikat uspešno shranjen.', 'Shranjevanje certifikata')
          }
        );
    }
  }

  certificateFinish() {
    if (!this.hasPermission('CERTIFIKAT_ZAKLJUCI')) {
      return;
    }

    // tslint:disable-next-line: max-line-length
    const dialogData = { title: 'Zaključevanje certifikata', question: 'Ali res želite zaključiti certifikat?', yes: 'Zaključi', no: 'Prekliči' };
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe(result => {
      if (result === dialogData.yes) {
        this.finishing = true;
        this.service.finish(this.selectedValue).pipe(untilDestroyed(this)).subscribe(
          res => {
            this.resetData(res, false);
            this.finishing = false;
            this.toastr.info('Certifikat uspešno zaključen.', 'Zaključevanje certifikata');
          },
          error => {
            this.finishing = false;
            
          }
        );
      }
    });
  }

  certificateEdit() {
    this.selectedValue.status = 'Vnos';
    this.selectedValue.datIzdaje = null;
    this.selectedValue.datVelj = null;
    this.selectedValue.kontrolor = '';
    this.selectedValue.datKontrole = null;
    this.selectedValue.stevilka = null;

    // THIS IS REISSUE FLAG
    this.selectedValue.idParent = this.selectedValue.id;
    this.selectedValue.id = 0;

    if (this.selectedValue.tip === 'S') {
      this.attachmentGroupReset()
    }

    this.attachmentProductReset();

    this.selectedValue.certifikatProizvod.forEach(element => {
      element.id = 0;
    });
  }

  attachmentProductReset() {
    this.selectedValue.certifikatPrilogaProizvod[0].priloga.stevilka = null;
    this.selectedValue.certifikatPrilogaProizvod[0].priloga.status = 'Vnos';
    this.selectedValue.certifikatPrilogaProizvod[0].priloga.datIzdaje = null;
    this.selectedValue.certifikatPrilogaProizvod[0].priloga.datVelj = null;
    this.selectedValue.certifikatPrilogaProizvod[0].priloga.id = 0;
    this.selectedValue.certifikatPrilogaProizvod[0].id = 0;
    this.certifikatPrilogaProizvod = this.selectedValue.certifikatPrilogaProizvod[0];
  }

  attachmentGroupReset() {
    this.selectedValue.certifikatPrilogaClan[0].priloga.stevilka = null;
    this.selectedValue.certifikatPrilogaClan[0].priloga.status = 'Vnos';
    this.selectedValue.certifikatPrilogaClan[0].priloga.datIzdaje = null;
    this.selectedValue.certifikatPrilogaClan[0].priloga.datVelj = null;
    this.selectedValue.certifikatPrilogaClan[0].priloga.id = 0;
    this.selectedValue.certifikatPrilogaClan[0].id = 0;

    if (this.selectedValue.certifikatPrilogaClan[0].priloga.prilogaClan) {
      this.selectedValue.certifikatPrilogaClan[0].priloga.prilogaClan.forEach(
        element => { element.id = 0; }
      );
    }

    this.certifikatPrilogaClan = this.selectedValue.certifikatPrilogaClan[0];
  }

  certificateCancelation() {
    if (!this.hasPermission('CERTIFIKAT_RAZVELJAVI')) {
      return;
    }

    // tslint:disable-next-line: max-line-length
    const dialogData = { title: 'Razveljavitev certifikata', question: 'Ali res želite razveljaviti certifikat?', yes: 'Razveljavi', no: 'Prekliči' };
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe(result => {
      console.log(result);
      if (result === dialogData.yes) {
        this.service.cancelation(this.selectedValue).pipe(untilDestroyed(this)).subscribe(
          res => {
            this.resetData(res, false);
            this.toastr.info('Certifikat uspešno razveljavljen.', 'Razveljavitev certifikata');
            this.toggleOpomba();
          },
          error => {
            
          }
        );
      }
    });
  }

  private resetData(res: Certifikat, nestedCall: boolean) {
    Object.assign(this.selectedValue, res);
    this.copyValue = this.utils.clone(this.selectedValue);
    if (!nestedCall) {
      this.reloadManyToManyData();
    }
  }

  executeDelete() {
    this.service.delete(this.selectedValue).pipe(untilDestroyed(this)).subscribe(
      () => {
        this.toastr.info('Certifikat je bil uspešno izbrisan.')
        this.onClose.emit({ action: 'DELETED', value: this.selectedValue });
      },
      error => {
        
      }
    )
  }

  initGrid() {
    // TODO ??? popravil naziv, namesto calucalted field
    this.columnDefs = [
      {
        field: 'checked',
        checkboxSelection: true,
        headerName: 'Izberi',
        width: 80
      },
      {
        headerName: 'KMG-MID', field: 'clan.kmgmid', width: 100
      },
      {
        headerName: 'Naziv', field: 'clan.naziv', width: 700
      },
      {
        headerName: 'Naslov', field: 'clan.naslov', width: 700
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
    await this.excel.exportAsExcelFileAsync(this.columnDefs, this.gridOptions.rowData, 'seznam_clanov_' + this.selectedValue.stevilka)
    this.showProgress(false);
  }

  onSelectionChanged(event: any) {
    this.selection = this.gridOptions.api.getSelectedRows();
  }
  onTabClick(event: any) {
    this.selectedTab = event.index;
    console.log(event);
  }

  compareDejavnost(i1, i2) {
    return i1 && i2 && i1.id === i2.id;
  }

  attachmentEnableActionButton(action: string): boolean {
    switch (this.selectedTab) {
      // tslint:disable-next-line: max-line-length
      case 1: { return this.selectedValue.status === 'Veljaven' && this.certifikatPrilogaProizvod.priloga && this.certifikatPrilogaProizvod.priloga.status === action && this.selectedTab > 0; }
      // tslint:disable-next-line: max-line-length
      case 2: { return this.selectedValue.status === 'Veljaven' && this.certifikatPrilogaClan.priloga && this.certifikatPrilogaClan.priloga.status === action && this.selectedTab > 0; }
      default: { return false; }
    }
  }

  attachmentEnableEditButton(): boolean {
    return this.attachmentEnableActionButton('Veljaven');
  }

  attachmentEnableSaveButton(): boolean {
    return this.attachmentEnableActionButton('Vnos');
  }

  attachmentEdit() {
    switch (this.selectedTab) {
      case 1: { this.attachmentProductReset(); return; }
      case 2: { this.attachmentGroupReset(); return; }
    }
  }
  clearOpomba() {
    this.selectedValue.opomba = null;
    this.toggleOpomba();
  }
  toggleOpomba() {
    this.showOpomba = !this.showOpomba;
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

  refreshCertificate() {
    const dialogData = { title: 'Osveževanje članov', question: 'Ali želite osvežiti podatke na certifikatu iz uradnih evidenc?', yes: 'Osveži', no: 'Prekliči' };
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe(result => {
      if (result === dialogData.yes) {
        this.service.refreshData(this.selectedValue).pipe(untilDestroyed(this)).subscribe(
          data => { this.refreshCertificateResponse(data); });
      }
    });
  }
  refreshCertificateResponse(data: any) {
    console.log(data);
    if (data.imetnik) {
      this.selectedValue.imetnik = data.imetnik;
    }

    if (data.clani) {
      this.certifikatPrilogaClan.priloga = new Priloga();
      this.certifikatPrilogaClan.priloga.prilogaClan = [];
      this.selectedValue.certifikatPrilogaClan = [];

      data.clani.forEach(clan => {
        const pc = new PrilogaClan();
        pc.clan = clan;
        this.certifikatPrilogaClan.priloga.prilogaClan.push(pc);
      });

      this.selectedValue.certifikatPrilogaClan.push(this.certifikatPrilogaClan);
    }

    if (data.clani || data.imetnik) {
      this.toastr.info('Podatki so se uspešno osvežili.');
    } else {
      this.toastr.info('Osveževanje ni bilo potrebno. Imate že najnovejše podatke.');
    }
  }
}
