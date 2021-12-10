import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ToastrModule } from 'ngx-toastr';
import { CertifikatService } from './_services/certifikat.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DemoService } from './_services/demo.service';
import { DashboardService } from './_services/dashboard.service';
import { AuthenticationService } from './_services';
import { BreakLinePipe } from './_pipes/break-liner';
import { HtmlToTextPipe } from './_pipes/html-to-text.pipe';
import { CapitalizeFirstPipe } from './_pipes/capitalize-first.pipe';
import { TruncatePipe } from './_pipes/truncate.pipe';
import { ShemaService } from './_services/shema.service';
import { MaterialModule } from './material.module';
import { DejavnostService } from './_services/dejavnost.service';
import { DialogOverviewComponent } from './components/dialog-overview-component/dialog-overview-component';
import { BrowserModule } from '@angular/platform-browser';
import { ZascitniZnakService } from './_services/zascitni-znak.service';
import { ProizvodService } from './_services/proizvod.service';
import { SubjektService } from './_services/subjekt.service';
import { ProizvodKolicineService } from './_services/proizvod-kolicine.service';
import { ReportsService } from './_services/reports.service';
import { DatePipe } from '@angular/common';
import { ZakonskaPodlagaService } from './_services/zakonska-podlaga.service';
import { PrilogeClanovReportService } from './_services/priloge-clanov-report.service';
import { AuthGuard } from './_guards';
import { PrilogaService } from './_services/priloga.service';
import { PrilogeProizvodovReportService } from './_services/priloge-proizvodov-report.service';
import { ExcelService } from './_services/excel.service';
import { Helpers } from './_shared/helpers';
import { BusyLoaderComponent } from './components/busy-loader/busy-loader.component';
import { LoaderService } from './_services/loaderService';
import { ZascitenProizvodService } from './_services/zasciten-proizvod.service';
import { ApiInterceptor } from './_interceptors/api.interceptor';
import { AdministratorService } from './_services/administrator.service';
import { DbSettingsService } from './_services/db-settings-service';
import { ConfigService } from './_services/settings.service';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { UserIdleModule } from 'angular-user-idle';

export function init_app(appConfigService: ConfigService) {
  return () => appConfigService.load();
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    HttpClientModule,
    MaterialModule,
    BrowserModule,
    ReactiveFormsModule,
    LoadingBarHttpClientModule,
    UserIdleModule.forRoot({idle: (60*120)-30, timeout: 30, ping: 1})
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    BreakLinePipe,
    CapitalizeFirstPipe,
    HtmlToTextPipe,
    TruncatePipe,
    DialogOverviewComponent,
    BusyLoaderComponent
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [ConfigService], multi: true },
    CertifikatService,
    DemoService,
    DashboardService,
    AuthenticationService,
    ShemaService,
    DejavnostService,
    ZascitniZnakService,
    ProizvodService,
    SubjektService,
    ProizvodKolicineService,
    ReportsService,
    DatePipe,
    ZakonskaPodlagaService,
    PrilogeClanovReportService,
    PrilogeProizvodovReportService,
    AuthGuard,
    PrilogaService,
    ExcelService,
    Helpers,
    LoaderService,
    ZascitenProizvodService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    AdministratorService,
    DbSettingsService,
    ConfigService
  ],
  bootstrap: [AppComponent],
  exports: [
    BreakLinePipe,
    CapitalizeFirstPipe,
    HtmlToTextPipe,
    TruncatePipe,
    DialogOverviewComponent,
    BusyLoaderComponent
  ],
  entryComponents: [DialogOverviewComponent],
})
export class AppModule { }
