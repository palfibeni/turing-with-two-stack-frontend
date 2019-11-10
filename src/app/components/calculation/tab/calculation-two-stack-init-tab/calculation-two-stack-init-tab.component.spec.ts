import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CalculationTwoStackInitTabComponent} from './calculation-two-stack-init-tab.component';
import {TwoStackConditionComponent} from "../../two-stack-condition/two-stack-condition.component";
import {MatPaginatorModule, MatToolbarModule, MatTooltipModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MachineState} from "../../../../dto/MachineState";
import {TestHelper} from "../../../../testing/test-helper";


const startState: MachineState = TestHelper.createMachineState("START", true, false, false);
const acceptState: MachineState = TestHelper.createMachineState("ACCEPT", false, true, false);

const twoStackInitConditions = [
    TestHelper.createCondition(startState, [], '_', []),
    TestHelper.createCondition(acceptState, [], '_', [])
];

describe('CalculationTwoStackInitTabComponent', () => {
    let component: CalculationTwoStackInitTabComponent;
    let fixture: ComponentFixture<CalculationTwoStackInitTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                MatToolbarModule,
                MatPaginatorModule,
                MatTooltipModule
            ],
            declarations: [
                CalculationTwoStackInitTabComponent,
                TwoStackConditionComponent
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalculationTwoStackInitTabComponent);
        component = fixture.componentInstance;
        component.twoStackInitConditions = twoStackInitConditions;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
