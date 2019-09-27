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
            this.initInputs();
        } else {
            this.turingMachineService.getTuringMachine(entityId).subscribe(turingMachine => {
                console.log(turingMachine);
                this.turingMachine = turingMachine;
                this.initInputs();
            });
        }
    }

    public back(): void {
        this.router.navigate(['']);
    }

    private initNewTuringMachine(): void {
        this.turingMachine = new TuringMachine();
    }

    private initInputs(): void {
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
            cellRenderer: TuringMachineComponent.booleanCellRenderer
        },
        {
            headerName: 'Accept',
            cellClass: 'booleanType',
            field: 'accept',
            cellRenderer: TuringMachineComponent.booleanCellRenderer
        },
        {
            headerName: 'Decline',
            cellClass: 'booleanType',
            field: 'decline',
            cellRenderer: TuringMachineComponent.booleanCellRenderer
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

    public ruleColumnDefs = [
        {
            headerName: 'From State',
            field: 'fromState',
            checkboxSelection: true,
            cellRenderer: _.bind(this.stateRenderer, this)
        },
        {
            headerName: 'Read Character',
            field: 'readCharacter'
        },
        {
            headerName: 'To State',
            field: 'toState',
            cellRenderer: _.bind(this.stateRenderer, this)
        },
        {
            headerName: 'Direction',
            field: 'direction'
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
