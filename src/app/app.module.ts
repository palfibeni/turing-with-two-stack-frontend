import {NgModule} from '@angular/core';
import {AgGridModule} from "ag-grid-angular";
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterModule} from "angular2-toaster";
import {MatDialogModule, MatIconModule, MatMenuModule, MatToolbarModule} from "@angular/material";

import {AppComponent} from './app.component';
import {HeaderComponent} from "./components/header/header.component";
import {AppRouting} from "./app.routing";
import {TuringMachineListComponent} from './components/turing-machine-list/turing-machine-list.component';
import {TuringMachineComponent} from "./components/turing-machine/turing-machine.component";
import {CalculationComponent} from "./components/calculation/calculation.component";
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {StateDialogComponent} from './components/turing-machine/state-dialog/state-dialog.component';
import {RuleDialogComponent} from './components/turing-machine/rule-dialog/rule-dialog.component';

@NgModule({
    imports: [
        AppRouting,
        AgGridModule.withComponents(),
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ToasterModule.forRoot(),
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatDialogModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        TuringMachineListComponent,
        TuringMachineComponent,
        CalculationComponent,
        PageNotFoundComponent,
        StateDialogComponent,
        RuleDialogComponent
    ],
    entryComponents: [
        StateDialogComponent,
        RuleDialogComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
