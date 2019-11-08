import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RuleDialogComponent} from './rule-dialog.component';
import {ToasterService} from "angular2-toaster";
import {TuringRuleValidator} from "../../../../validator/turing-rule.validator";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    MAT_DIALOG_DATA,
    MatCheckboxModule,
    MatDialogModule,
    MatDialogRef,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule
} from "@angular/material";

const data = {states: [], tapeCharacters: [], rules: []};

describe('RuleDialogComponent', () => {
    let component: RuleDialogComponent;
    let fixture: ComponentFixture<RuleDialogComponent>;
    let toasterService: ToasterService;
    let turingRuleValidator: TuringRuleValidator;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RuleDialogComponent],
            imports: [
                FormsModule,
                MatDialogModule,
                MatCheckboxModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatSelectModule,
                MatRadioModule
            ],
            providers: [
                ToasterService,
                FormBuilder,
                {provide: MatDialogRef, useValue: {}},
                {provide: MAT_DIALOG_DATA, useValue: data},
                {provide: TuringRuleValidator, useClass: TuringRuleValidator},
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RuleDialogComponent);
        component = fixture.componentInstance;
        toasterService = fixture.debugElement.injector.get(ToasterService);
        turingRuleValidator = fixture.debugElement.injector.get(TuringRuleValidator);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
