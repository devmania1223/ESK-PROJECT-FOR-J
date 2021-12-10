import { CertifikatService } from '../../../../_services/certifikat.service';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BaseFormComponent } from '../../base/base-form.component';
import { Certifikat } from 'app/_models/certifikat';
import { ValuePair } from 'app/_models/valuePair';
import { DatePipe } from '@angular/common';
import { PrilogaService } from 'app/_services/priloga.service';
import { PagedQuery } from 'app/_models/pagedQuery';
import { Subjekt } from 'app/_models/subjekt';
import { Priloga } from 'app/_models/priloga';
import { forkJoin } from 'rxjs';
import { CertifikatProizvod } from 'app/_models/certifikat-proizvod';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'esk-certifikat-compare',
  templateUrl: './certifikat-compare.component.html',
  styleUrls: ['./certifikat-compare.component.scss', '../../../../app.component.css']
})

export class CertifikatCompareComponent extends BaseFormComponent implements OnInit {
  public dialog: MatDialog;
  @Input() public data: any[];
  public data1: any = {};
  public data2: any = {};
  @Input() public action = 'CERTIFIKAT';

  public res1: ValuePair[] = [];
  public res2: ValuePair[] = [];

  public displayedColumns: string[] = ['id', 'value'];

  constructor(injector: Injector, private service: CertifikatService, private prilogeService: PrilogaService, private datePipe: DatePipe) {
    super(injector, service);
    this.dialog = injector.get(MatDialog);
  }

  ngOnInit() {

    // compare of certificate, product atacchments and group members
    this.data1 = this.data[0];
    this.data2 = this.data[1];

    if (this.action === 'CERTIFIKAT') {
      if (this.data1.tip === 'S' && this.data2.tip === 'S') {
        forkJoin(
          this.service.getPrilogaClan(this.data1.id),
          this.service.getPrilogaClan(this.data2.id),
          this.service.getProizvodi(this.data1.id),
          this.service.getProizvodi(this.data2.id),
        ).pipe(untilDestroyed(this)).subscribe(([clani1, clani2, proizvodi1, proizvodi2]) => {
          this.data1.certifikatPrilogaClan = clani1.result;
          this.data2.certifikatPrilogaClan = clani2.result;
          this.data1.certifikatProizvod = proizvodi1.result.map(x => new CertifikatProizvod({proizvod: x}));
          this.data2.certifikatProizvod = proizvodi2.result.map(x => new CertifikatProizvod({proizvod: x}));
          this.res1 = this.compareCertificates(this.data1, this.data2);
          this.res2 = this.compareCertificates(this.data2, this.data1);
        });
      } else {
        forkJoin(
          this.service.getProizvodi(this.data1.id),
          this.service.getProizvodi(this.data2.id)
        ).pipe(untilDestroyed(this)).subscribe(([proizvodi1, proizvodi2]) => {
          this.data1.certifikatProizvod = proizvodi1.result.map(x => new CertifikatProizvod({proizvod: x}));
          this.data2.certifikatProizvod = proizvodi2.result.map(x => new CertifikatProizvod({proizvod: x}));
          this.res1 = this.compareCertificates(this.data1, this.data2);
          this.res2 = this.compareCertificates(this.data2, this.data1);
        });
      }
    }

    if (this.action.indexOf('PRILOGE') > -1) {

      this.prilogeService.get(this.data1).pipe(untilDestroyed(this)).subscribe(
        data => {
          this.prilogeService.get(this.data2).pipe(untilDestroyed(this)).subscribe(
            data2 => {
              this.res1 = this.compareAttachments(data, data2);
              this.res2 = this.compareAttachments(data2, data);
            },
            error => {  }
          )
        },
        error => {  }
      )
    }
  }
  compareAttachments(p1: Priloga, p2: Priloga): ValuePair[] {
    const res: ValuePair[] = [];

    if (!p1.vsebina) {
      p1.vsebina = '';
    }

    if (!p2.vsebina) {
      p2.vsebina = '';
    }

    if (p1.vsebina.toLowerCase() !== p2.vsebina.toLowerCase()) {
      res.push(new ValuePair({ id: 'Vsebina', value: p1.vsebina.replace(/<.*?>/g, '') }));
    }

    if (this.utils.toSlovenianDate(p1.datIzdaje) !== this.utils.toSlovenianDate(p2.datIzdaje)) {
      res.push(new ValuePair({ id: 'Datum izdaje', value: this.utils.toSlovenianDate(p1.datIzdaje) }));
    }

    if (this.utils.toSlovenianDate(p1.datVelj) !== this.utils.toSlovenianDate(p2.datVelj)) {
      res.push(new ValuePair({ id: 'Datum veljavnosti', value: this.utils.toSlovenianDate(p1.datVelj) }));
    }

    if (p1.status.toLowerCase() !== p2.status.toLowerCase()) {
      res.push(new ValuePair({ id: 'Status', value: p1.status }));
    }

    if (p1.stevilka.toLowerCase() !== p2.stevilka.toLowerCase()) {
      res.push(new ValuePair({ id: 'Številka', value: p1.stevilka }));
    }

    if (p1.prilogaClan && p2.prilogaClan) {
      const clani1 = p1.prilogaClan.Select(x => x.clan).ToArray();
      const clani2 = p2.prilogaClan.Select(x => x.clan).ToArray();

      this.comparePersonList(clani1, clani2).forEach(element => {
        res.push(element);
      });
    }

    return res;
  }

