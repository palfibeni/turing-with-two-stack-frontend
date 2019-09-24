import {Component, OnInit} from '@angular/core';
import {_} from 'underscore';
import {ToasterConfig, ToasterService} from "angular2-toaster";
import {Router} from "@angular/router";

import {CalculationService} from "../service/calculation.service";
import {TuringMachineService} from "../service/turing.machine.service";
import {MachineState} from "../dto/MachineState";
import {TuringMachine} from "../dto/TuringMachine";
import {TuringRule} from "../dto/TuringRule";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    public turingMachine: TuringMachine;
    public states: Array<MachineState>;
    public rules: Array<TuringRule>;
    private stateMap: Array<any>;

    public input: String;

    constructor(private router: Router,
                private toasterService: ToasterService,
                private turingMachineService: TuringMachineService,
                private calculationService: CalculationService) {
    }

    public ngOnInit(): void {
        this.turingMachineService.getAnBnCnTuringMachine().subscribe(turingMachine => {
            console.log(turingMachine);
            this.turingMachine = turingMachine;
            this.initInputs();
        });
    }

    private initInputs(): void {
        if (!this.turingMachine) {
            return;
        }

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

    stateColumnDefs = [
        {
            headerName: 'State',
            field: 'name',
            checkboxSelection: true
        },
        {
            headerName: 'Start',
            cellClass: 'booleanType',
            field: 'start',
            cellRenderer: this.booleanCellRenderer
        },
        {
            headerName: 'Accept',
            cellClass: 'booleanType',
            field: 'accept',
            cellRenderer: this.booleanCellRenderer
        },
        {
            headerName: 'Decline',
            cellClass: 'booleanType',
            field: 'decline',
            cellRenderer: this.booleanCellRenderer
        }
    ];

    public booleanCellRenderer(params) {
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

    ruleColumnDefs = [
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

    public toastConfig: ToasterConfig =
        new ToasterConfig({
            timeout: 0,
            limit: 3,
            positionClass: 'toast-bottom-right'
        });
}
