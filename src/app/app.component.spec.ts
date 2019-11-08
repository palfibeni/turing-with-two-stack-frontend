import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ToasterModule} from "angular2-toaster";
import {RouterTestingModule} from "@angular/router/testing";

import {AppComponent} from './app.component';
import {HeaderComponent} from "./components/header/header.component";
import {MatToolbarModule} from "@angular/material";

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatToolbarModule,
                RouterTestingModule,
                ToasterModule.forRoot(),
            ],
            declarations: [AppComponent, HeaderComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
