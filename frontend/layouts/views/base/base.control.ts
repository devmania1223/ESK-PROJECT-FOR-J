import { Injectable, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { QueryParams } from 'app/_models/queryParams';

@Injectable()
export class BaseControl implements OnDestroy{
    @Input() public readonly: boolean;
    @Input() public title: string;
    @Input() public class: string;
    @Input() public placeholder: string;
    @Input() public required = false;
    @Input() public enabled = true;
    @Input() public value: any;
    @Output() public valueChange: EventEmitter<any> = new EventEmitter<any>();
    @Input() public valid: boolean;
    @Output() public validChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() public data: any[] = [];
    @Output() public dataChange: EventEmitter<any[]> = new EventEmitter<any[]>();
    public queryParams: QueryParams = new QueryParams();
    public showProgress = false;
    @Output() public onProgressChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor() {
    }

    ngOnDestroy(): void {
        // NEEDS TO BE HERE, BECUASE OF AUTO DESTROY PACKAGE INVOLVED.
    }
}
