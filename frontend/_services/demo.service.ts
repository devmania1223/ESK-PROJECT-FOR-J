import { Certifikat } from 'app/_models/certifikat';
import { Dejavnost } from 'app/_models/dejavnost';
import { Proizvod } from 'app/_models/proizvod';
import { Shema } from 'app/_models/shema';
import { Uporabnik } from 'app/_models/uporabnik';
import { Pravica } from 'app/_models/pravica';
import { List } from 'linqts';
import { Subjekt } from 'app/_models/subjekt';
import { Injectable } from '@angular/core';
import { Dashboard } from 'app/_models/dashboard';
import { PagedQueryResult } from 'app/_models/pagedQueryResult';
import { ZascitniZnak } from 'app/_models/zascitni-znak';
import { ProizvodKolicine } from 'app/_models/proizvod-kolicine';
import { ReportShemaStZavezancev, ReportProizvodStZavezancev, ReportKolicine } from 'app/_models/report';
import { ValuePair } from 'app/_models/valuePair';
import { ZakonskaPodlaga } from 'app/_models/zakonska-podlaga';
import { Priloga } from 'app/_models/priloga';
import { PrilogeClanovReport } from 'app/_models/priloge-clanov-report';
import { PrilogeProizvodovReport } from 'app/_models/priloge-proizvodov-report';
import { ZascitenProizvod } from 'app/_models/zasciten-proizvod';
import { PagedQuery } from 'app/_models/pagedQuery';

@Injectable()
export class DemoService {
	getDemoZascitenProizvodList(input: PagedQuery): PagedQueryResult {
		const page = new PagedQueryResult();
		const shema = input ? input.conditions.First(x => x.id === 'id_shema') : null;
		const list = new List<ZascitenProizvod>();
		if (!shema || Number(shema.value) % 3 === 0) {
			list.Add(new ZascitenProizvod({
				id: 1,
				naziv: 'Nanoški sir'
			}));
		}
		if (!shema || Number(shema.value) % 3 === 1) {
			list.Add(new ZascitenProizvod({
				id: 2,
				naziv: 'Zgornjesavinjski želodec'
			}));
		}
		if (!shema || Number(shema.value) % 3 === 2) {
			list.Add(new ZascitenProizvod({
				id: 3,
				naziv: 'Belokranjska pogača'
			}));
		}
		if (!shema || Number(shema.value) % 3 === 0) {
			list.Add(new ZascitenProizvod({
				id: 4,
				naziv: 'Idrijski žlikrofi'
			}));
		}
		if (!shema || Number(shema.value) % 3 === 1) {
			list.Add(new ZascitenProizvod({
				id: 5,
				naziv: 'Mlečni izdelki - kmečki'
			}));
		}
		if (!shema || Number(shema.value) % 3 === 2) {
			list.Add(new ZascitenProizvod({
				id: 6,
				naziv: 'Sadje'
			}));
		}
		page.result = list.ToArray();
		page.resultLength = list.Count();
		return page;
	}

	getDemoReportList(conditions: ValuePair[]): PagedQueryResult {
		const page = new PagedQueryResult();
		const list = new List<any>();
		const report = conditions.FirstOrDefault().value;
		let index = 1;

		if (report === 'RPT1') {
			this.getDemoShemaList().result.forEach(element => {
				const record = new ReportShemaStZavezancev();
				record.naziv_shema = element.naziv;
				record.vrednost = 1500 / index;
				index++;

				list.Add(record);
			});

			page.result = list.ToArray();
			page.resultLength = list.Count();
		}

		if (report === 'RPT2') {

			this.getDemoProizvodList().result.forEach(element => {
				const record = new ReportProizvodStZavezancev();
				record.naziv_shema = element.shema.naziv;
				record.vrednost = 1500 / index;
				record.naziv = element.naziv;
				record.naziv_zascita = element.naziv_zascita;
				index++;

				list.Add(record);
			});

			page.result = list.ToArray();
			page.resultLength = list.Count();
		}

		if (report === 'RPT3') {

			this.getDemoShemaList().result.forEach(element => {
				const record = new ReportShemaStZavezancev();
				record.naziv_shema = element.naziv;
				record.vrednost = 12000 / index;
				index++;

				list.Add(record);
			});

			page.result = list.ToArray();
			page.resultLength = list.Count();
		}

		if (report === 'RPT4') {

			this.getDemoProizvodList().result.forEach(element => {
				const record = new ReportProizvodStZavezancev();
				record.naziv_shema = element.shema.naziv;
				record.vrednost = 12000 / index;
				record.naziv = element.naziv;
				record.naziv_zascita = element.naziv_zascita;
				index++;

				list.Add(record);
			});

			page.result = list.ToArray();
			page.resultLength = list.Count();
		}

		if (report === 'RPT5') {

			this.getDemoProizvodList().result.forEach(element => {
				const record = new ReportKolicine();
				record.naziv_shema = element.shema.naziv;
				record.vrednost = 12000 / index;
				record.naziv = 'Rastlina' + index.toString();
				record.naziv_zascita = '';
				record.enota = 'AR';
				index++;

				list.Add(record);
			});

			page.result = list.ToArray();
			page.resultLength = list.Count();
		}

		if (report === 'RPT6') {

			this.getDemoProizvodList().result.forEach(element => {
				const record = new ReportKolicine();
				record.naziv_shema = element.shema.naziv;
				record.vrednost = 12000 / index;
				record.naziv = element.naziv;
				record.naziv_zascita = element.naziv_zascita;
				record.enota = index % 2 === 0 ? 'KG' : 'L';
				index++;

				list.Add(record);
			});

			page.result = list.ToArray();
			page.resultLength = list.Count();
		}


		return page;
	}

