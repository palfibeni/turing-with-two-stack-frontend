import {Component, Inject, OnInit} from '@angular/core';
import {_} from 'underscore';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MachineState} from "../../../../dto/MachineState";
import {ToasterService} from "angular2-toaster";
import {TuringRule} from "../../../../dto/TuringRule";
import {TuringRuleValidator} from "../../../../validator/turing-rule.validator";

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
                private turingRuleValidator: TuringRuleValidator,
                private toasterService: ToasterService,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.tapeCharacters = data.tapeCharacters;
        this.tapeCharacters.push('_');
        this.states = data.states;
        this.rules = data.rules;
        if (data.rule) {
            this.title = `Edit rule`;
            this.rule = data.rule;
            this.states.splice(this.rules.indexOf(this.rule), 1);
        } else {
            this.title = 'New Rule';
            this.rule = new TuringRule();
        }

        this.machineRuleForm = fb.group({
            fromState: this.rule.toState ? this.rule.fromState : null,
            readCharacter: this.rule.readCharacter,
            toState: this.rule.toState ? this.rule.toState : null,
            writeCharacter: this.rule.writeCharacter,
            direction: this.rule.direction
        });
        this.machineRuleForm.controls.fromState.patchValue(this.rule.toState ? this.rule.fromState : null);
        this.machineRuleForm.controls.toState.patchValue(this.rule.toState ? this.rule.toState : null);
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

            this.turingRuleValidator.validateTuringRules(
                this.tapeCharacters,
                this.states,
                _.union(this.rules, [this.rule]));

            this.dialogRef.close(this.rule);
        } catch (ex) {
            this.toasterService.pop('error', 'Turing machine not valid', ex);
        }
    }

    private closeDialog() {
        this.dialogRef.close();
    }
}
