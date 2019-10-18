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
import {StateDialogComponent} from "./dialog/state-dialog/state-dialog.component";
import {RuleDialogComponent} from "./dialog/rule-dialog/rule-dialog.component";

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

    private turingMachine: TuringMachine = new TuringMachine();

    private title: String;
    private stateMap: Map<number, MachineState>;

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
        if (entityId) {
            this.turingMachineService.getTuringMachine(entityId).subscribe(turingMachine => {
                console.log(turingMachine);
                this.turingMachine = turingMachine;
                if (this.turingMachine) this.initData();
            });
        } else {
            this.initData();
        }
    }

    public onStateGridReady(params) {
        this.stateGridApi = params.api;
        this.stateGridColumnApi = params.columnApi;
        console.log("State grid ready!");
    }

    public onRuleGridReady(params) {
        this.ruleGridApi = params.api;
        this.ruleGridColumnApi = params.columnApi;
        console.log("Rule grid ready!");
    }

    public back(): void {
        this.router.navigate(['']);
    }

    private initData(): void {
        if (!this.turingMachine) {
            return;
        }

        this.title = this.turingMachine.name;
        this.stateMap = _.indexBy(this.turingMachine.states, 'id');
    }

    private initPage(turingMachine: TuringMachine): void {
        if (!turingMachine) {
            return;
        }
        this.turingMachine = turingMachine;

        this.initData();
        this.setStateData();
        this.setRuleData();
    }

    private setStateData(): void {
        this.stateGridApi.setRowData(this.turingMachine.states);
        this.stateGridApi.sizeColumnsToFit();
    }

    private setRuleData(): void {
        this.ruleGridApi.setRowData(this.turingMachine.rules);
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

    public save(): void {
        try {
            TuringMachineComponent.validateTuringMachine(this.turingMachine);
            this.turingMachineService.saveTuringMachine(this.turingMachine).subscribe(
                turingMachine => {
                    this.toasterService.pop('success', 'Save Successful', `Turing Machine saved with ID ${turingMachine.id} !`);
                    location.reload();
                }, ex => {
                    console.log(ex);
                    this.toasterService.pop('error', 'Error', ex.error.message);
                });
        } catch (ex) {
            this.toasterService.pop('error', 'Turing machine not valid', ex);
        }
    }

    public static validateTuringMachine(turingMachine: TuringMachine): void {
        // Characters duplicate validation
        let duplicateTapeCharacters = TuringMachineComponent.findDuplicates(turingMachine.tapeCharacters);
        if (duplicateTapeCharacters.size) {
            let charsJoined = Array.from(duplicateTapeCharacters).join(", ");
            throw `Found duplicate tape characters! (${charsJoined})`;
        }
        // Start state validation
        let startStates = _.filter(turingMachine.states, (state: MachineState) => state.accept);
        if (startStates.size === 0) {
            throw `There is no start state!`;
        }
        if (startStates.size > 1) {
            let statesJoined = _.map(Array.from(startStates), (state: MachineState) => MachineState.toString(state)).join(", ");
            throw `More than one start state!  \n(${statesJoined})`;
        }

        //State duplicate  by name validation
        let duplicateStatesByName = TuringMachineComponent.findDuplicateStatesByName(turingMachine.states);
        if (duplicateStatesByName.size) {
            let statesJoined = _.map(Array.from(duplicateStatesByName), (state: MachineState) => MachineState.toString(state)).join('\n, ');
            throw `Found duplicate named States! \n(${statesJoined})`;
        }

        //Entity duplicate by ID validation
        let stateIds = _.map(turingMachine.states, (state: MachineState) => state.id);
        let entities = stateIds.concat(_.map(turingMachine.rules, (rule: TuringRule) => rule.id));
        let duplicateByEntity = TuringMachineComponent.findDuplicates(entities);
        if (duplicateByEntity.size) {
            let idsJoined = Array.from(duplicateByEntity).join(", ");
            throw `Found duplicate ids! \n(${idsJoined})`;
        }

        //Rules unknown Character validation
        let rulesWithUnknownChars: Array<TuringRule> = turingMachine.rules.filter(
            (rule: TuringRule) => rule.readCharacter != '_' && rule.writeCharacter != '_'
                && (!_.contains(turingMachine.tapeCharacters, rule.readCharacter)
                    || !_.contains(turingMachine.tapeCharacters, rule.writeCharacter))
        );
        if (rulesWithUnknownChars.length) {
            let rulesJoined = _.map(rulesWithUnknownChars, (rule: TuringRule) => TuringRule.toString(rule)).join('\n, ');
            throw `Unknown characters found in rules! \n(${rulesJoined})`;
        }

        //Rules unknown State validation
        let rulesWithUnknownState: Array<TuringRule> = turingMachine.rules.filter(
            (rule: TuringRule) => !_.contains(stateIds, rule.fromState)
                || !_.contains(stateIds, rule.toState)
        );
        if (rulesWithUnknownState.length) {
            let rulesJoined = rulesWithUnknownState.map((rule: TuringRule) => TuringRule.toString(rule)).join('\n, ');
            throw `Unknown States found in rules! \n(${rulesJoined})`;
        }
    }

    private static findDuplicates(array: Array<any>, predicateGenerator: Function = TuringMachineComponent.defaultPredicateGenerator()): Set<any> {
        let duplicates: Set<any> = new Set();
        for (let index  in array) {
            let element = array[index];
            let lastIndex = _.findLastIndex(array, predicateGenerator(element));
            if (lastIndex != index) {
                duplicates.add(element);
            }
        }
        return duplicates;
    }

    private static defaultPredicateGenerator() {
        return element => {
            return other => element === other
        };
    }

    private static findDuplicateStatesByName(states: Array<MachineState>): Set<MachineState> {
        let predicateGenerator = (state: MachineState) => {
            return {name: state.name};
        };
        return TuringMachineComponent.findDuplicates(states, predicateGenerator);
    }

    public tabSelectionChange(selectedTabIndex) {
        switch (selectedTabIndex) {
            case 1:
                this.stateGridApi.sizeColumnsToFit();
                break;
            case 2:
                this.ruleGridApi.sizeColumnsToFit();
                break;
            default:
                break;
        }
    }

    public addChar(): void {
        console.log(`add ${this.newChar}`);
        if (!this.newChar.length || !this.newChar.trim()) {
            this.toasterService.pop('error', 'Empty character', `Empty Character is not allowed! (${this.newChar})`);
            return;
        }
        if (_.contains(this.turingMachine.tapeCharacters, this.newChar)) {
            this.toasterService.pop('error', 'Found duplicate', `Duplicate Character is not allowed! (${this.newChar})`);
            return;
        }
        this.turingMachine.tapeCharacters.push(this.newChar);
        this.newChar = "";
    }

    public deleteChar(): void {
        console.log(`delete char ${this.selectedChar}`);
        if (!this.selectedChar) {
            this.toasterService.pop('error', 'No selection', 'You must select a character!');
            return;
        }
        let char = this.turingMachine.tapeCharacters[this.selectedChar];
        let ruleWhereCharacterIsUsed = _.find(this.turingMachine.rules, (rule) => {
            return rule.readCharacter === char
                || rule.writeCharacter === char;
        });
        if (ruleWhereCharacterIsUsed) {
            this.toasterService.pop(
                'error', 'Used',
                `The character is still in use! (char: ${char}) (ruleId; ${ruleWhereCharacterIsUsed.id})`);
            return;
        }
        this.turingMachine.tapeCharacters.splice(this.selectedChar, 1);
        this.selectedChar = null;
    }

    public addState(): void {
        let stateDialog = this.dialog.open(StateDialogComponent, {
            height: '400px',
            width: '600px',
            data: {}
        });
    }

    public editState(): void {
        let selectedRows = this.stateGridApi.getSelectedRows();
        if (!selectedRows.length) {
            this.toasterService.pop('error', 'No selection', 'You must select a state!');
        }
        let selectedState = selectedRows[0];
        console.log(`edit ${selectedState.id}`);
    }

    public deleteState(): void {
        let selectedRows = this.stateGridApi.getSelectedRows();
        if (!selectedRows.length) {
            this.toasterService.pop('error', 'No selection', 'You must select a state!');
        }
        let selectedState = selectedRows[0];
        let ruleWhereStateIsUsed = _.find(this.turingMachine.rules, (rule) => {
            return rule.fromState === selectedState.id
                || rule.toState === selectedState.id;
        });

        if (ruleWhereStateIsUsed) {
            this.toasterService.pop(
                'error', 'Used',
                `The character is still in use! (stateId: ${selectedState.id}) (ruleId; ${ruleWhereStateIsUsed.id})`);
            return;
        }
        console.log(`delete state ${selectedState.id}`);
        this.turingMachine.states.splice(this.turingMachine.states.indexOf(selectedState), 1);
        this.stateMap.delete(selectedState.id);
        this.setStateData();
    }

    public addRule(): void {
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

    public deleteRule(): void {
        let selectedRows = this.ruleGridApi.getSelectedRows();
        if (!selectedRows.length) {
            this.toasterService.pop('error', 'No selection', 'You must select a rule!');
            return;
        }
        let selectedRule = selectedRows[0];
        console.log(`delete rule ${selectedRule.id}`);
        this.turingMachine.rules.splice(this.turingMachine.rules.indexOf(selectedRule), 1);
        this.setRuleData();
    }

    // State AG-grid ColumnDefs
    private stateColumnDefs = [
        {
            headerName: 'ID',
            field: 'id',
            sortable: true,
            filter: true,
            checkboxSelection: true,
            width: 80,
            suppressSizeToFit: true,
        },
        {
            headerName: 'Name',
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

    public static booleanCellRenderer(params): String {
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
            width: 80,
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

    public stateRenderer(params): String {
        if (!params.value) {
            return null;
        }
        let state = this.stateMap[params.value];
        return state && state.name ? state.name : null;
    }

}