	getDemoZakonskaPodlagaList(): PagedQueryResult {
		const page = new PagedQueryResult();
		const list = new List<ZakonskaPodlaga>();

		list.Add(new ZakonskaPodlaga({ id: 1, stevilka: 'ZP-0001', vsebina: 'Lorem ipsum dolor ...' }));
		list.Add(new ZakonskaPodlaga({ id: 2, stevilka: 'ZP-0002', vsebina: 'Lorem ipsum dolor ...' }));
		list.Add(new ZakonskaPodlaga({ id: 3, stevilka: 'ZP-0003', vsebina: 'Lorem ipsum dolor ...' }));

		page.result = list.ToArray();
		page.resultLength = list.Count();
		return page;
	}

	getDemoProizvod4ZascitenProizvod(idShema: number, idZascitenProizvod: number): PagedQueryResult {
		const page = new PagedQueryResult();
		const list = this.getDemoProizvodList().result.ToList();
		const result = list.Where(pr => pr.shema.id === idShema && pr.zascitenProizvod.id === idZascitenProizvod);

		page.result = result.ToArray();
		page.resultLength = page.result.length;
		return page;
	}

	getDemoSubjektList(): PagedQueryResult {
		const page = new PagedQueryResult();
		const list = new List<Subjekt>();

		for (let i = 0; i < 10; i++) {
			list.Add(this.getDemoSubjekt(i));
		}

		page.result = list.ToArray();
		page.resultLength = list.Count();
		return page;
	}
	public getDemoDashboard(): Dashboard {
		return new Dashboard({ vIzteku: 50, veljavniTotal: 21500, vnosTotal: 3 });
	}

	public getDemoCertifikati(count: number): Certifikat[] {
		const list: Certifikat[] = [];
		for (let i = 0; i < count; i++) {
			const shema: Shema = this.getDemoShema(i % 3);
			const page = new PagedQuery();
			page.conditions = [];
			page.conditions.Add(new ValuePair({ id: 'id_shema', value: shema.id.toString() }));

			const zp: ZascitenProizvod = this.getDemoZascitenProizvodList(page).result[i % 2];

			list.push(new Certifikat({
				id: i + 1,
				tip: i % 2 === 0 ? 'S' : 'I',
				certifikatPrilogaClan: i % 2 === 0 ? this.getDemoPrilogaClan(i).result : null,
				certifikatPrilogaProizvod: i % 3 === 0 ? this.getDemoPrilogaProizvod().result : null,
				datIzdaje: new Date(2019, 4, 25),
				datKontrole: new Date(2019, 4, 25),
				datVelj: new Date(2019, 4, 27),
				datVnosa: new Date(2019, 4, 27),
				dejavnost: new Dejavnost({ id: 1, naziv: 'Pridelovanje mleka' }),
				imetnik: this.getDemoSubjekt(i),
				kontrolor: 'Naziv kontrolorja ' + (i % 10).toString(),
				opomba: '',
				zascitenProizvod: zp,
				certifikatProizvod: null,
				status: i % 2 === 0 ? 'Vnos' : 'Veljaven',
				stevilka: 'CERT-' + i.toString(),
				uporabnik: this.getDemoUporabnik(i)
			}));
		}

		return list;
	}

	getDemoPrilogaProizvod(): PagedQueryResult {
		const page = new PagedQueryResult();
		const list = new List<Priloga>();

		const pr: Priloga = this.getDemoPriloga().result.FirstOrDefault();
		pr.vsebina = 'To je priloga k proizvodom';
		pr.stevilka = 'PROIZ-123';

		list.Add(pr);

		page.result = list.ToArray();
		page.resultLength = list.Count();
		return page;
	}

