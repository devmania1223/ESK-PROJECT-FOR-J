import { Component, OnInit, Injector } from '@angular/core';
import { DashboardService } from 'app/_services/dashboard.service';
import { Dashboard } from 'app/_models/dashboard';
import { CertifikatService } from 'app/_services/certifikat.service';
import { PagedQuery } from 'app/_models/pagedQuery';
import { PagedViewComponent } from 'app/layouts/views/base/paged-view-component';
import { AuthenticationService } from 'app/_services';
import { Certifikat } from 'app/_models/certifikat';
import { DownloadService } from 'app/_services/download.service';
import { Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent extends PagedViewComponent implements OnInit {

  public dashboard: Dashboard = new Dashboard();
  public page: PagedQuery = new PagedQuery();
  public certifikat: Certifikat =  null;
  public editCertificate = false;

  constructor(
      injector: Injector, 
      private dashboardService: DashboardService, 
      public certService: CertifikatService, 
      public user: AuthenticationService, 
      private downloadService: DownloadService,
      private certifikatService: CertifikatService,
      private router: Router) { 
    super(injector, certService);
  }
  
  ngOnInit() {
    this.page.currentPage = 0;
    this.page.resultLength = 20;
    if (this.user.isAuthenticated()) {
      this.dashboardService.getByUser(this.user.getAccount().id).pipe(untilDestroyed(this)).subscribe(
        data => {
          this.dashboard = data;
        },
        error => console.log(error)
      );
    }
  }

  navigateToCertifcateView(action: string){
    if (!(this.user.hasPermission("CERTIFIKAT_PREG_VSE") || this.user.hasPermission("CERTIFIKAT_PREG_MOJA_ORG"))){
      this.toastr.info("Nimate pravic za izvajanje! (CERTIFIKAT_PREG_VSE,  CERTIFIKAT_PREG_MOJA_ORG)");
      return;
    }

    // navigate to cert view with param injection
    this.router.navigate(['/certificate-view'], { queryParams: { action: action } });
  }

  newCertificate2(action: string){
    // navigate to cert view with param injection
    this.router.navigate(['/certificate-view'], { queryParams: { action: action } });
  }

  newCertificate(tip: string) {
    if (!this.hasPermission()) {
      return;
    }
    let cert = new Certifikat({ tip: tip, organizacija: this.user.getAccount().orgSif });
    this.certifikat = cert;
    this.certifikat.open = true;
    this.editCertificate = true;
  }

  downloadCertificate(cert: Certifikat){
    if (cert.status === "Vnos") {
      this.toastr.info("Prenos certifikata ni mogoč, če je status certifikata Vnos.", "Prenos certifikata");
      return;
    }

    this.downloadService.downloadFileSystem(cert.id.toString())
      .pipe(untilDestroyed(this)).subscribe(response => {
        const filename = response.headers.get('filename');
 
        this.downloadService.saveFile(response.body, cert.stevilka + ".pdf");
      });
  }

  openCertificate(cert: Certifikat) {
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
    this.certifikat = null;
    this.editCertificate = false;
  }
}
