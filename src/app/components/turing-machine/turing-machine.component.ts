import {Component, OnInit, ViewChild} from '@angular/core';
import {ToasterService} from "angular2-toaster";
import {ActivatedRoute, Router} from "@angular/router";

import {CalculationService} from "../../service/calculation.service";
import {TuringMachineService} from "../../service/turing-machine.service";
import {TuringMachine} from "../../dto/TuringMachine";
import {MatDialog} from "@angular/material";
import {TuringMachineValidator} from "../../validator/turing-machine.validator";
import {TuringMachineCharacterTabComponent} from "./tab/turing-machine-character-tab/turing-machine-character-tab.component";
import {TuringMachineStateTabComponent} from "./tab/turing-machine-state-tab/turing-machine-state-tab.component";
import {TuringMachineRuleTabComponent} from "./tab/turing-machine-rule-tab/turing-machine-rule-tab.component";
import {TuringMachineJsonTabComponent} from "./tab/turing-machine-json-tab/turing-machine-json-tab.component";

@Component({
    selector: 'app-turing-machine',
    templateUrl: './turing-machine.component.html',
    styleUrls: ['./turing-machine.component.scss']
})
export class TuringMachineComponent implements OnInit {

    @ViewChild('characterTab', {static: true})
    private characterTab: TuringMachineCharacterTabComponent;
    @ViewChild('stateTab', {static: true})
    private stateTab: TuringMachineStateTabComponent;
    @ViewChild('ruleTab', {static: true})
    private ruleTab: TuringMachineRuleTabComponent;
    @ViewChild('jsonTab', {static: true})
    private jsonTab: TuringMachineJsonTabComponent;

    private turingMachine: TuringMachine = new TuringMachine();

    private title: String;

    public input: String;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private toasterService: ToasterService,
                private dialog: MatDialog,
                private turingMachineService: TuringMachineService,
                private calculationService: CalculationService,
                private turingMachineValidator: TuringMachineValidator) {
    }

    public ngOnInit(): void {
        const entityId = this.route.snapshot.paramMap.get('entityId');
        if (entityId) {
            this.turingMachineService.getTuringMachine(entityId).subscribe(turingMachine => {
                console.log(turingMachine);
                this.turingMachine = turingMachine;
            });
        }
    }

    public back(): void {
        this.router.navigate(['']);
    }

    private initPage(turingMachine: TuringMachine): void {
        if (!turingMachine) {
            return;
        }
        this.turingMachine = turingMachine;
        this.title = this.turingMachine.name;
        this.stateTab.refreshTab();
        this.ruleTab.refreshTab();
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

    public save(): void {
        try {
            this.turingMachineValidator.validateTuringMachine(this.turingMachine);
            this.turingMachineService.saveTuringMachine(this.turingMachine).subscribe(
                () => {
                    location.reload();
                }, ex => {
                    console.log(ex);
                    this.toasterService.pop('error', 'Error', ex.error.message);
                });
        } catch (ex) {
            console.log(ex);
            this.toasterService.pop('error', 'Turing machine not valid', ex);
        }
    }

    public tabSelectionChange(selectedTabIndex) {
        switch (selectedTabIndex) {
            case 1:
                this.stateTab.refreshTab();
                break;
            case 2:
                this.ruleTab.refreshTab();
                break;
            default:
                break;
        }
    }

}
