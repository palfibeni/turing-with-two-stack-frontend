import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Router} from "@angular/router";
import {AgGridModule} from "ag-grid-angular";

import {CalculationComponent} from "./calculation.component";
import {CalculationService} from "../../service/calculation.service";

describe('CalculationComponent', () => {
    let component: CalculationComponent;
    let fixture: ComponentFixture<CalculationComponent>;

    const router = jasmine.createSpyObj('Router', {
        'navigate': ''
    });
    const calculationService = jasmine.createSpyObj('CalculationService', {
        'turingMachine': {states: []},
        'calculation': {turingCalculation: [], twoStackCalculation: []}
    });
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AgGridModule.withComponents([])],
            declarations: [CalculationComponent],
            providers: [
                {provide: Router, useValue: router},
                {provide: CalculationService, useValue: calculationService}]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalculationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
