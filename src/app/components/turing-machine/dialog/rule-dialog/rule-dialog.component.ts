import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MachineState} from "../../../../dto/MachineState";
import {MachineStateValidator} from "../../../../validator/machine-state.validator";
import {ToasterService} from "angular2-toaster";
import {TuringRule} from "../../../../dto/TuringRule";

@Component({
    selector: 'app-rule-dialog',
    templateUrl: './rule-dialog.component.html',
    styleUrls: ['./rule-dialog.component.scss']
})
export class RuleDialogComponent implements OnInit {

    private machineRuleForm: FormGroup;
    private title: string;

    public tapeCharacters: Array<String>;
    public states: Array<MachineState>;
    private readonly rule: TuringRule;
    private readonly rules: Array<TuringRule>;

    constructor(public dialogRef: MatDialogRef<RuleDialogComponent>,
                private fb: FormBuilder,
                private machineStateValidator: MachineStateValidator,
                private toasterService: ToasterService,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.tapeCharacters = data.turingMachine.tapeCharacters;
        this.states = data.turingMachine.states;
        this.rules = data.turingMachine.rules;
        if (data.rule) {
            this.title = `Edit rule`;
            this.rule = data.rule;
            this.states.splice(this.rules.indexOf(this.rule), 1);
        } else {
            this.title = 'New Rule';
            this.rule = new TuringRule();
        }

        this.machineRuleForm = fb.group({
            fromState: this.rule.toState ? this.rule.fromState.id : null,
            readCharacter: this.rule.readCharacter,
            toState: this.rule.toState ? this.rule.toState.id : null,
            writeCharacter: this.rule.writeCharacter,
            direction: this.rule.direction
        });
        this.machineRuleForm.controls.fromState.patchValue(this.rule.toState ? this.rule.fromState.id : null);
        this.machineRuleForm.controls.toState.patchValue(this.rule.toState ? this.rule.toState.id : null);
    }

    public ngOnInit(): void {
    }

    private onOkClick() {
        try {
            let rawRule = this.machineRuleForm.getRawValue();
            this.rule.fromState = rawRule.fromState;
            this.rule.readCharacter = rawRule.readCharacter;
            this.rule.toState = rawRule.toState;
            this.rule.writeCharacter = rawRule.writeCharacter;
            this.rule.direction = rawRule.direction;

            this.validateRule(this.rule);

            this.dialogRef.close(this.rule);
        } catch (ex) {
            this.toasterService.pop('error', 'Turing machine not valid', ex);
        }
    }

    private validateRule(newRule: TuringRule): void {
        if(!newRule.toState) {
            throw 'To State cannot be empty!';
        }
        if(!newRule.readCharacter) {
            throw 'Read Character cannot be empty!';
        }
        if(!newRule.fromState) {
            throw 'From State cannot be empty!';
        }
        if(!newRule.toState) {
            throw 'Write Character cannot be empty!';
        }
        if(!newRule.direction) {
            throw 'Direction cannot be empty!';
        }
        for (let rule of this.rules) {
            if (newRule.equals(rule)) {
                throw 'The given rule is already exists!';
            }
        }
    }

    private closeDialog() {
        this.dialogRef.close();
    }
}
