import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from 'app/_services/loaderService';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-busy-loader',
  templateUrl: './busy-loader.component.html',
  styleUrls: ['./busy-loader.component.scss']
})
export class BusyLoaderComponent implements OnInit, OnDestroy {
  public objLoaderStatus: boolean;

  constructor(private loaderService: LoaderService) {
    this.objLoaderStatus = false;
  }
  
  ngOnDestroy(): void {
    // NEEDS TO BE HERE, BECUASE OF AUTO DESTROY PACKAGE INVOLVED.
  }

  ngOnInit() {
    this.loaderService.loaderStatus.pipe(untilDestroyed(this)).subscribe((show: boolean) => {
      this.objLoaderStatus = show;
    });
  }
}
