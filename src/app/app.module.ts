import {NgModule} from '@angular/core';
import {AgGridModule} from "ag-grid-angular";
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {ToasterModule} from 'angular2-toaster';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MainComponent} from './components/main.component';
import {HelloComponent} from './components/hello.component';


const appRoutes: Routes = [
    {
        path: 'main',
        component: MainComponent,
        data: { title: 'Heroes List' }
    },
    { path: '',
        redirectTo: '/main',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        AgGridModule.withComponents(),
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        ToasterModule.forRoot(),
        BrowserAnimationsModule,
    ],
    declarations: [
        MainComponent,
        HelloComponent,

    ],
    bootstrap: [
        MainComponent
    ]
})
export class AppModule {
}