  private comparePersonList(data1: Subjekt[], data2: Subjekt[]): ValuePair[] {
    const result: ValuePair[] = [];
    data1.forEach(c1 => {
      let find = false;
      data2.forEach(c2 => {
        if (c1.id === c2.id) {
          find = true;
        }
      });
      if (!find) {
        // tslint:disable-next-line: max-line-length
        const pNaz = (c1.naziv ? c1.naziv : (c1.ime + ' ' + c1.priimek)) + ', Matična: ' + c1.maticna + ', Davčna: ' + c1.davcna + ', ' + c1.naslov + ', Email: ' + c1.email + ', Tel št.: ' + this.utils.getValueOrDefault(c1.telSt) + (c1.kmgmid === null ? '' : ', KMG-MID: ' + this.utils.getValueOrDefault(c1.kmgmid));
        result.push(new ValuePair({ id: 'Član', value: pNaz }));
      }
    });

    return result;
  }

  private preparePage(id: any) {
    const page = new PagedQuery();
    page.currentPage = 1;
    page.resultPerPage = 0;
    const cond: ValuePair = new ValuePair({ id: 'id', value: id });
    page.conditions = [];
    page.conditions.push(cond);

    return page;
  }

  compareCertificates(c1: Certifikat, c2: Certifikat): ValuePair[] {
    const result: ValuePair[] = [];

    if (this.utils.toSlovenianDate(c1.datIzdaje) !== this.utils.toSlovenianDate(c2.datIzdaje)) {
      result.push(new ValuePair({ id: 'Datum izdaje', value: this.utils.toSlovenianDate(c1.datIzdaje) }));
    }

    if (this.utils.toSlovenianDate(c1.datKontrole) !== this.utils.toSlovenianDate(c2.datKontrole)) {
      result.push(new ValuePair({ id: 'Datum kontrole', value: this.utils.toSlovenianDate(c1.datKontrole) }));
    }

    if (this.utils.toSlovenianDate(c1.datVelj) !== this.utils.toSlovenianDate(c2.datVelj)) {
      result.push(new ValuePair({ id: 'Datum veljavnosti', value: this.utils.toSlovenianDate(c1.datVelj) }));
    }

    if (this.utils.toSlovenianDate(c1.datVnosa) !== this.utils.toSlovenianDate(c2.datVnosa)) {
      result.push(new ValuePair({ id: 'Datum vnosa', value: this.utils.toSlovenianDate(c1.datVnosa) }));
    }

    if (c1.dejavnost.naziv !== c2.dejavnost.naziv) {
      result.push(new ValuePair({ id: 'Dejavnost', value: c1.dejavnost.naziv }));
    }

    if (c1.imetnik.id !== c2.imetnik.id) {
      // tslint:disable-next-line: max-line-length
      const pNaz = (c1.imetnik.naziv ? c1.imetnik.naziv : (c1.imetnik.ime + ' ' + c1.imetnik.priimek)) + ', ' + c1.imetnik.naslov + ', Email: ' + this.utils.getValueOrDefault(c1.imetnik.email) + ', Tel št.: ' + this.utils.getValueOrDefault(c1.imetnik.telSt) + ', KMG-MID ' + this.utils.getValueOrDefault(c1.imetnik.kmgmid);
      result.push(new ValuePair({ id: 'Imetnik', value: pNaz }));
    }

    if (this.utils.getValueOrDefault(c1.telSt) !== this.utils.getValueOrDefault(c2.telSt)) {
      result.push(new ValuePair({ id: 'Telefon', value: this.utils.getValueOrDefault(c1.telSt) }));
    }

    if (this.utils.getValueOrDefault(c1.email) !== this.utils.getValueOrDefault(c2.email)) {
      result.push(new ValuePair({ id: 'Email', value: this.utils.getValueOrDefault(c1.email) }));
    }

    if (c1.kontrolor !== c2.kontrolor) {
      result.push(new ValuePair({ id: 'Kontrolor', value: c1.kontrolor }));
    }

    if (c1.opomba !== c2.opomba) {
      result.push(new ValuePair({ id: 'Opomba', value: c1.opomba }));
    }

    if (c1.zascitenProizvod.id !== c2.zascitenProizvod.id) {
      result.push(new ValuePair({ id: 'Zaščiten proizvod ali proizvod iz sheme kakovosti IK', value: c1.zascitenProizvod.naziv }));
    }

    if (c1.zascitenProizvod.shema.id !== c2.zascitenProizvod.shema.id) {
      result.push(new ValuePair({ id: 'Shema', value: c1.zascitenProizvod.shema.naziv }));
    }

    (c1.certifikatProizvod ? c1.certifikatProizvod : []).forEach(cf1 => {
      let found = false;
      (c2.certifikatProizvod ? c2.certifikatProizvod : []).forEach(cf2 => {
        if (cf1.proizvod.id === cf2.proizvod.id) {
          found = true;
        }
      });
      if (!found) {
        result.push(new ValuePair({ id: 'Proizvod iz sheme kakovosti - zbiranje podatkov', value: cf1.proizvod.naziv }));
      }
    });

    if (c1.status !== c2.status) {
      result.push(new ValuePair({ id: 'Status', value: c1.status }));
    }

    if (c1.tip !== c2.tip) {
      result.push(new ValuePair({ id: 'Tip', value: c1.tip === 'S' ? 'Skupinski certifikat' : 'Individualen certifikat' }));
    }

    if (c1.uporabnik.id !== c2.uporabnik.id) {
      result.push(new ValuePair({ id: 'uporabnik', value: c1.uporabnik.delavecIme + ' (' + c1.uporabnik.userName + ')' + ' => ' + c1.uporabnik.orgSif.toUpperCase() }));
    }

    if (this.data1.certifikatPrilogaClan && this.data2.certifikatPrilogaClan) {
      const clani1 = c1.certifikatPrilogaClan.LastOrDefault().priloga.prilogaClan.Select(x => x.clan).ToArray();
      const clani2 = c2.certifikatPrilogaClan.LastOrDefault().priloga.prilogaClan.Select(x => x.clan).ToArray();
      this.comparePersonList(clani1, clani2).forEach(element => {
        result.push(element);
      });
    }

    return result;
  }

  close() {
    this.onClose.emit();
  }
}
