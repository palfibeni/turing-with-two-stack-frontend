import {Component} from '@angular/core';
import {_} from 'underscore';

import {TuringMachineService} from "../service/turing.machine.service";
import {TuringMachine} from "../dto/TuringMachine";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public turingMachine: TuringMachine;

    public states: Array<any>;

    constructor(private turingMachineService: TuringMachineService) {
    }

    public ngOnInit(): void {
        this.turingMachineService.getAnBnCnTuringMachine().subscribe(AnBnCnTuringMachine => {
            console.log(AnBnCnTuringMachine);
            this.turingMachine = AnBnCnTuringMachine;
            this.initInputs();
        });
    }

    private initInputs(): void {
        if (!this.turingMachine) {
            return;
        }

        this.states = this.turingMachine.states;
    }

    stateColumnDefs = [
        {headerName: 'State', field: 'name', checkboxSelection: true},
        {headerName: 'Start', cellClass: 'booleanType', field: 'start', cellRenderer: this.booleanCellRenderer},
        {headerName: 'Accept', cellClass: 'booleanType', field: 'accept', cellRenderer: this.booleanCellRenderer},
        {headerName: 'Decline', cellClass: 'booleanType', field: 'decline', cellRenderer: this.booleanCellRenderer}
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

    // ruleColumnDefs = [
    //     {headerName: 'From State', field: 'fromState', checkboxSelection: true},
    //     {headerName: 'Start', cellClass: 'booleanType', field: 'start', cellRenderer: this.booleanCellRenderer},
    //     {headerName: 'To State', cellClass: 'toState', field: 'accept', cellRenderer: this.booleanCellRenderer},
    //     {headerName: 'Decline', cellClass: 'booleanType', field: 'decline', cellRenderer: this.booleanCellRenderer}
    // ];
}
