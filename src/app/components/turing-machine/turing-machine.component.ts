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
import {identity} from "rxjs";
import {Entity} from "../../dto/Entity";

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

    private jsonEdit: boolean;
    private jsonMachine: string;
    private parseError: boolean;

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
        this.jsonMachine = JSON.stringify(this.turingMachine, undefined, 2);
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

    public save() {
        this.turingMachineService.saveTuringMachine(this.turingMachine).subscribe(
            turingMachine => {
                this.toasterService.pop('success', 'Save Successful', `Turing Machine saved with ID ${turingMachine.id} !`);
                location.reload();
            }, ex => {
                console.log(ex);
                this.toasterService.pop('error', 'Error', ex.error.message);
            });
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

    public addChar() {
        console.log(`add ${this.newChar}`);
        if (_.contains(this.chars, this.newChar)) {
            this.toasterService.pop('error', 'Duplicate', `Duplicate Character is not allowed! (${this.newChar})`);
            return;
        }
        this.chars.push(this.newChar);
        this.newChar = "";
    }

    public deleteChar() {
        console.log(`delete char ${this.selectedChar}`);
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
        console.log(`delete state ${selectedState.id}`);
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
        console.log(`delete rule ${selectedRule.id}`);
        this.rules.splice(this.rules.indexOf(selectedRule), 1);
        this.setStateData();
    }

    private onJsonChange(event) {
        // get value from text area
        let newValue = event.target.value;
        try {
            // parse it to json
            JSON.parse(newValue);
            this.jsonMachine = newValue;
            this.parseError = false;
        } catch (ex) {
            // set parse error if it fails
            this.parseError = true;
        }
    }


    private onJsonEdit() {
        this.jsonEdit = true;
    }

    private onJsonCancel() {
        this.jsonMachine = JSON.stringify(this.turingMachine, undefined, 2);
        this.jsonEdit = false;
    }

    private onJsonSave() {
        console.log("Saving by JSON");
        if (this.parseError) {
            this.toasterService.pop('error', 'Not Valid JSON', 'Only Valid JSON can be saved');
            return;
        }

        let turingMachineFromJson: TuringMachine = JSON.parse(this.jsonMachine);

        let duplicateTapeCharacters = TuringMachineComponent.findDuplicates(turingMachineFromJson.tapeCharacters);
        if (duplicateTapeCharacters.size) {
            let charsJoined = Array.from(duplicateTapeCharacters).join(", ");
            this.toasterService.pop('error', `Not Valid JSON', 'Found duplicate tape characters! ${charsJoined}`);
            return;
        }
        let duplicateStatesByName = TuringMachineComponent.findDuplicateStatesByName(turingMachineFromJson.states);
        if (duplicateStatesByName.size) {
            let statesJoined = _.map(Array.from(duplicateStatesByName), state => state.toString()).join(", ");
            this.toasterService.pop('error', `Not Valid JSON', 'Found duplicate named States! ${statesJoined}`);
            return;
        }
        let entities = _.map(turingMachineFromJson.states, state => state.id).concat(_.map(turingMachineFromJson.rules, rule => rule.id));
        let duplicateByEntity = TuringMachineComponent.findDuplicates(entities);
        if (duplicateByEntity.size) {
            let idsJoined = Array.from(duplicateByEntity).join(", ");
            this.toasterService.pop('error', `Not Valid JSON', 'Found duplicate ids! ${idsJoined}`);
            return;
        }

        this.turingMachine = JSON.parse(this.jsonMachine);
        this.initData();
        this.jsonEdit = false;
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
