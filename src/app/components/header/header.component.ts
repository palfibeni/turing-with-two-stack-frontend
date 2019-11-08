import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {HelpDialogComponent} from "./help-dialog/help-dialog.component";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private dialog: MatDialog) {
    }

    public ngOnInit(): void {
    }

    public showHelp(): void {
        this.dialog.open(HelpDialogComponent, {});
    }

}
