import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Router} from "@angular/router";
import {AgGridModule} from "ag-grid-angular";

import {CalculationComponent} from "./calculation.component";
import {CalculationService} from "../../service/calculation.service";
import {MockCalculationService} from "../../testing/mock-calculation.service";
import {TwoStackConditionComponent} from "./two-stack-condition/two-stack-condition.component";
import {TuringConditionComponent} from "./turing-condition/turing-condition.component";
import {CalculationTwoStackInitTabComponent} from "./tab/calculation-two-stack-init-tab/calculation-two-stack-init-tab.component";
import {CalculationDifferenceTabComponent} from "./tab/calculation-difference-tab/calculation-difference-tab.component";
import {MatPaginatorModule, MatTabsModule, MatToolbarModule, MatTooltipModule} from "@angular/material";
import {Calculation} from "../../dto/Calculation";
import {Condition} from "../../dto/Condition";
import {MachineState} from "../../dto/MachineState";

const startState: MachineState = createMachineState("START", true, false, false);
const acceptState: MachineState = createMachineState("ACCEPT", false, true, false);

const calculationData: Calculation = {
    turingConditions: [
        createCondition(startState, [], '_', []),
        createCondition(acceptState, [], '_', [])
    ],
    twoStackConditions: [
        createCondition(startState, [], '_', []),
        createCondition(acceptState, [], '_', [])
    ]
};

function createCondition(currentState: MachineState, charactersBehind: Array<String>, currentPosition: String, charactersAhead: Array<String>): Condition {
    let condition = new Condition();
    condition.currentState = currentState;
    condition.charactersBehind = charactersBehind;
    condition.currentPosition = currentPosition;
    condition.charactersAhead = charactersAhead;
    return condition;
}

function createMachineState(name: String, start: boolean, accept: boolean, decline: boolean): MachineState {
    let state = new MachineState();
    state.name = name;
    state.start = start;
    state.accept = accept;
    state.decline = decline;
    return state;
}

describe('CalculationComponent', () => {
    let component: CalculationComponent;
    let fixture: ComponentFixture<CalculationComponent>;
    let calculationService: CalculationService;

    const router = jasmine.createSpyObj('Router', {
        'navigate': ''
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AgGridModule.withComponents([]),
                MatTabsModule,
                MatToolbarModule,
                MatPaginatorModule,
                MatTooltipModule
            ],
            declarations: [
                CalculationComponent,
                CalculationDifferenceTabComponent,
                CalculationTwoStackInitTabComponent,
                TuringConditionComponent,
                TwoStackConditionComponent
            ],
            providers: [
                {provide: Router, useValue: router},
                {provide: CalculationService, useClass: MockCalculationService}]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalculationComponent);
        component = fixture.componentInstance;
        calculationService = fixture.debugElement.injector.get(CalculationService);
        calculationService.calculation = calculationData;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('navigation should fire', () => {
        component.back();

        expect(router.navigate).toHaveBeenCalledTimes(1);
    });
});
