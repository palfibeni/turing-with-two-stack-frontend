import {Component, OnInit} from '@angular/core';
import {_} from 'underscore';
import {ToasterService} from "angular2-toaster";
import {ActivatedRoute, Router} from "@angular/router";

import {CalculationService} from "../../service/calculation.service";
import {TuringMachineService} from "../../service/turing.machine.service";
import {MachineState} from "../../dto/MachineState";
import {TuringMachine} from "../../dto/TuringMachine";
import {TuringRule} from "../../dto/TuringRule";
import {MatDialog} from "@angular/material";
import {StateDialogComponent} from "./state-dialog/state-dialog.component";
import {RuleDialogComponent} from "./rule-dialog/rule-dialog.component";

@Component({
    selector: 'app-turing-machine',
    templateUrl: './turing-machine.component.html',
    styleUrls: ['./turing-machine.component.scss']
})
export class TuringMachineComponent implements OnInit {

    // AG-grid specific
    private stateGridApi;
    private stateGridColumnApi;
    private ruleGridApi;
    private ruleGridColumnApi;
    private rowSelection = "single";

    private turingMachine: TuringMachine;

    private title: String;
    private chars: Array<String>;
    private states: Array<MachineState>;
    private stateMap: Array<any>;
    private rules: Array<TuringRule>;

