import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CalculationDifferenceTabComponent} from './calculation-difference-tab.component';
import {TwoStackConditionComponent} from "../../two-stack-condition/two-stack-condition.component";
import {TuringConditionComponent} from "../../turing-condition/turing-condition.component";
import {MatPaginatorModule, MatToolbarModule, MatTooltipModule} from "@angular/material";
import {MachineState} from "../../../../dto/MachineState";
import {Calculation} from "../../../../dto/Calculation";
import {Condition} from "../../../../dto/Condition";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TestHelper} from "../../../../testing/test-helper";


const startState: MachineState = TestHelper.createMachineState("START", true, false, false);
const acceptState: MachineState = TestHelper.createMachineState("ACCEPT", false, true, false);

const calculationData: Calculation = {
    turingConditions: [
        TestHelper.createCondition(startState, [], '_', []),
        TestHelper.createCondition(acceptState, [], '_', [])
    ],
    twoStackConditions: [
        TestHelper.createCondition(startState, [], '_', []),
        TestHelper.createCondition(acceptState, [], '_', [])
    ]
};

describe('CalculationDifferenceTabComponent', () => {
    let component: CalculationDifferenceTabComponent;
    let fixture: ComponentFixture<CalculationDifferenceTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                MatToolbarModule,
                MatPaginatorModule,
                MatTooltipModule
            ],
            declarations: [
                CalculationDifferenceTabComponent,
                TuringConditionComponent,
                TwoStackConditionComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalculationDifferenceTabComponent);
        component = fixture.componentInstance;
        component.calculation = calculationData;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
