import {Component, Input, OnInit} from '@angular/core';
import {_} from 'underscore';

import {Calculation} from "../../dto/Calculation";
import {TuringMachine} from "../../dto/TuringMachine";
import {Condition} from "../../dto/Condition";
import {ToasterConfig, ToasterService} from "angular2-toaster";
import {Router} from "@angular/router";
import {CalculationService} from "../../service/calculation.service";

@Component({
    selector: 'app-calculation',
    templateUrl: `calculation.component.html`,
    styleUrls: [`calculation.component.scss`]
})
export class CalculationComponent implements OnInit {
    private turingMachine: TuringMachine;
    private calculation: Calculation;
    private stateMap: Array<any>;

    constructor(private router: Router,
                private calculationService: CalculationService) {
    }

    public ngOnInit(): void {
        if (!this.calculationService.calculation || !this.calculationService.turingMachine) {
            this.back();
            return;
        }
        this.calculation = this.calculationService.calculation;
        this.turingMachine = this.calculationService.turingMachine;
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
