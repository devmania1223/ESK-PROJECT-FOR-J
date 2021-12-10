import { Injectable, Injector, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseCommonComponent } from './base-common.component';
import { BaseService } from 'app/_services/base.service';
import { MatDialog } from '@angular/material';
import { DialogOverviewComponent } from 'app/components/dialog-overview-component/dialog-overview-component';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Injectable()
export class BaseFormComponent extends BaseCommonComponent implements OnInit {
    public copyValue: any;
    @Output() public onApply: EventEmitter<any> = new EventEmitter();
    @Output() public onClose: EventEmitter<any> = new EventEmitter();

    constructor(injector: Injector, private apiService: BaseService = null) {
        super(injector);
        this.dialog = injector.get(MatDialog);
    }

    ngOnInit(): void {
        this.copyValue = this.utils.clone(this.selectedValue);
    }

    public apply() {
        const action = this.utils.isEmpty(this.selectedValue.id) ? 'NEW' : 'EDIT';
        this.showProgress(true);
        if (action === 'NEW') {
            this.apiService.post(this.selectedValue).subscribe
                (
                    res => {
                        this.commit(res, action);
                    }
                );
        } else {
            this.apiService.put(this.selectedValue).subscribe
                (
                    res => {
                        this.commit(res, action);
                    }
                );
        }
    }

    public commit(res: any, action: string) {
        Object.assign(this.selectedValue, res);
        this.showProgress(false);
        this.selectedValue.open = false;
        this.onApply.emit(action);
    }

    public cancel() {
        if (this.utils.objectsAreEqual(this.selectedValue, this.copyValue)) {
            // when canceling action we nedd to send to view old value
            this.showProgress(false);
            this.onClose.emit({action: "CANCEL", value: this.copyValue});
        } else {
            this.closeMaterialDialog();
        }
    }

    public dataChanged(){
        return !this.utils.objectsAreEqual(this.selectedValue, this.copyValue);
    }

    public dialog: MatDialog;

    closeMaterialDialog(): void {
        let dialogData = { title: "Izhod", question: "Imate ne shranjene podatke. Ali res želite prekiniti urejanje?", yes: "Da", no: "Ne" };
        const dialogRef = this.dialog.open(DialogOverviewComponent, {
            data: dialogData
        });

        dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe(result => {
            console.log(result);
            if (result === dialogData.yes) {
                // when canceling action we nedd to send to view old value
                this.showProgress(false);
                this.onClose.emit({action: "CANCEL", value: this.copyValue});
            }
        });
    }

    public hasPermission(permission: string) {
        if (!this.authentication.hasPermission(permission)) {
            this.toastr.info("Nimate pravic za izvajanje! (" + permission + ")");
            return false;
        }

        return true;
    }
}
