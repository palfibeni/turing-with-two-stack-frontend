import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StateDialogComponent} from './state-dialog.component';
import {ToasterService} from "angular2-toaster";
import {MockMachineStateValidator} from "../../../../testing/mock-machine-state.validator";
import {MachineStateValidator} from "../../../../validator/machine-state.validator";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    MAT_DIALOG_DATA,
    MatCheckboxModule,
    MatDialogModule,
    MatDialogRef,
    MatFormFieldModule,
    MatInputModule
} from "@angular/material";

const data = {states: []};

describe('StateDialogComponent', () => {
    let component: StateDialogComponent;
    let fixture: ComponentFixture<StateDialogComponent>;
    let toasterService: ToasterService;
    let machineStateValidator: MachineStateValidator;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StateDialogComponent],
            imports: [
                FormsModule,
                MatDialogModule,
                MatCheckboxModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
            ],
            providers: [
                ToasterService,
                FormBuilder,
                {provide: MatDialogRef, useValue: {}},
                {provide: MAT_DIALOG_DATA, useValue: data},
                {provide: MachineStateValidator, useClass: MockMachineStateValidator}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StateDialogComponent);
        component = fixture.componentInstance;
        toasterService = fixture.debugElement.injector.get(ToasterService);
        machineStateValidator = fixture.debugElement.injector.get(MachineStateValidator);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
