import { Component, OnInit } from '@angular/core';
import {TuringMachineService} from "../../service/turing.machine.service";
import {Router} from "@angular/router";
import {ToasterService} from "angular2-toaster";

@Component({
  selector: 'app-turing-machine-list',
  templateUrl: './turing-machine-list.component.html',
  styleUrls: ['./turing-machine-list.component.scss']
})
export class TuringMachineListComponent implements OnInit {

  // AG-grid specific
  private gridApi;
  private gridColumnApi;
  private rowSelection = "single";

  private entityId: number;

  constructor(private router: Router, private toasterService: ToasterService, private turingMachineService: TuringMachineService) {
    this.router = router;
    this.toasterService = toasterService;
    this.turingMachineService = turingMachineService;
  }

  ngOnInit() {
  }

  onGridReady(params) {
    console.log("Turing machine grid ready!");
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.turingMachineService.getTuringMachines().subscribe(turingMachines => {
      this.gridApi.setRowData(turingMachines);
      this.gridApi.sizeColumnsToFit();
    })
  }

  onSelectionChanged() {
    let selectedRows = this.gridApi.getSelectedRows();
    this.entityId = selectedRows[0].id;
  }

  public add(): void {
    this.router.navigate([`/turing-machine`]);
  }

  public edit(): void {
    if(!this.entityId) {
      this.toasterService.pop('error', 'Error', 'You must select an element!');
      return;
    }
    this.router.navigate([`/turing-machine/${this.entityId}`]);
  }

  private turingMachineColumnDefs = [
    {
      width: 40,
      checkboxSelection: true,
      suppressSizeToFit: true
    },
    {
      headerName: 'ID',
      field: 'id',
      width: 40,
      suppressSizeToFit: true
    },
    {
      headerName: 'Name',
      field: 'name'
    },
  ];

}
