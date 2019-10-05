import {Component, OnInit} from '@angular/core';
import {_} from 'underscore';

import {Calculation} from "../../dto/Calculation";
import {TuringMachine} from "../../dto/TuringMachine";
import {Router} from "@angular/router";
import {CalculationService} from "../../service/calculation.service";
import {PageEvent} from "@angular/material";
import {Condition} from "../../dto/Condition";

@Component({
    selector: 'app-calculation',
    templateUrl: `calculation.component.html`,
    styleUrls: [`calculation.component.scss`]
})
export class CalculationComponent implements OnInit {

    // AG-grid specific
    private turingCalculationGridApi;
    private turingCalculationGridColumnApi;
    private twoStackCalculationGridApi;
    private twoStackCalculationGridColumnApi;
    private rowSelection;

    private turingMachine: TuringMachine;
    private calculation: Calculation;
    private stateMap: Array<any>;

    private conditionLength;
    private conditionPageSize = 6;
    private conditionPageSizeOptions: number[] = [4, 6, 10, 20];
    private turingConditions: Array<Condition>;
    private twoStackConditions: Array<Condition>;

    constructor(private router: Router,
                private calculationService: CalculationService) {
    }

    public ngOnInit(): void {
        if (!this.calculationService.calculation || !this.calculationService.turingMachine) {
            this.router.navigate(['']);
            return;
        }
        this.calculation = this.calculationService.calculation;
        this.conditionLength = this.calculation.turingConditions.length;
        this.turingMachine = this.calculationService.turingMachine;
        this.stateMap = _.indexBy(this.turingMachine.states, 'id');
        this.onPaging({pageIndex: 0, pageSize: 6, length: this.conditionLength});
    }

    public back(): void {
        this.router.navigate([`/turing-machine/${this.turingMachine.id}`]);
    }

    public onPaging(params : PageEvent) {
        this.conditionPageSize = params.pageSize;
        this.turingConditions = _.chunk(this.calculation.turingConditions, this.conditionPageSize)[params.pageIndex];
        this.twoStackConditions = _.chunk(this.calculation.twoStackConditions, this.conditionPageSize)[params.pageIndex];
    }

    public tabSelectionChange(selectedTabIndex) {
        switch(selectedTabIndex) {
            case 1:
                this.turingCalculationGridApi.sizeColumnsToFit();
                break;
            case 2:
                this.twoStackCalculationGridApi.sizeColumnsToFit();
                break;
            default:
                break;
        }
    }

    public onTuringCalculationGridReady(params) {
        console.log("Turing Calculation grid ready!");
        this.turingCalculationGridApi = params.api;
        this.turingCalculationGridColumnApi = params.columnApi;
    }

    public onTwoStackCalculationGridReady(params) {
        console.log("TwoStack Calculation grid ready!");
        this.twoStackCalculationGridApi = params.api;
        this.twoStackCalculationGridColumnApi = params.columnApi;
    }

    private conditionColumnDefs = [
        {
            headerName: 'Current State',
            field: 'currentState',
            cellRenderer: _.bind(this.stateRenderer, this)
        },
        {
            headerName: 'Characters Behind',
            field: 'charactersBehind'
        },
        {
            headerName: 'Current Position',
            field: 'currentPosition',
            width: 120,
            suppressSizeToFit: true
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
