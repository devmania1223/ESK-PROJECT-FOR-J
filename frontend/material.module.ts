import { NgModule } from '@angular/core';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';

import { MatSlideToggleModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatMenuModule, MatIconModule, MatDialogModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatButtonToggleModule, MatTabsModule, MatExpansionModule, MatTableModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { UserDateAdapter, DateFormat } from './_shared/format-datepicker';


@NgModule({
  imports: [MatProgressSpinnerModule, MatTableModule, MatExpansionModule, MatTabsModule, MatSlideToggleModule, MatButtonToggleModule, MatNativeDateModule, MatDatepickerModule, MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatMenuModule, MatIconModule, MatDialogModule, MatMomentDateModule],
  exports: [MatProgressSpinnerModule, MatTableModule, MatExpansionModule, MatTabsModule, MatSlideToggleModule, MatButtonToggleModule, MatNativeDateModule, MatDatepickerModule, MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatMenuModule, MatIconModule, MatDialogModule],
  providers: [
    //{ provide: DateAdapter, useClass: UserDateAdapter},
    //{ provide: MAT_DATE_FORMATS, useValue: DateFormat }
    [{provide: MAT_DATE_LOCALE, useValue: "sl-SI"}]
  ]
})


export class MaterialModule { }