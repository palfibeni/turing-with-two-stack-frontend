import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TwoStackConditionComponent} from './two-stack-condition.component';
import {MatTooltipModule} from "@angular/material";
import {TestHelper} from "../../../testing/test-helper";

const state = TestHelper.createMachineState("START", true, false, false);

const condition = TestHelper.createCondition(state, [], '_', []);

describe('TwoStackConditionComponent', () => {
    let component: TwoStackConditionComponent;
    let fixture: ComponentFixture<TwoStackConditionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatTooltipModule
            ],
            declarations: [TwoStackConditionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TwoStackConditionComponent);
        component = fixture.componentInstance;
        component.condition = condition;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