	getDemoPrilogaClan(i: number): PagedQueryResult {
		const page = new PagedQueryResult();
		const list = new List<Priloga>();

		const pr: Priloga = this.getDemoPriloga().result.FirstOrDefault();
		pr.prilogaClan = this.getDemoClani(i).result;
		pr.stevilka = 'CLAN-123';

		list.Add(pr);

		page.result = list.ToArray();
		page.resultLength = list.Count();
		return page;

	}

	getDemoPriloga(): PagedQueryResult {
		const page = new PagedQueryResult();
		const list = new List<Priloga>();

		const pr = new Priloga();
		pr.id = 1;
		pr.status = 'Veljaven';
		pr.stevilka = 'PR-123';
		pr.datIzdaje = new Date(2019, 4, 25),
			pr.datVelj = new Date(2019, 4, 27),
			list.Add(pr);

		page.result = list.ToArray();
		page.resultLength = list.Count();
		return page;
	}

	getDemoProizvod(i: number): Proizvod {
		const shema = this.getDemoShema(i % 3);
		const page = new PagedQuery();
		page.conditions = [];
		page.conditions.Add(new ValuePair({ id: 'id_shema', value: shema.id.toString() }));
		const zp = this.getDemoZascitenProizvodList(page).result[i % 2];
		const proizvod = new Proizvod({
			id: i + 1,
			zascitenProizvod: zp,
			naziv: 'Proizvod' + ' ' + i.toString(),
			zakonskaPodlaga: this.getDemoZakonskaPodlagaList().result[i % 3]
		});

		return proizvod;
	}

	getDemoProizvodFirstOrDefault(id): Proizvod {
		const result = this.getDemoProizvodList().result.ToList();

		return result.FirstOrDefault(x => x.id === id);
	}

	getDemoProizvodList(): PagedQueryResult {
		const page = new PagedQueryResult();
		const list = new List<Proizvod>();

		for (let i = 0; i < 24; i++) {
			list.Add(this.getDemoProizvod(i));
		}
		list.Add(new Proizvod({
			id: 25,
			naziv: null,
			zascitenProizvod: new ZascitenProizvod({ id: 25, naziv: 'Štajerski hmelj', shema: new Shema({ id: 100, naziv: 'Testna shema' }) }),
			zakonskaPodlaga: this.getDemoZakonskaPodlagaList().result[25 % 3]
		}));
		page.result = list.ToArray();
		page.resultLength = list.Count();
		return page;
	}

	getDemoZZnakList(): PagedQueryResult {
		const page = new PagedQueryResult();
		const list = new List<ZascitniZnak>();

		for (let i = 0; i < 25; i++) {
			list.Add(this.getDemoZZnak(i));
		}

		page.result = list.ToArray();
		page.resultLength = list.Count();
		return page;
	}
	getDemoZZnak(i: number): ZascitniZnak {
		const shema: Shema = this.getDemoShema(i % 3);
		const page = new PagedQuery();
		page.conditions = [];
		page.conditions.Add(new ValuePair({ id: 'id_shema', value: shema.id.toString() }));

		const zp: ZascitenProizvod = this.getDemoZascitenProizvodList(page).result[i % 2];

		const zznak = new ZascitniZnak({
			certOrgan: 'IKC',
			datOdl: new Date(2019, 4, 25),
			id: i + 1,
			imetnik: this.getDemoSubjekt(i),
			nazivProizvoda: i % 2 === 0 ? 'Prost naziv proizvoda ' + i.toString() : null,
			zascitenProizvod: i % 2 === 1 ? zp : null,
			zascitniznakProizvod: null,
			stOdl: 'ODL-0000' + i.toString(),
			zzShema: 'EKO'
		});

		return zznak;
	}

	getDemoShema(i: number): Shema {
		if (i % 3 === 0) {
			return new Shema({
				id: 1,
				naziv: 'Izbrana kakovost'
			});
		}
		if (i % 3 === 1) {
			return new Shema({
				id: 2,
				naziv: 'Zajamčena posebnost'
			});
		}
		if (i % 3 === 2) {
			return new Shema({
				id: 3,
				naziv: 'Višja kakovost'
			});
		}
	}

	getDemoShemaList(): PagedQueryResult {
		const list = new List<Shema>();
		const page = new PagedQueryResult();
		list.Add(this.getDemoShema(0));
		list.Add(this.getDemoShema(1));
		list.Add(this.getDemoShema(2));
		page.result = list.ToArray();
		page.resultLength = list.Count();
		return page;
	}

