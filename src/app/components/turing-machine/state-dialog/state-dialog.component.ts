import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
    selector: 'app-state-dialog',
    templateUrl: './state-dialog.component.html',
    styleUrls: ['./state-dialog.component.scss']
})
export class StateDialogComponent implements OnInit {

    private title: string;

    constructor(public dialogRef: MatDialogRef<StateDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.title = "New State";
    }

    ngOnInit() {
    }

    closeDialog() {
        this.dialogRef.close();
    }
}
