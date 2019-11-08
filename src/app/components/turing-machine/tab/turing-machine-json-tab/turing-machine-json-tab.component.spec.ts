import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TuringMachineJsonTabComponent} from './turing-machine-json-tab.component';
import {MatDialogModule, MatIconModule, MatToolbarModule} from "@angular/material";
import {ToasterModule, ToasterService} from "angular2-toaster";
import {TuringMachineValidator} from "../../../../validator/turing-machine.validator";
import {MockTuringMachineValidator} from "../../../../testing/mock-turing-machine.validator";

describe('TuringMachineJsonTabComponent', () => {
    let component: TuringMachineJsonTabComponent;
    let fixture: ComponentFixture<TuringMachineJsonTabComponent>;
    let toasterService: ToasterService;
    let turingMachineValidator: TuringMachineValidator;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TuringMachineJsonTabComponent],
            imports: [
                MatIconModule,
                MatDialogModule,
                MatToolbarModule,
                ToasterModule.forRoot()],
            providers: [
                ToasterService,
                {provide: TuringMachineValidator, useClass: MockTuringMachineValidator}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TuringMachineJsonTabComponent);
        component = fixture.componentInstance;
        toasterService = fixture.debugElement.injector.get(ToasterService);
        turingMachineValidator = fixture.debugElement.injector.get(TuringMachineValidator);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
