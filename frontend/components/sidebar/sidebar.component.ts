import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'app/_services';
import { DbSettings } from 'app/_models/db-settings';
import { DbSettingsService } from 'app/_services/db-settings-service';
import { untilDestroyed } from 'ngx-take-until-destroy';

declare const $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  menuItems: any[];
  location: Location;
  private sidebarVisible: boolean;
  public dbSettings: DbSettings = new DbSettings();

  constructor(
    public user: AuthenticationService,
    public dbSettingsService: DbSettingsService
    ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    // NEEDS TO BE HERE, BECUASE OF AUTO DESTROY PACKAGE INVOLVED.
  }

  ngAfterViewInit(){
    this.dbSettingsService.get({ id: 0}).pipe(untilDestroyed(this)).subscribe(
        data => { 
          this.dbSettings = data; 
          this.dbSettings.className = data.appName === 'Produkcija' ? '' : 'test';
        },
        error => {
            this.dbSettings.verzija = '1.0';
            this.dbSettings.appName = 'ORACLE';
        }
    );
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
