import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {_} from 'underscore';
import {ToasterService} from "angular2-toaster";
import {MatDialog} from "@angular/material";

import {RuleDialogComponent} from "../../dialog/rule-dialog/rule-dialog.component";
import {TuringMachine} from "../../../../dto/TuringMachine";
import {TuringRule} from "../../../../dto/TuringRule";
import {TuringRuleValidator} from "../../../../validator/turing-rule.validator";

@Component({
    selector: 'app-turing-machine-rule-tab',
    templateUrl: './turing-machine-rule-tab.component.html',
    styleUrls: ['./turing-machine-rule-tab.component.scss']
})
export class TuringMachineRuleTabComponent implements OnInit {

    @Input('turingMachine') turingMachine: TuringMachine = new TuringMachine();

    @Output('turingMachineChange') turingMachineChange: EventEmitter<TuringMachine> = new EventEmitter();

    // AG-grid specific
    private ruleGridApi;
    private ruleGridColumnApi;
    private rowSelection = "single";

    constructor(private toasterService: ToasterService,
                private dialog: MatDialog,
                private turingRuleValidator: TuringRuleValidator) {
    }

    public ngOnInit(): void {
    }

    public refreshTab() {
        console.log("refresh Rule tab");
        this.ruleGridApi.setRowData(this.turingMachine.rules);
        this.ruleGridApi.sizeColumnsToFit();
    }

    public onRuleGridReady(params) {
        this.ruleGridApi = params.api;
        this.ruleGridColumnApi = params.columnApi;
        console.log("Rule grid ready!");
    }

    public addRule(): void {
        let ruleDialog = this.dialog.open(RuleDialogComponent, {
            height: '400px',
            width: '600px',
            data: {
                tapeCharacters: this.turingMachine.tapeCharacters,
                states: this.turingMachine.states,
                rules: this.turingMachine.rules
            }
        });
        ruleDialog.afterClosed().subscribe((newRule: TuringRule) => {
            if (newRule) {
                console.log(`New rule added! (${newRule.toString()})`);
                this.turingMachine.rules.push(newRule);
                console.log(this.turingMachine.rules);
                this.turingMachineChange.emit(this.turingMachine);
                this.refreshTab();
            }
        });
    }

    public editRule() {
        let selectedRows = this.ruleGridApi.getSelectedRows();
        if (!selectedRows.length) {
            this.toasterService.pop('error', 'No selection', 'You must select a rule!');
            return;
        }
        let selectedRule = selectedRows[0];
        console.log(`edit ${selectedRule.id}`);
        let ruleDialog = this.dialog.open(RuleDialogComponent, {
            height: '400px',
            width: '600px',
            data: {
                rule: selectedRule,
                tapeCharacters: this.turingMachine.tapeCharacters,
                states: this.turingMachine.states,
                rules: this.turingMachine.rules
            }
        });
        ruleDialog.afterClosed().subscribe((newRule: TuringRule) => {
            if (newRule) {
                console.log(`Rule edited! (${newRule.toString()})`);
                this.turingMachine.rules.splice(this.turingMachine.rules.indexOf(newRule), 1);
                this.turingMachine.rules.push(newRule);
                console.log(this.turingMachine.rules);
                this.turingMachineChange.emit(this.turingMachine);
                this.refreshTab();
            }
        });
    }

    public deleteRule(): void {
        let selectedRows = this.ruleGridApi.getSelectedRows();
        if (!selectedRows.length) {
            this.toasterService.pop('error', 'No selection', 'You must select a rule!');
            return;
        }
        try {
            this.turingRuleValidator.validateTuringRules(this.turingMachine.tapeCharacters,
                this.turingMachine.states,
                _.without(this.turingMachine.rules));
            let selectedRule = selectedRows[0];
            console.log(`delete rule ${selectedRule.id}`);
            this.turingMachine.rules.splice(this.turingMachine.rules.indexOf(selectedRule), 1);
            this.turingMachineChange.emit(this.turingMachine);
            this.refreshTab();
        } catch (ex) {
            this.toasterService.pop('error', 'Turing machine not valid', ex);
        }
    }

    // Rule AG-grid ColumnDefs
    private ruleColumnDefs = [
        {
            headerName: 'ID',
            field: 'id',
            sortable: true,
            filter: true,
            checkboxSelection: true,
            width: 80,
            suppressSizeToFit: true
        },
        {
            headerName: 'From State',
            field: 'fromState.name'
        },
        {
            headerName: 'Read Character',
            field: 'readCharacter',
            width: 140,
            sortable: true,
            filter: true,
            suppressSizeToFit: true
        },
        {
            headerName: 'To State',
            field: 'toState.name'
        },
        {
            headerName: 'Direction',
            field: 'direction',
            sortable: true,
            filter: true,
            width: 100,
            suppressSizeToFit: true
        },
        {
            headerName: 'Write Character',
            field: 'writeCharacter',
            width: 140,
            sortable: true,
            filter: true,
            suppressSizeToFit: true
        },
    ];

    public stateRenderer(params): String {
        if (!params.value) {
            return null;
        }
        let state = params.value;
        return state && state.name ? state.name : null;
    }


}
