import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {_} from 'underscore';
import {ToasterService} from "angular2-toaster";
import {MatDialog} from "@angular/material";

import {TuringMachine} from "../../../../dto/TuringMachine";
import {StateDialogComponent} from "../../dialog/state-dialog/state-dialog.component";
import {MachineStateValidator} from "../../../../validator/machine-state.validator";

@Component({
    selector: 'app-turing-machine-state-tab',
    templateUrl: './turing-machine-state-tab.component.html',
    styleUrls: ['./turing-machine-state-tab.component.scss']
})
export class TuringMachineStateTabComponent implements OnInit {

    @Input('turingMachine') turingMachine: TuringMachine = new TuringMachine();

    @Output('turingMachineChange') turingMachineChange: EventEmitter<TuringMachine> = new EventEmitter();

    // AG-grid specific
    private stateGridApi;
    private stateGridColumnApi;
    private rowSelection = "single";

    constructor(private toasterService: ToasterService,
                private dialog: MatDialog,
                private machineStateValidator: MachineStateValidator) {
    }

    public ngOnInit(): void {
    }

    public refreshTab() {
        this.stateGridApi.setRowData(this.turingMachine.states);
        this.stateGridApi.sizeColumnsToFit();
    }

    public onStateGridReady(params) {
        this.stateGridApi = params.api;
        this.stateGridColumnApi = params.columnApi;
        console.log("State grid ready!");
    }

    public addState(): void {
        let stateDialog = this.dialog.open(StateDialogComponent, {
            height: '400px',
            width: '450px',
            data: {states: this.turingMachine.states}
        });
        stateDialog.afterClosed().subscribe(newState => {
            if (newState) {
                console.log(`New state added! (${newState.name})`);
                this.turingMachine.states.push(newState);
                console.log(this.turingMachine.states);
                this.turingMachineChange.emit(this.turingMachine);
            }
        });
    }

    public editState(): void {
        let selectedRows = this.stateGridApi.getSelectedRows();
        if (!selectedRows.length) {
            this.toasterService.pop('error', 'No selection', 'You must select a state!');
        }
        let selectedState = selectedRows[0];
        console.log(`edit ${selectedState.id}`);

        let stateDialog = this.dialog.open(StateDialogComponent, {
            height: '400px',
            width: '450px',
            data: {
                machineState: selectedState,
                states: this.turingMachine.states
            }
        });
        stateDialog.afterClosed().subscribe(newState => {
            if (newState) {
                console.log(`New state added! (${newState.name})`);
                this.turingMachine.states.splice(this.turingMachine.states.indexOf(selectedState), 1);
                this.turingMachine.states.push(newState);
                console.log(this.turingMachine.states);
                this.turingMachineChange.emit(this.turingMachine);
            }
        });
    }

    public deleteState(): void {
        let selectedRows = this.stateGridApi.getSelectedRows();
        if (!selectedRows.length) {
            this.toasterService.pop('error', 'No selection', 'You must select a state!');
        }
        let selectedState = selectedRows[0];
        let ruleWhereStateIsUsed = _.find(this.turingMachine.rules, (rule) => {
            return rule.fromState.id === selectedState.id
                || rule.toState.id === selectedState.id;
        });

        if (ruleWhereStateIsUsed) {
            this.toasterService.pop(
                'error', 'Used',
                `The character is still in use! (stateId: ${selectedState.id}) (ruleId; ${ruleWhereStateIsUsed.id})`);
            return;
        }
        console.log(`delete state ${selectedState.id}`);
        this.turingMachine.states.splice(this.turingMachine.states.indexOf(selectedState), 1);
        this.turingMachineChange.emit(this.turingMachine);
    }

    // State AG-grid ColumnDefs
    private stateColumnDefs = [
        {
            headerName: 'ID',
            field: 'id',
            sortable: true,
            filter: true,
            checkboxSelection: true,
            width: 80,
            suppressSizeToFit: true,
        },
        {
            headerName: 'Name',
            field: 'name',
            sortable: true,
            filter: true
        },
        {
            headerName: 'Start',
            cellClass: 'booleanType',
            field: 'start',
            cellRenderer: TuringMachineStateTabComponent.booleanCellRenderer,
            width: 80,
            suppressSizeToFit: true
        },
        {
            headerName: 'Accept',
            cellClass: 'booleanType',
            field: 'accept',
            cellRenderer: TuringMachineStateTabComponent.booleanCellRenderer,
            width: 80,
            suppressSizeToFit: true
        },
        {
            headerName: 'Decline',
            cellClass: 'booleanType',
            field: 'decline',
            cellRenderer: TuringMachineStateTabComponent.booleanCellRenderer,
            width: 80,
            suppressSizeToFit: true
        }
    ];

    public static booleanCellRenderer(params): String {
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

}
