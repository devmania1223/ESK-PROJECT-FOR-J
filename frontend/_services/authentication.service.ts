import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Uporabnik, LoginResponse } from 'app/_models/uporabnik';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Pravica } from 'app/_models/pravica';
import { Helpers } from 'app/_shared/helpers';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ConfigService } from './settings.service';
import { Observable } from 'rxjs/Rx';
import { UserIdleConfig, UserIdleService } from 'angular-user-idle';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    childs: RouteInfo[];
    permission: string;
    visible: boolean;
}
export const ROUTES: RouteInfo[] = [
    {
        path: '/dashboard',
        title: 'DOMOV',
        icon: 'home',
        class: '',
        childs: null,
        permission: null,
        visible: false
    },
    {
        path: '/login',
        title: 'PRIJAVA',
        icon: 'person_outline',
        class: '',
        childs: null,
        permission: 'PUBLIC',
        visible: false
    },
    {
        path: '/certificate-view',
        title: 'SEZNAM CERTIFIKATOV',
        icon: 'content_paste',
        class: '',
        childs: null,
        permission: 'CERTIFIKAT_PREG_VSE,CERTIFIKAT_PREG_MOJA_ORG',
        visible: false
    },
    {
        path: null, title: 'EVIDENCE IN ŠIFRANTI', icon: 'library_books', class: '', childs: [
            {
                path: '/product-view',
                title: 'PROIZVODI',
                icon: 'dns', class: '',
                childs: null,
                permission: 'PROIZVOD_PREGLED',
                visible: false
            },
            {
                path: '/trademark-view',
                title: 'ZAŠČITNI ZNAKI',
                icon: 'fingerprint',
                class: '',
                childs: null,
                permission: 'ZZNAK_PREGLED',
                visible: false
            },
            {
                path: '/activity-view',
                title: 'VRSTE DEJAVNOSTI',
                icon: 'queue', class: '',
                childs: null,
                permission: 'DEJAVNOST_PREGLED',
                visible: false
            },
            {
                path: '/law-view',
                title: 'ZAKONSKE PODLAGE',
                icon: 'tab',
                class: '',
                childs: null,
                permission: 'ZAK_PODL_PREGLED',
                visible: false
            }
        ], permission: 'SIFRANTI_PREGLED'
        , visible: false
    },
    {
        path: '/quantities',
        title: 'KOLIČINE IN POVRŠINE',
        icon: 'format_list_numbered',
        class: '',
        childs: null,
        permission: 'KOLICINE_PREGLED',
        visible: false
    },
    {
        path: '/attachment-view',
        title: 'PRILOGE – ČLANI',
        icon: 'attachment',
        class: '',
        childs: null,
        permission: 'PRILOGE_CLAN_PREGLED',
        visible: false
    },
    {
        path: '/attachment-product-view',
        title: 'PRILOGE – PROIZVODI',
        icon: 'attachment',
        class: '',
        childs: null,
        permission: 'PRILOGE_PROIZVOD_PREGLED',
        visible: false
    },
    {
        path: '/reports',
        title: 'POROČILA',
        icon: 'assignment',
        class: '',
        childs: null,
        permission: 'POIZVEDBA_PRIPRAVLJENA_POROCILA',
        visible: false
    },
    {
        path: '/administrator',
        title: 'ADMINISTRATOR',
        icon: 'verified_user',
        class: '',
        childs: null,
        permission: 'CERTIFIKAT_PREG_VSE',
        visible: false
    }
];

@Injectable()
export class AuthenticationService implements OnDestroy {
    private currentAccount: Uporabnik;

    constructor(
        private http: HttpClient,
        private router: Router,
        private utils: Helpers,
        private toastr: ToastrService,
        private config: ConfigService,
        private userIdle: UserIdleService) {
    }

    ngOnDestroy(): void {
        // NEEDS TO BE HERE, BECUASE OF AUTO DESTROY PACKAGE INVOLVED.
    }

    public getMenuItems() {
        ROUTES.forEach(parent => {
            parent.visible = this.hasPermission(parent.permission);
            if (parent.childs) {
                parent.childs.forEach(child => {
                    child.visible = this.hasPermission(child.permission);
                });
            }
        });

        return ROUTES;
    }

