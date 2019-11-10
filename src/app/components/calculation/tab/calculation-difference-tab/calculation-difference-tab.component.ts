import {Component, Input, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material";
import {_} from 'underscore';

import {Condition} from "../../../../dto/Condition";
import {Calculation} from "../../../../dto/Calculation";

@Component({
    selector: 'app-calculation-difference-tab',
    templateUrl: './calculation-difference-tab.component.html',
    styleUrls: ['./calculation-difference-tab.component.scss']
})
export class CalculationDifferenceTabComponent implements OnInit {

    @Input("calculation") public calculation: Calculation;

    public conditionLength;
    public conditionPageSize = 6;
    public conditionPageSizeOptions: number[] = [4, 6, 10, 20];
    public turingConditions: Array<Condition>;
    public twoStackConditions: Array<Condition>;

    constructor() {
    }

    public ngOnInit(): void {
        this.conditionLength = this.calculation.turingConditions.length;
        this.onPaging({pageIndex: 0, pageSize: 6, length: this.conditionLength});
    }

    public onPaging(params: PageEvent) {
        console.log(this.calculation);
        this.conditionPageSize = params.pageSize;
        this.turingConditions = _.chunk(this.calculation.turingConditions, this.conditionPageSize)[params.pageIndex];
        this.twoStackConditions = _.chunk(_.last(this.calculation.twoStackConditions, this.conditionLength), this.conditionPageSize)[params.pageIndex];
    }

}
