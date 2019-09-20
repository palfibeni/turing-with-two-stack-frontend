import {Component, Input} from '@angular/core';
import {_} from 'underscore';

import {Calculation} from "../../dto/Calculation";
import {TuringMachine} from "../../dto/TuringMachine";
import {Condition} from "../../dto/Condition";
import {ToasterConfig, ToasterService} from "angular2-toaster";
import {Router} from "@angular/router";

@Component({
    selector: 'app-calculation',
    templateUrl: `calculation.component.html`,
    styleUrls: [`calculation.component.scss`]
})
export class CalculationComponent {
    private turingMachine: TuringMachine;
    private calculation: Calculation;
    private stateMap: Array<any>;

    constructor(private router: Router) {
    }

    public ngOnInit(): void {
        if (!history.state.data.calculation || !history.state.data.turingMachine) {
            this.back();
            return;
        }
        this.calculation = history.state.data.calculation;
        this.turingMachine = history.state.data.turingMachine;
        this.stateMap = _.indexBy(this.turingMachine.states, 'id');
    }

    public back(): void {
        this.router.navigate(['']);
    }

    conditionColumnDefs = [
        {
            headerName: 'Current State',
            field: 'currentState',
            checkboxSelection: true,
            cellRenderer: _.bind(this.stateRenderer, this)
        },
        {
            headerName: 'Characters Behind',
            field: 'charactersBehind'
        },
        {
            headerName: 'Current Position',
            field: 'currentPosition'
        },
        {
            headerName: 'Characters Ahead',
            field: 'charactersAhead'
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
