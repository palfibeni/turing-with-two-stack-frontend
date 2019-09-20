import {NgModule} from '@angular/core';
import {AgGridModule} from "ag-grid-angular";
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterModule} from "angular2-toaster";

import {AppComponent} from './app.component';
import {MainComponent} from './components/main.component';
import {AppRouting} from "./app.routing";
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {CalculationComponent} from "./components/calculation/calculation.component";

@NgModule({
    imports: [
        AppRouting,
        AgGridModule.withComponents(),
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ToasterModule.forRoot(),
    ],
    declarations: [
        AppComponent,
        MainComponent,
        CalculationComponent,
        PageNotFoundComponent,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
