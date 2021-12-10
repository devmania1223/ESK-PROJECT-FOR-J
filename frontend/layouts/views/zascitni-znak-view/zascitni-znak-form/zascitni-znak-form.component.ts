import { ZascitniZnakService } from '../../../../_services/zascitni-znak.service';
import { Component, Injector, OnInit } from '@angular/core';
import { BaseFormComponent } from '../../base/base-form.component';
import { Proizvod } from 'app/_models/proizvod';
import { ZascitniznakProizvod } from 'app/_models/zascitniznak-proizvod';
import { ZascitenProizvod } from 'app/_models/zasciten-proizvod';

@Component({
  selector: 'esk-zascitni-znak-form',
  templateUrl: './zascitni-znak-form.component.html',
  styleUrls: ['./zascitni-znak-form.component.scss', '../../../../app.component.css']
})

export class ZascitniZnakFormComponent extends BaseFormComponent implements OnInit {
  zzShemaList: string[] = [];
  certOrganList: string[] = [];

  constructor(injector: Injector, service: ZascitniZnakService) {
    super(injector, service);
    this.zzShemaList.push('EKO');
    this.zzShemaList.push('INT');
    this.zzShemaList.push('ZGO');
    this.zzShemaList.push('ZOP');
    this.zzShemaList.push('ZTP');
    this.zzShemaList.push('VK');
    this.zzShemaList.push('NMV');

    this.certOrganList.push('KONCERT');
    this.certOrganList.push('BUREAU');
    this.certOrganList.push('IKC');
  }

  ngOnInit() {
    super.ngOnInit();
  }

  resetProduct() {
    this.selectedValue.zascitenProizvod = null;
    this.selectedValue.zascitniznakProizvod = null;
    // this hack invoke onNgChaange event at proizvod-selector-component
    this.selectedValue = Object.assign({}, this.selectedValue);
  }

  zascitenProizvodChanged(value: ZascitenProizvod) {
    if (value === null && this.selectedValue.zascitenProizvod) {
      this.selectedValue.zascitenProizvod.id = 0;
      this.selectedValue.zascitenProizvod.naziv = '';
    } else {
      this.selectedValue.zascitenProizvod = value;
    }
  }

  proizvodiChanged(proizvodi: Proizvod[]) {
    // this parse result to right database format
    this.selectedValue.zascitniznakProizvod = this.parseProizvodi(proizvodi);
  }

  parseProizvodi(proizvodi: Proizvod[]): ZascitniznakProizvod[] {
    if (!proizvodi || proizvodi.length === 0) {
      return null;
    }
    const list: ZascitniznakProizvod[] = [];
    proizvodi.forEach(proizvod => {
      list.push(new ZascitniznakProizvod({ idProizvod: proizvod.id, idZascitniznak: this.selectedValue.id }));
    });

    return list;
  }
}
