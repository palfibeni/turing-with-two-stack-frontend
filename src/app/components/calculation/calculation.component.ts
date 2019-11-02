import {Component, OnInit} from '@angular/core';
import {_} from 'underscore';
import {PageEvent} from "@angular/material";
import {Router} from "@angular/router";

import {Calculation} from "../../dto/Calculation";
import {TuringMachine} from "../../dto/TuringMachine";
import {CalculationService} from "../../service/calculation.service";
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
    public calculation: Calculation;

    public twoStackInitConditions: Array<Condition>;

    constructor(private router: Router,
                private calculationService: CalculationService) {
    }

    public ngOnInit(): void {
        if (!this.calculationService.calculation || !this.calculationService.turingMachine) {
            this.router.navigate(['']);
            return;
        }
        this.calculation = this.calculationService.calculation;
        let twoStackInitConditionLength = this.calculation.twoStackConditions.length - this.calculation.turingConditions.length;
        this.twoStackInitConditions = _.first(this.calculation.twoStackConditions, twoStackInitConditionLength);
    }

    public back(): void {
        this.router.navigate([`/turing-machine/${this.calculationService.turingMachine.id}`]);
    }

    public tabSelectionChange(selectedTabIndex) {
        switch(selectedTabIndex) {
            case 2:
                this.turingCalculationGridApi.sizeColumnsToFit();
                break;
            case 3:
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
            field: 'currentState.name',
        },
        {
            headerName: 'Characters Behind',
            field: 'charactersBehind',
            cellStyle: {textAlign: "right"}
        },
        {
            headerName: 'Cursor',
            field: 'currentPosition',
            width: 80,
            suppressSizeToFit: true
        },
        {
            headerName: 'Characters Ahead',
            field: 'charactersAhead'
        }
    ];
}
