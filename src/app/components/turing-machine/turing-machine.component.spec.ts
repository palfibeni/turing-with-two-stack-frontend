import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, Router} from "@angular/router";
import {AgGridModule} from "ag-grid-angular";
import {ToasterModule, ToasterService} from "angular2-toaster";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {TuringMachineComponent} from "./turing-machine.component";
import {TuringMachineService} from "../../service/turing-machine.service";
import {CalculationService} from "../../service/calculation.service";
import {TuringMachineJsonTabComponent} from "./tab/turing-machine-json-tab/turing-machine-json-tab.component";
import {TuringMachineRuleTabComponent} from "./tab/turing-machine-rule-tab/turing-machine-rule-tab.component";
import {TuringMachineStateTabComponent} from "./tab/turing-machine-state-tab/turing-machine-state-tab.component";
import {TuringMachineCharacterTabComponent} from "./tab/turing-machine-character-tab/turing-machine-character-tab.component";
import {
    MatDialog,
    MatDialogModule,
    MatIconModule,
    MatRadioModule,
    MatTabsModule,
    MatToolbarModule
} from "@angular/material";
import {MockTuringMachineService} from "../../testing/mock-turing-machine.service";
import {MockCalculationService} from "../../testing/mock-calculation.service";
import anything = jasmine.anything;
import {TextFieldModule} from "@angular/cdk/text-field";

describe('TuringMachineComponent', () => {
    let component: TuringMachineComponent;
    let fixture: ComponentFixture<TuringMachineComponent>;
    let calculationService: CalculationService;
    let toasterService: ToasterService;

    const router = jasmine.createSpyObj('Router', {
        'navigate': ''
    });
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AgGridModule.withComponents([]),
                FormsModule,
                BrowserModule,
                BrowserAnimationsModule,
                MatIconModule,
                MatToolbarModule,
                MatRadioModule,
                MatTabsModule,
                TextFieldModule,
                MatDialogModule,
                ToasterModule.forRoot()],
            declarations: [
                TuringMachineComponent,
                TuringMachineJsonTabComponent,
                TuringMachineRuleTabComponent,
                TuringMachineStateTabComponent,
                TuringMachineCharacterTabComponent
            ],
            providers: [
                ToasterService,
                MatDialog,
                {provide: Router, useValue: router},
                {provide: ActivatedRoute, useValue: {snapshot: {paramMap: new Map([['entityId', 1]])}}},
                {provide: TuringMachineService, useClass: MockTuringMachineService},
                {provide: CalculationService, useClass: MockCalculationService},
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TuringMachineComponent);
        component = fixture.componentInstance;
        calculationService = fixture.debugElement.injector.get(CalculationService);
        toasterService = fixture.debugElement.injector.get(ToasterService);
        spyOn(ToasterService.prototype, 'pop').and.callFake(() => []);
        spyOn(MockCalculationService.prototype, 'calculate').and.callThrough();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('empty input cannot be calculated', () => {
        component.input = '';
        component.calculate();
        expect(toasterService.pop).toHaveBeenCalledTimes(1);
        expect(toasterService.pop).toHaveBeenCalledWith('error', 'Error', 'Input cannot be empty!');
        expect(calculationService.calculate).toHaveBeenCalledTimes(0);
    });

    it('valid input should fire a service call', () => {
        component.input = 'ABC';
        component.calculate();
        expect(calculationService.calculate).toHaveBeenCalledTimes(1);
        expect(calculationService.calculate).toHaveBeenCalledWith(anything(), 'ABC');
    });
});
