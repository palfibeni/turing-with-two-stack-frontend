import {Component} from '@angular/core';
import {_} from 'underscore';

import {TuringMachineService} from "../service/turing.machine.service";
import {TuringMachine} from "../dto/TuringMachine";
import {TuringRule} from "../dto/TuringRule";
import {MachineState} from "../dto/MachineState";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public turingMachine: TuringMachine;
    public states: Array<MachineState>;
    public rules: Array<TuringRule>;
    private stateMap: Array<any>;

    public input: String;


    constructor(private turingMachineService: TuringMachineService) {
    }

    public ngOnInit(): void {
        this.turingMachineService.getAnBnCnTuringMachine().subscribe(turingMachine => {
            console.log(turingMachine);
            console.log(JSON.stringify(turingMachine));
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
            return;
        }
        console.log()
        let calculation = await this.turingMachineService.calculate(this.turingMachine, this.input).toPromise();
        console.log(calculation);
    }

    stateColumnDefs = [
        {
            headerName: 'State',
            field: 'name',
            checkboxSelection: true},
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
            cellClass: '',
            field: 'readCharacter'
        },
        {
            headerName: 'To State',
            cellClass: '',
            field: 'toState',
            cellRenderer: _.bind(this.stateRenderer, this)
        },
        {
            headerName: 'Direction',
            cellClass: '',
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
