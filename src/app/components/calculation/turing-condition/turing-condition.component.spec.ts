import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TuringConditionComponent} from './turing-condition.component';
import {MatTooltipModule} from "@angular/material";
import {TestHelper} from "../../../testing/test-helper";

const state = TestHelper.createMachineState("START", true, false, false);

const condition = TestHelper.createCondition(state, [], '_', []);

describe('TuringConditionComponent', () => {
    let component: TuringConditionComponent;
    let fixture: ComponentFixture<TuringConditionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatTooltipModule
            ],
            declarations: [TuringConditionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TuringConditionComponent);
        component = fixture.componentInstance;
        component.condition = condition;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
