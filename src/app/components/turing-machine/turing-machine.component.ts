import {Component, OnInit} from '@angular/core';
import {_} from 'underscore';
import {ToasterConfig, ToasterService} from "angular2-toaster";
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
    selector: 'app-main',
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

    private title: string;
    private states: Array<MachineState>;
    private rules: Array<TuringRule>;
    private stateMap: Array<any>;

    private input: String;

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
        console.log("State grid ready!");
        this.stateGridApi = params.api;
        this.stateGridColumnApi = params.columnApi;
        this.stateGridApi.sizeColumnsToFit();
    }


    public onRuleGridReady(params) {
        console.log("Rule grid ready!");
        this.ruleGridApi = params.api;
        this.ruleGridColumnApi = params.columnApi;
        this.ruleGridApi.sizeColumnsToFit();
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
        this.states = this.turingMachine.states;
        this.stateMap = _.indexBy(this.states, 'id');
        this.rules = this.turingMachine.rules;
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

    public addState() {
        let stateDialog = this.dialog.open(StateDialogComponent, {
            height: '400px',
            width: '600px',
        });
    }

    public editState() {

    }

    public addRule() {
        let ruleDialog = this.dialog.open(RuleDialogComponent, {
            height: '400px',
            width: '600px',
        });
    }

    public editRule() {

    }

    // State AG-grid ColumnDefs
    public stateColumnDefs = [
        {
            headerName: 'State',
            field: 'name',
            checkboxSelection: true
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
    public ruleColumnDefs = [
        {
            headerName: 'From State',
            field: 'fromState',
            checkboxSelection: true,
            cellRenderer: _.bind(this.stateRenderer, this)
        },
        {
            headerName: 'Read Character',
            field: 'readCharacter',
            width: 120,
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
