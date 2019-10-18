import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
    selector: 'app-rule-dialog',
    templateUrl: './rule-dialog.component.html',
    styleUrls: ['./rule-dialog.component.scss']
})
export class RuleDialogComponent implements OnInit {

    private title: string;

    constructor(public dialogRef: MatDialogRef<RuleDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.title = "New Rule";
    }

    ngOnInit() {
    }

    closeDialog() {
        this.dialogRef.close();
    }
}
