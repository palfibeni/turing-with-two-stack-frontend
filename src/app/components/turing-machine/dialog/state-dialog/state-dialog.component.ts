import {Component, Inject, OnInit} from '@angular/core';
import {_} from 'underscore';
import {ToasterService} from "angular2-toaster";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup} from "@angular/forms";

import {MachineState} from "../../../../dto/MachineState";
import {MachineStateValidator} from "../../../../validator/machine-state.validator";

@Component({
    selector: 'app-state-dialog',
    templateUrl: './state-dialog.component.html',
    styleUrls: ['./state-dialog.component.scss']
})
export class StateDialogComponent implements OnInit {

    private machineStateForm: FormGroup;
    private title: string;

    private readonly machineState: MachineState;
    private readonly states: Array<MachineState>;

    constructor(public dialogRef: MatDialogRef<StateDialogComponent>,
                private fb: FormBuilder,
                private machineStateValidator: MachineStateValidator,
                private toasterService: ToasterService,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.states = data.states;
        if (data.machineState) {
            this.title = 'Edit state';
            this.machineState = data.machineState;
            this.states.splice(this.states.indexOf(this.machineState), 1);
        } else {
            this.title = 'New state';
            this.machineState = new MachineState();
        }

        this.machineStateForm = fb.group({
            name: this.machineState.name,
            start: this.machineState.start,
            accept: this.machineState.accept,
            decline: this.machineState.decline
        });
    }

    public ngOnInit(): void {
    }

    private onOkClick() {
        try {
            let rawState = this.machineStateForm.getRawValue();
            this.machineState.name = rawState.name;
            this.machineState.start = rawState.start;
            this.machineState.accept = rawState.accept;
            this.machineState.decline = rawState.decline;

            this.machineStateValidator.validateMachineStates(_.union(this.states, [this.machineState]));

            this.dialogRef.close(this.machineState);
        } catch (ex) {
            this.toasterService.pop('error', 'Turing machine not valid', ex);
        }
    }

    private validateState(state: MachineState): void {
    }

    private closeDialog() {
        this.dialogRef.close();
    }
}
