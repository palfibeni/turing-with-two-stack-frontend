import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TuringMachineCharacterTabComponent} from './turing-machine-character-tab.component';
import {MatDialogModule, MatIconModule, MatInputModule, MatRadioModule, MatToolbarModule} from "@angular/material";
import {ToasterModule, ToasterService} from "angular2-toaster";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('TuringMachineCharacterTabComponent', () => {
    let component: TuringMachineCharacterTabComponent;
    let fixture: ComponentFixture<TuringMachineCharacterTabComponent>;
    let toasterService: ToasterService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TuringMachineCharacterTabComponent],
            imports: [
                FormsModule,
                BrowserModule,
                BrowserAnimationsModule,
                MatIconModule,
                MatDialogModule,
                MatToolbarModule,
                MatRadioModule,
                MatInputModule,
                ToasterModule.forRoot()],
            providers: [
                ToasterService,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TuringMachineCharacterTabComponent);
        component = fixture.componentInstance;
        toasterService = fixture.debugElement.injector.get(ToasterService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
