import { Injectable, Injector, Input, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Helpers } from 'app/_shared/helpers';
import { AuthenticationService } from 'app/_services';
import { LoaderService } from 'app/_services/loaderService';

@Injectable()
export class  BaseCommonComponent implements OnDestroy {
    public errorMsg = '';
    public toastr: ToastrService;
    @Input() public selectedValue: any;
    @Input() public permission: any;
    public utils: Helpers;
    public authentication: AuthenticationService;
    public loaderService: LoaderService;
    
    constructor(injector: Injector) {
        this.toastr = injector.get(ToastrService);
        this.utils = injector.get(Helpers);
        this.authentication = injector.get(AuthenticationService);
        this.loaderService = injector.get(LoaderService);
    }
    ngOnDestroy(): void {
        // NEEDS TO BE HERE, BECUASE OF AUTO DESTROY PACKAGE INVOLVED.
    }

    public handleError(response: any) {
        if (response && response.ErrorMessage) {
            console.log(response.ErrorMessage);
        }
    }

    public isError(response: any): boolean {
        if (response && response.ErrorMessage && response.ErrorMessage !== '') {
            return true;
        } else {
            return false;
        }
    }

    public clearError(): void {
        this.errorMsg = '';
    }

    public internalError(error: any) {
        
    }
    
    public showProgress(show: boolean){
        this.loaderService.displayLoader(show);
    }
}