	getDemoUporabnik(i: number): Uporabnik {
		return new Uporabnik({
			id: 1,
			delavecIme: 'Demo',
			orgIme: 'KONCERT',
			orgNaslov: 'Slovenska cesta 150, 1000 Ljubljana',
			mail: 'mail@mail.com',
			orgSif: 'KONCERT',
			telefon: '041242121',
			userName: 'demo',
			token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwLCJzdWIiOiJFU0siLCJuYW1lIjoiSnVyZSIsImxhc3RuYW1lIjoixIxhc2wiLCJvcmciOiJLT04tQ0VSVCIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoiMTkxNjIzOTAyMiIsInBlcm1pc3Npb25zIjoiQ0VSVElGSUtBVF9QUkVHX1ZTRSxFVklERU5DRV9JTl9TSUZSQU5USSxTSEVNQV9QUkVHTEVELFNIRU1BX0FaVVJJUkFKLFpBS19QT0RMX1BSRUdMRUQsWkFLX1BPRExfQVpVUklSQUosS09MSUNJTkVfUFJFR0xFRCxQT1JPQ0lMQV9QUkVHTEVELFBSSUxPR0VfQ0xBTl9QUkVHTEVELFBSSUxPR0VfUFJPSVpWT0RfUFJFR0xFRCxQUk9JWlZPRF9QUkVHTEVELFpaTkFLX1BSRUdMRUQsREVKQVZOT1NUX1BSRUdMRUQifQ.-Ldt3stp9VdsnNA1-2hAPJ5GLJ95PEVNtavK-riEwUE'
		});
	}

	getDemoPravice(): Pravica[] {
		const pravica = new Pravica({});
		pravica.id = 0;
		pravica.naziv = 'AZURIRAJ_CERTIFIKAT';
		pravica.tip = 'RW';

		const result = new List<Pravica>();
		result.Add(pravica);
		result.Add(pravica);
		result.Add(pravica);
		result.Add(pravica);

		return result.ToArray();
	}

	getDemoDejavnosti(): PagedQueryResult {
		const result = new List<Dejavnost>();
		const page = new PagedQueryResult();
		result.Add(new Dejavnost({ id: 1, naziv: 'Pridobivanje mleka' }));
		result.Add(new Dejavnost({ id: 2, naziv: 'Obdelava mlečnih izdelkov' }));
		result.Add(new Dejavnost({ id: 3, naziv: 'Razrez drobovine' }));
		result.Add(new Dejavnost({ id: 4, naziv: 'Izdelava polsuhih mesnih izdelkov' }));
		result.Add(new Dejavnost({ id: 5, naziv: 'Zorenje sira' }));
		result.Add(new Dejavnost({ id: 6, naziv: 'Govedoreja' }));

		page.result = result.ToArray();
		page.resultLength = result.Count();

		return page;
	}

	getDemoClani(i: number): PagedQueryResult {
		const result = new List<Subjekt>();
		const page = new PagedQueryResult();
		result.Add(this.getDemoSubjekt(1));
		result.Add(this.getDemoSubjekt(2));

		if (i % 2 === 0) {
			result.Add(this.getDemoSubjekt(3));
			result.Add(this.getDemoSubjekt(4));
		}
		if (i % 3 === 0) {
			result.Add(this.getDemoSubjekt(5));
			result.Add(this.getDemoSubjekt(6));
		}
		if (i % 4 === 0) {
			result.Add(this.getDemoSubjekt(7));
			result.Add(this.getDemoSubjekt(8));
		}
		page.result = result.ToArray();
		page.resultLength = result.Count();

		return page;
	}

	getDemoSubjekt(i: number): Subjekt {
		return new Subjekt({
			davcna: i % 2 === 0 ? '1534534654' : '2605980500101',
			email: i % 2 === 0 ? 'oseba@gmail.com' : 'podjetje@gmail.com',
			id: i + 1,
			idPoste: i % 2 === 0 ? '5000' : '3313',
			ime: i % 2 === 1 ? null : 'Janez',
			priimek: i % 2 === 1 ? null : 'Novak ' + i.toString(),
			kmgmid: 'KMG100' + i.toString(),
			maticna: '1000' + i.toString(),
			naziv: i % 2 === 0 ? null : 'Podjetje ' + i.toString(),
			posta: i % 2 === 0 ? 'Polzela' : 'Portorož',
			telSt: i % 2 === 0 ? '041-212-141' : '(03) 5-710-850',
			naslov: i % 2 === 0 ? 'Savinjska cesta 150' : 'Dunajska 45'
		});
	}
}
