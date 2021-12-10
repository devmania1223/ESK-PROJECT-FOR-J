import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ShemaViewComponent } from '../views/shema-view/shema-view.component';
import { DejavnostViewComponent } from '../views/dejavnost-view/dejavnost-view.component';
import { ProizvodViewComponent } from '../views/proizvod-view/proizvod-view.component';
import { ZascitniZnakViewComponent } from '../views/zascitni-znak-view/zascitni-znak-view.component';
import { CertifikatViewComponent } from '../views/certifikat-view/certifikat-view.component';
import { LoginComponent } from '../login/login.component';
import { ProizvodKolicineViewComponent } from '../views/proizvod-kolicine-view/proizvod-kolicine-view.component';
import { ReportsViewComponent } from '../views/reports-view/reports-view.component';
import { ZakonskaPodlagaViewComponent } from '../views/zakonska-podlaga-view/zakonska-podlaga-view.component';
import { PrilogeClanovReportViewComponent } from '../views/priloge-clanov-report/priloge-clanov-report-view.component';
import { AuthGuard } from 'app/_guards';
import { PrilogeProizvodovReportViewComponent } from '../views/priloge-proizvodov-report/priloge-proizvodov-report-view.component';
import { AdministratorComponent } from 'app/administrator/administrator.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent, canActivate: [AuthGuard]  },
    { path: 'certificate-view',     component: CertifikatViewComponent, canActivate: [AuthGuard] },
    { path: 'login',     component: LoginComponent },
    { path: 'schema-view',     component: ShemaViewComponent, canActivate: [AuthGuard] },
    { path: 'activity-view',     component: DejavnostViewComponent, canActivate: [AuthGuard] },
    { path: 'product-view',          component: ProizvodViewComponent, canActivate: [AuthGuard] },
    { path: 'trademark-view',           component: ZascitniZnakViewComponent, canActivate: [AuthGuard] },
    { path: 'quantities',  component: ProizvodKolicineViewComponent, canActivate: [AuthGuard] },
    { path: 'reports',        component: ReportsViewComponent, canActivate: [AuthGuard] },
    { path: 'law-view',        component: ZakonskaPodlagaViewComponent, canActivate: [AuthGuard] },
    { path: 'attachment-view',        component: PrilogeClanovReportViewComponent, canActivate: [AuthGuard] },
    { path: 'attachment-product-view',component: PrilogeProizvodovReportViewComponent, canActivate: [AuthGuard] },
    { path: 'administrator',        component: AdministratorComponent, canActivate: [AuthGuard] }
];
