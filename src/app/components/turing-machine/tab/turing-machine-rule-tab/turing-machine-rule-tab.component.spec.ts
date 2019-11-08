import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TuringMachineRuleTabComponent} from './turing-machine-rule-tab.component';
import {MatDialog, MatDialogModule, MatIconModule, MatToolbarModule} from "@angular/material";
import {ToasterModule, ToasterService} from "angular2-toaster";
import {AgGridModule} from 'ag-grid-angular';
import {TuringRuleValidator} from "../../../../validator/turing-rule.validator";
import {MockTuringRuleValidator} from "../../../../testing/mock-turing-rule.validator";

describe('TuringMachineRuleTabComponent', () => {
    let component: TuringMachineRuleTabComponent;
    let fixture: ComponentFixture<TuringMachineRuleTabComponent>;
    let toasterService: ToasterService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TuringMachineRuleTabComponent],
            imports: [
                AgGridModule.withComponents([]),
                MatIconModule,
                MatDialogModule,
                MatToolbarModule,
                ToasterModule.forRoot()],
            providers: [
                ToasterService,
                {provide: MatDialog, useValue: null},
                {provide: TuringRuleValidator, useClass: MockTuringRuleValidator}]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TuringMachineRuleTabComponent);
        component = fixture.componentInstance;
        toasterService = fixture.debugElement.injector.get(ToasterService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
