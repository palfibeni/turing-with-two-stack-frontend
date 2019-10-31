import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Router} from "@angular/router";
import {AgGridModule} from "ag-grid-angular";
import {ToasterModule, ToasterService} from "angular2-toaster";
import {FormsModule} from "@angular/forms";
import {Injectable} from "@angular/core";
import {of} from "rxjs/internal/observable/of";
import {Observable} from "rxjs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {TuringMachine} from "../../dto/TuringMachine";
import {Calculation} from "../../dto/Calculation";
import {TuringMachineComponent} from "./turing-machine.component";
import {TuringMachineService} from "../../service/turing-machine.service";
import {CalculationService} from "../../service/calculation.service";

@Injectable()
export class TuringMachineServiceStub {
    public getAnBnCnTuringMachine() : Observable<TuringMachine> {
        return of({id: null, name: "", states: [], rules: [], tapeCharacters: [], equals: null});
    }
}

@Injectable()
export class CalculationServiceStub {
    public calculate(turingMachine: TuringMachine, input: String): Observable<Calculation> {
        return of({turingConditions: [], twoStackConditions: []});
    }
}

describe('TuringMachineComponent', () => {
    let component: TuringMachineComponent;
    let fixture: ComponentFixture<TuringMachineComponent>;

    const router = jasmine.createSpyObj('Router', {
        'navigate': ''
    });
    const toasterService = jasmine.createSpyObj('ToasterService', {
        'pop': ''
    });
    const calculationService = jasmine.createSpyObj('CalculationService', {
        'calculate': ''
    });
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                AgGridModule.withComponents([]),
                BrowserModule,
                BrowserAnimationsModule,
                ToasterModule.forRoot()],
            declarations: [TuringMachineComponent],
            providers: [
                {provide: Router, useValue: router},
                {provide: TuringMachineService, useClass: TuringMachineServiceStub},
                {provide: CalculationService, useValue: calculationService},
                {provide: ToasterService, useValue: toasterService}]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TuringMachineComponent);
        component = fixture.componentInstance;
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
    });

    it('valid input should fire a service call', () => {
        component.input = 'ABC';
        component.calculate();
        expect(calculationService.calculate).toHaveBeenCalledTimes(1);
        expect(calculationService.calculate).toHaveBeenCalledWith({states: [], rules: [], tapeCharacters: []}, 'ABC');
    });
});