    setActivityTime() {
        if (!this.currentAccount) {
            return;
        }
        this.currentAccount.lastExeceutionTime = Date.now();
        this.userIdle.resetTimer();
    }

    public hasPermission(value: string): boolean {

        if (value === null || value === undefined ||
            (value === 'PUBLIC' && this.config.appPurpose() === 'INTERNAL' && !this.isAuthenticated())) {
            return true;
        }

        if (!this.isAuthenticated()) {
            return false;
        }

        if (!this.currentAccount.pravice) {
            return false;
        }

        const permissionList = value.split(',');
        for (const permissionName of permissionList) {
            for (const permission of this.currentAccount.pravice) {
                if (permissionName === permission.naziv) {
                    return true;
                }
            }
        }

        return false;
    }

    public login(username: string, password: string) {

        this.http.post<LoginResponse>('server/authenticate', { username: username, password: password })
            .pipe(untilDestroyed(this)).subscribe(
                data => {
                    this.successfullLogin(data);
                }
            );
    }

    private successfullLogin(response: LoginResponse) {
        let cnf = new UserIdleConfig();
        cnf.idle = (this.config.executionPeriod()/1000) -30;
        cnf.timeout = 30;
        cnf.ping = 30;
        this.userIdle.setConfigValues(cnf);
        //Start watching for user inactivity.
        this.userIdle.startWatching();

        // Start watching when user idle is starting.
        this.userIdle.onTimerStart().subscribe(count => {
            if (count && count%10 == 1) {
                this.toastr.success("Zaklepam čez " + (cnf.timeout + 1 - count).toString() + "s ...", "Neaktivna seja");
            }
        });
        // Start watch when time is up.
        this.userIdle.onTimeout().subscribe(() => { console.log('Lockout account...'); this.logout() });
        this.updateAccount(response);
        this.toastr.info('Prijava je bila uspešna.', 'Pozdravljeni ' + response.user.eskUser.delavecIme);
        this.router.navigate(['dashboard']);
    }

    public updateAccount(response: LoginResponse) {
        this.currentAccount = new Uporabnik();
        this.currentAccount.id = response.user.eskUser.id;
        this.currentAccount.delavecIme = response.user.eskUser.delavecIme;
        this.currentAccount.mail = response.user.eskUser.mail;
        this.currentAccount.orgIme = response.user.eskUser.orgIme;
        this.currentAccount.orgSif = response.user.eskUser.orgSif;
        this.currentAccount.orgNaslov = response.user.eskUser.orgNaslov;
        this.currentAccount.telefon = response.user.eskUser.tel;
        this.currentAccount.userName = response.user.eskUser.userName;
        this.currentAccount.token = response.token;
        this.currentAccount.lastExeceutionTime = Date.now();
        this.currentAccount.pravice = this.getPravice(response.user.eskUser.pravice);
    }

    private getPravice(permissions: any): Pravica[] {
        if (this.utils.isNullOrEmpty(permissions)) {
            return [];
        }

        const pravice: Pravica[] = [];
        permissions.split(',').forEach(element => {
            pravice.push(new Pravica({ id: 0, tip: '', naziv: element }));
        });

        return pravice;
    }

    public getAccount(): Uporabnik {
        return this.currentAccount;
    }

    public logout() {
        // remove user from local storage to log user out
        this.currentAccount = null;
        console.log("logout");
        this.router.navigate(['login']);
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();

        if (!token) {
            return false;
        }
        //const lastExecutionPeriod = Date.now() - this.currentAccount.lastExeceutionTime;

        //const valid = lastExecutionPeriod < this.config.executionPeriod();

        return true;
    }

    refreshToken(): Observable<string> {
        return this.http.get("server/refreshtoken").map((user: LoginResponse) => {
            this.updateAccount(user);
            return user.token;
        }).first();
    }

    public getToken(): string {
        return this.currentAccount ? this.currentAccount.token : null;
    }

    public isAdmin() {
        if (!this.isAuthenticated()) {
            return false;
        }
        return this.hasPermission('CERTIFIKAT_PREG_VSE');
    }

    // https://www.npmjs.com/package/angular-user-idle
    stop() {
        this.userIdle.stopTimer();
    }

    stopWatching() {
        this.userIdle.stopWatching();
    }

    startWatching() {
        this.userIdle.startWatching();
    }

    restart() {
        this.userIdle.resetTimer();
    }
}
