import {NgModule} from '@angular/core';
import {AgGridModule} from 'ag-grid-angular/dist/aggrid.module';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterModule} from "angular2-toaster";
import {
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
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
import {StateDialogComponent} from './components/turing-machine/dialog/state-dialog/state-dialog.component';
import {RuleDialogComponent} from './components/turing-machine/dialog/rule-dialog/rule-dialog.component';
import {TuringConditionComponent} from './components/calculation/turing-condition/turing-condition.component';
import {TwoStackConditionComponent} from './components/calculation/two-stack-condition/two-stack-condition.component';
import {TuringMachineJsonTabComponent} from './components/turing-machine/tab/turing-machine-json-tab/turing-machine-json-tab.component';
import {TuringMachineStateTabComponent} from './components/turing-machine/tab/turing-machine-state-tab/turing-machine-state-tab.component';
import {TuringMachineRuleTabComponent} from './components/turing-machine/tab/turing-machine-rule-tab/turing-machine-rule-tab.component';
import {TuringMachineCharacterTabComponent} from './components/turing-machine/tab/turing-machine-character-tab/turing-machine-character-tab.component';
import {CalculationDifferenceTabComponent} from './components/calculation/tab/calculation-difference-tab/calculation-difference-tab.component';
import {CalculationTwoStackInitTabComponent} from './components/calculation/tab/calculation-two-stack-init-tab/calculation-two-stack-init-tab.component';
import {HelpDialogComponent} from './components/header/help-dialog/help-dialog.component';
import {TextFieldModule} from "@angular/cdk/text-field";

@NgModule({
    imports: [
        AgGridModule.withComponents(),
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToasterModule.forRoot(),
        ReactiveFormsModule,

        // Material imports
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule,
        MatRadioModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        MatSelectModule,
        TextFieldModule,

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
        TwoStackConditionComponent,
        TuringMachineJsonTabComponent,
        TuringMachineStateTabComponent,
        TuringMachineRuleTabComponent,
        TuringMachineCharacterTabComponent,
        CalculationDifferenceTabComponent,
        CalculationTwoStackInitTabComponent,
        HelpDialogComponent
    ],
    entryComponents: [
        StateDialogComponent,
        RuleDialogComponent,
        HelpDialogComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
