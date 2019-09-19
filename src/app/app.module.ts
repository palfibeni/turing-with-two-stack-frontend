import {NgModule} from '@angular/core';
import {AgGridModule} from "ag-grid-angular";
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './components/app.component';
import {HelloComponent} from './components/hello.component';

@NgModule({
    imports: [
        AgGridModule.withComponents(),
        BrowserModule,
        FormsModule,
        HttpClientModule,
    ],
    declarations: [
        AppComponent,
        HelloComponent,

    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
