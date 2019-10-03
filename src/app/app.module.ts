import {NgModule} from '@angular/core';
import {AgGridModule} from 'ag-grid-angular/dist/aggrid.module';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterModule} from "angular2-toaster";
import {
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
} from "@angular/material";

import {AppComponent} from './app.component';
import {HeaderComponent} from "./components/header/header.component";
import {AppRouting} from "./app.routing";
import {TuringMachineListComponent} from './components/turing-machine-list/turing-machine-list.component';
import {TuringMachineComponent} from "./components/turing-machine/turing-machine.component";
import {CalculationComponent} from "./components/calculation/calculation.component";
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {StateDialogComponent} from './components/turing-machine/state-dialog/state-dialog.component';
import {RuleDialogComponent} from './components/turing-machine/rule-dialog/rule-dialog.component';
import {TuringConditionComponent} from './components/calculation/turing-condition/turing-condition.component';
import {TwoStackConditionComponent} from './components/calculation/two-stack-condition/two-stack-condition.component';

@NgModule({
    imports: [
        AgGridModule.withComponents(),
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToasterModule.forRoot(),

        // Material imports
        MatCheckboxModule,
        MatFormFieldModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule,
        MatRadioModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,

        // My imports
        AppRouting
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        TuringMachineListComponent,
        TuringMachineComponent,
        CalculationComponent,
        PageNotFoundComponent,
        StateDialogComponent,
        RuleDialogComponent,
        TuringConditionComponent,
        TwoStackConditionComponent
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
