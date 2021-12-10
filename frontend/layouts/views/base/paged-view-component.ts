import { Injectable, Injector, ViewChild, TemplateRef } from '@angular/core';
import { BaseCommonComponent } from './base-common.component';
import { BaseService } from 'app/_services/base.service';
import { PagedQuery } from 'app/_models/pagedQuery';
import { PagedQueryResult } from 'app/_models/pagedQueryResult';
import 'linq-typed';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewComponent } from 'app/components/dialog-overview-component/dialog-overview-component';
import { Helpers } from 'app/_shared/helpers';
import { ValuePair } from 'app/_models/valuePair';
import { throwError } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Injectable()
export class PagedViewComponent extends BaseCommonComponent {
    public closeResult: string;
    public selectedRow = 0;
    @ViewChild('templateEdit', null)
    public templateEdit: TemplateRef<any>;
    @ViewChild('templateDelete', null)
    public templateDelete: TemplateRef<any>;
    public page: PagedQuery = new PagedQuery();
    public dialog: MatDialog;
    public query = '';
    public utils: Helpers;

    constructor(injector: Injector, private apiService: BaseService = null) {
        super(injector);
        this.dialog = injector.get(MatDialog);
        this.page.currentPage = 0;
        this.page.resultPerPage = 25;
        this.utils = injector.get(Helpers);
    }

    public prepareConditions() {
        if (!this.page.conditions) {
            this.page.conditions = [];
        }

        this.page.conditions.RemoveAll(x => x.id === 'query');

        if (!this.utils.isNullOrEmpty(this.query)) {
            this.page.conditions.Add(new ValuePair({ id: 'query', value: this.query }));
        }
    }
    // change and select new current item
    public setClickedRow(index: number) {
        this.selectedRow = index;
        if (this.page.result.length > 0) {
            this.selectedValue = this.page.result[index];
        } else {
            this.selectedValue = null;
        }
    }
    // action execute method executeQuery when user press ENTER button
    public keyDownFunction(event) {
        if (event.keyCode === 13) {
            this.page.currentPage = 0;
            this.executeQuery();
        }
    }
    // show and select item in modal window
    public open() {
        this.selectedValue.open = true;
    }
    // add new item to current page.result (ONLY action = NEW) and close current modal window
    public onApply() {
        this.selectedValue.open = false;
    }
    // close opened modal window
    public onClose(value: any) {
        // IF VALUE IS "DELETED" THEN WE NEED TO REMOVE ALSO FROM RESULTSET (USE ONLY WHEN DELETING FROM INPUT FORM, NOT FROM VIEW)
        if (value && value.action === 'DELETED') {
            if (this.page.result && this.page.result.length > 0) {
                this.page.result = this.page.result.RemoveAll(x => x.id === value.value.id).ToArray();
            }
            this.selectedValue = null;

            return;
        }

        // in a CASE of Cancel, value should be the same as CopyValue (init value)
        if (value && value.action === 'CANCEL') {
            const cancelValue = value.value;
            /* if (this.utils.isEmpty(value.value)) {
                 this.selectedValue = null;

                 return;
             }*/

            // if Cancel there is no ID presented in object
            if (this.utils.isEmpty(cancelValue) || this.utils.isEmpty(cancelValue.id) || cancelValue.id === 0) {
                // we need to remove it from result set
                this.page.result.shift();
                this.selectedValue = null;
            } else {
                if (this.selectedValue === null) {
                    this.selectedValue = {};
                }

                Object.assign(this.selectedValue, cancelValue);
                this.selectedValue.open = false;
            }


            return;
        }

        throwError('This is not covered case in paged-view.component.ts at mehod onClose() !!!');
    }

    public hasPermission() {
        if (!this.authentication.hasPermission(this.permission)) {
            this.toastr.info('Nimate pravic za izvajanje! (' + this.permission + ')');
            return false;
        }

        return true;
    }

    public checkPermission(permission: string) {
        if (!this.authentication.hasPermission(permission)) {
            this.toastr.info('Nimate pravic za izvajanje! (' + permission + ')');
            return false;
        }

        return true;
    }

    public deleteItemMaterial(item: any) {
        if (!this.hasPermission()) {
            return;
        }
        this.selectedValue = item;
        this.openDeleteMaterialDialog();
    }

    // delete selected value from DB
    public valueDelete() {
        if (!this.hasPermission()) {
            return;
        }
        this.showProgress(true);
        this.apiService.delete(this.selectedValue).pipe(untilDestroyed(this)).subscribe(res => {
            this.removeItem(res);

        }, error => {
            this.rollback(error);
            console.error(error);
        });
    }
    // handle error
    rollback(res: any): any {
        if (this.utils.isEmpty(this.selectedValue.id)) {
            this.page.result.slice(0);
            this.selectedValue = null;

        }
        this.handleError(res);
        this.showProgress(false);
    }
    // if success, remove selected item from list
    private removeItem(success: boolean): any {
        if (success) {
            this.page.result = this.page.result.filter(obj => obj !== this.selectedValue);
            this.page.resultLength -= 1;
            this.selectedValue.open = false;

            this.toastr.info('Zapis uspešno izbrisan.', 'Brisanje zapisa');
        }
        this.showProgress(false);
    }
    // created new empty record and open modal windows
    public addNewItem() {
        if (!this.hasPermission()) {
            return;
        }
        const record: any = {};
        this.selectedValue = record;
        this.page.result.unshift(record);
        this.open();
    }
    // created new empty record and open modal windows
    public editItem(item: any) {
        if (!this.hasPermission()) {
            return;
        }
        this.selectedValue = item;
        this.open();
    }
    // execute stored procedure to popluate data in frontend with predefined query
    public executeQuery() {
        this.prepareConditions();
        this.showProgress(true);

        this.apiService.list(this.page).pipe(untilDestroyed(this)).subscribe((result: PagedQueryResult) => {
            this.page.result = result.result;
            this.page.resultLength = result.resultLength;
            this.showProgress(false);

            if (result.result.length === 0) {
                this.toastr.info('Poizvedba ni vrnila rezultatov!', 'Poizvedba');
            }
        }, (error) => {
            this.showProgress(false);
            
        });
    }

    public handlePage(e: any) {
        this.page.currentPage = e.pageIndex;
        this.page.resultPerPage = e.pageSize;
        this.executeQuery();
    }

    openDeleteMaterialDialog(): void {
        const dialogData = { title: 'Brisanje zapisa', question: 'Ali res želite izbrisati zapis?', yes: 'Izbriši', no: 'Prekliči' };
        const dialogRef = this.dialog.open(DialogOverviewComponent, {
            data: dialogData
        });

        dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe(result => {
            console.log(result);
            if (result === dialogData.yes) {
                this.valueDelete();
            }
        });
    }
}