    private newChar: String;
    private input: String;
    private selectedChar: number;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private toasterService: ToasterService,
                private dialog: MatDialog,
                private turingMachineService: TuringMachineService,
                private calculationService: CalculationService) {
    }

    public ngOnInit(): void {
        const entityId = this.route.snapshot.paramMap.get('entityId');
        if (!entityId) {
            this.initNewTuringMachine();
            this.initData();
        } else {
            this.turingMachineService.getTuringMachine(entityId).subscribe(turingMachine => {
                console.log(turingMachine);
                this.turingMachine = turingMachine;
                this.initData();
            });
        }
    }

    public onStateGridReady(params) {
        this.stateGridApi = params.api;
        this.stateGridColumnApi = params.columnApi;
        this.setStateData();
        console.log("State grid ready!");
    }

    public onRuleGridReady(params) {
        this.ruleGridApi = params.api;
        this.ruleGridColumnApi = params.columnApi;
        this.setRuleData();
        console.log("Rule grid ready!");
    }

    public back(): void {
        this.router.navigate(['']);
    }

    private initNewTuringMachine(): void {
        this.turingMachine = new TuringMachine();
    }

    private initData(): void {
        if (!this.turingMachine) {
            return;
        }

        this.title = this.turingMachine.name;
        this.chars = this.turingMachine.tapeCharacters;
        this.states = this.turingMachine.states;
        this.stateMap = _.indexBy(this.states, 'id');
        this.rules = this.turingMachine.rules;
    }

    private setStateData() {
        this.stateGridApi.setRowData(this.states);
        this.stateGridApi.sizeColumnsToFit();
    }

    private setRuleData() {
        this.ruleGridApi.setRowData(this.rules);
        this.ruleGridApi.sizeColumnsToFit();
    }

    public async calculate() {
        if (!this.input) {
            this.toasterService.pop('error', 'Error', 'Input cannot be empty!');
            return;
        }
        this.calculationService.calculate(this.turingMachine, this.input).subscribe(
            calculation => {
                console.log(calculation);
                this.calculationService.turingMachine = this.turingMachine;
                this.calculationService.calculation = calculation;
                this.router.navigate(['calculation']);
            }, ex => {
                console.log(ex);
                this.toasterService.pop('error', 'Error', ex.error.message);
            });
    }

    public addChar() {
        console.log(`add ${this.newChar}`);
        if (_.contains(this.chars, this.newChar)) {
            this.toasterService.pop('error', 'Duplicate', `Duplicate Character is not allowed! (${this.newChar})`);
            return;
        }
        this.chars.push(this.newChar);
    }

    public deleteChar() {
        console.log(`delete ${this.selectedChar}`);
        if (!this.selectedChar) {
            this.toasterService.pop('error', 'No selection', 'You must select a character!');
            return;
        }
        let char = this.chars[this.selectedChar];
        let ruleWhereCharacterIsUsed = _.find(this.rules, (rule) => {
            return rule.readCharacter === char
                || rule.writeCharacter === char;
        });
        if (ruleWhereCharacterIsUsed) {
            this.toasterService.pop(
                'error', 'Used',
                `The character is still in use! (char: ${char}) (ruleId; ${ruleWhereCharacterIsUsed.id})`);
            return;
        }
        this.chars.splice(this.selectedChar, 1);
        this.selectedChar = null;
    }

    public addState() {
        let stateDialog = this.dialog.open(StateDialogComponent, {
            height: '400px',
            width: '600px',
            data: {}
        });
    }

    public editState() {
        let selectedRows = this.stateGridApi.getSelectedRows();
        if (!selectedRows.length) {
            this.toasterService.pop('error', 'No selection', 'You must select a state!');
        }
        let selectedState = selectedRows[0];
        console.log(`edit ${selectedState.id}`);
    }

    public deleteState() {
        let selectedRows = this.stateGridApi.getSelectedRows();
        if (!selectedRows.length) {
            this.toasterService.pop('error', 'No selection', 'You must select a state!');
        }
        let selectedState = selectedRows[0];
        let ruleWhereStateIsUsed = _.find(this.rules, (rule) => {
            return rule.fromState === selectedState.id
                || rule.toState === selectedState.id;
        });

        if (ruleWhereStateIsUsed) {
            this.toasterService.pop(
                'error', 'Used',
                `The character is still in use! (stateId: ${selectedState.id}) (ruleId; ${ruleWhereStateIsUsed.id})`);
            return;
        }
        console.log(`delete ${selectedState.id} ${this.states.indexOf(selectedState)}`);
        this.states.splice(this.states.indexOf(selectedState), 1);
        this.setStateData();
    }

    public addRule() {
        let ruleDialog = this.dialog.open(RuleDialogComponent, {
            height: '400px',
            width: '600px',
            data: {}
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
    }

    public deleteRule() {
        let selectedRows = this.ruleGridApi.getSelectedRows();
        if (!selectedRows.length) {
            this.toasterService.pop('error', 'No selection', 'You must select a rule!');
            return;
        }
        let selectedRule = selectedRows[0];
        console.log(`delete ${selectedRule.id}`);
        this.rules.splice(this.rules.indexOf(selectedRule), 1);
        this.setStateData();
    }

    // State AG-grid ColumnDefs
    private stateColumnDefs = [
        {
            headerName: 'ID',
            field: 'id',
            sortable: true,
            filter: true,
            checkboxSelection: true,
            width: 70,
            suppressSizeToFit: true,
        },
        {
            headerName: 'State',
            field: 'name',
            sortable: true,
            filter: true
        },
        {
            headerName: 'Start',
            cellClass: 'booleanType',
            field: 'start',
            cellRenderer: TuringMachineComponent.booleanCellRenderer,
            width: 80,
            suppressSizeToFit: true
        },
        {
            headerName: 'Accept',
            cellClass: 'booleanType',
            field: 'accept',
            cellRenderer: TuringMachineComponent.booleanCellRenderer,
            width: 80,
            suppressSizeToFit: true
        },
        {
            headerName: 'Decline',
            cellClass: 'booleanType',
            field: 'decline',
            cellRenderer: TuringMachineComponent.booleanCellRenderer,
            width: 80,
            suppressSizeToFit: true
        }
    ];

    public static booleanCellRenderer(params) {
        if (params.value === true) {
            return "<span title='true' class='ag-icon ag-icon-tick content-icon'></span>";
        } else if (params.value === false) {
            return "<span title='false' class='ag-icon ag-icon-cross content-icon'></span>";
        } else if (params.value !== null && params.value !== undefined) {
            return params.value.toString();
        } else {
            return null;
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
            width: 70,
            suppressSizeToFit: true
        },
        {
            headerName: 'From State',
            field: 'fromState',
            cellRenderer: _.bind(this.stateRenderer, this)
        },
        {
            headerName: 'Read Character',
            field: 'readCharacter',
            width: 120,
            sortable: true,
            filter: true,
            suppressSizeToFit: true
        },
        {
            headerName: 'To State',
            field: 'toState',
            cellRenderer: _.bind(this.stateRenderer, this)
        },
        {
            headerName: 'Direction',
            field: 'direction',
            sortable: true,
            filter: true,
            width: 100,
            suppressSizeToFit: true
        }
    ];

    public stateRenderer(params) {
        if (!params.value) {
            return null;
        }
        let state = this.stateMap[params.value];
        return state && state.name ? state.name : null;
    }

}
