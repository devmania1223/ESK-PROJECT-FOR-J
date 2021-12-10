import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ShemaViewComponent } from '../views/shema-view/shema-view.component';
import { MaterialModule } from 'app/material.module';
import { MatPaginatorModule } from '@angular/material';
import { DejavnostViewComponent } from '../views/dejavnost-view/dejavnost-view.component';
import { ShemaFormComponent } from '../views/shema-view/shema-form/shema-form.component';
import { DejavnostFormComponent } from '../views/dejavnost-view/dejavnost-form/dejavnost-form.component';
import { ZascitniZnakViewComponent } from '../views/zascitni-znak-view/zascitni-znak-view.component';
import { ZascitniZnakFormComponent } from '../views/zascitni-znak-view/zascitni-znak-form/zascitni-znak-form.component';
import { ProizvodViewComponent } from '../views/proizvod-view/proizvod-view.component';
import { ProizvodFormComponent } from '../views/proizvod-view/proizvod-form/proizvod-form.component';
import { EskSubjektAutoCompleteComponent } from 'app/components/subjekt-autocomplete/subjekt-autocomplete';
import { StringAutoCompleteComponent } from 'app/components/string-autocomplete/string-autocomplete';
import { CertifikatViewComponent } from '../views/certifikat-view/certifikat-view.component';
import { LoginComponent } from '../login/login.component';
import { ProizvodKolicineViewComponent } from '../views/proizvod-kolicine-view/proizvod-kolicine-view.component';
import { ReportsViewComponent } from '../views/reports-view/reports-view.component';
import { CertifikatFormComponent } from '../views/certifikat-view/certifikat-form/certifikat-form.component';
import { ButtonRendererComponent } from 'app/components/ag-grid-button-renderer';
import { EskDejavnostAutoCompleteComponent } from 'app/components/dejavnost-autocomplete/dejavnost-autocomplete';
import { FileUploadModule } from 'ng2-file-upload';
import { FileUploadComponent } from 'app/components/file-upload/file-upload.component';
import { CertifikatCompareComponent } from '../views/certifikat-view/certifikat-compare/certifikat-compare.component';
import { ZakonskaPodlagaAutoCompleteComponent } from 'app/components/zakon-autocomplete/zakon-autocomplete';
import { ZakonskaPodlagaFormComponent } from '../views/zakonska-podlaga-view/zakonska-podlaga-form/zakonska-podlaga-form.component';
import { ZakonskaPodlagaViewComponent } from '../views/zakonska-podlaga-view/zakonska-podlaga-view.component';
import { PrilogeClanovReportViewComponent } from '../views/priloge-clanov-report/priloge-clanov-report-view.component';
import { PrilogeProizvodovReportViewComponent } from '../views/priloge-proizvodov-report/priloge-proizvodov-report-view.component';
import { MultipleSelectComponent } from 'app/components/muliple-select/multiple-select';
import { ProizvodSelectorComponent } from '../views/proizvod-view/proizvod-selector/proizvod-selector.component';
import { BaseAutoCompleteComponent } from 'app/components/base-autocomplete.component/base-autocomplete.component';
import { ShemaAutoCompleteComponent } from 'app/components/shema-autocomplete/shema-autocomplete';
import { ZascitenProizvodAutoCompleteComponent } from 'app/components/zasciten-proizvod-autocomplete/zasciten-proizvod-autocomplete';
import { ProizvodMultipleSelectComponent } from 'app/components/proizvod-multiple-select/proizvod-multiple-select';
import { AdministratorComponent } from 'app/administrator/administrator.component';
import { DejavnostMultipleSelectComponent } from 'app/components/dejavnost-multiple-select/dejavnost-multiple-select';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { ToolbarService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';

@NgModule({
  imports: [ 
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    MaterialModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FileUploadModule,
    // Registering EJ2 RichTextEditor Module
    RichTextEditorAllModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    CertifikatViewComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ShemaViewComponent,
    ShemaFormComponent,
    DejavnostViewComponent,
    DejavnostFormComponent,
    ZascitniZnakViewComponent,
    ZascitniZnakFormComponent,
    ProizvodViewComponent,
    ProizvodFormComponent,
    StringAutoCompleteComponent,
    EskSubjektAutoCompleteComponent,
    LoginComponent,
    ProizvodKolicineViewComponent,
    ReportsViewComponent,
    CertifikatFormComponent,
    CertifikatCompareComponent,
    ButtonRendererComponent,
    EskDejavnostAutoCompleteComponent,
    DejavnostMultipleSelectComponent,
    FileUploadComponent,
    ZakonskaPodlagaAutoCompleteComponent,
    ZakonskaPodlagaFormComponent,
    ZakonskaPodlagaViewComponent,
    PrilogeClanovReportViewComponent,
    PrilogeProizvodovReportViewComponent,
    MultipleSelectComponent,
    ProizvodSelectorComponent,
    BaseAutoCompleteComponent,
    ShemaAutoCompleteComponent,
    ZascitenProizvodAutoCompleteComponent,
    ProizvodMultipleSelectComponent,
    AdministratorComponent
  ],
  exports: [LoginComponent],
  providers: [ToolbarService, HtmlEditorService]
})

export class AdminLayoutModule { }
