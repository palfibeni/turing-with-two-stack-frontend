import {Component, Input, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material";
import {_} from 'underscore';

import {Condition} from "../../../../dto/Condition";

@Component({
    selector: 'app-calculation-two-stack-init-tab',
    templateUrl: './calculation-two-stack-init-tab.component.html',
    styleUrls: ['./calculation-two-stack-init-tab.component.scss']
})
export class CalculationTwoStackInitTabComponent implements OnInit {

    @Input("twoStackInitConditions") public twoStackInitConditions: Array<Condition>;

    public conditionLength;
    public conditionPageSize = 12;
    public conditionPageSizeOptions: number[] = [8, 12, 20];
    private twoStackConditions: Array<Condition>;
    public twoStackConditionsFirst: Array<Condition>;
    public twoStackConditionsSecond: Array<Condition>;

    constructor() {
    }

    public ngOnInit(): void {
        this.onPaging({pageIndex: 0, pageSize: 12, length: this.conditionLength});
    }

    public onPaging(params: PageEvent) {
        if (!this.twoStackInitConditions.length) {
            return;
        }
        console.log(this.twoStackInitConditions);
        this.conditionPageSize = params.pageSize;
        this.twoStackConditions = _.chunk(this.twoStackInitConditions, this.conditionPageSize)[params.pageIndex];
        this.twoStackConditionsFirst = _.chunk(this.twoStackConditions, this.conditionPageSize / 2)[0];
        this.twoStackConditionsSecond = _.chunk(this.twoStackConditions, this.conditionPageSize / 2)[1];
    }

}
