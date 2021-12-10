import { Component, Inject } from "@angular/core";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogData } from "app/_models/dialogData";

@Component({
    selector: 'dialog-overview-component',
    templateUrl: 'dialog-overview-component.html',
  })
  export class DialogOverviewComponent {
  
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }