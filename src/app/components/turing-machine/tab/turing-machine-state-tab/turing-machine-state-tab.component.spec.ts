import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TuringMachineStateTabComponent} from './turing-machine-state-tab.component';
import {MatDialog, MatDialogModule, MatIconModule, MatToolbarModule} from "@angular/material";
import {AgGridModule} from 'ag-grid-angular';
import {ToasterModule, ToasterService} from "angular2-toaster";
import {MachineStateValidator} from "../../../../validator/machine-state.validator";
import {MockMachineStateValidator} from "../../../../testing/mock-machine-state.validator";

describe('TuringMachineStateTabComponent', () => {
    let component: TuringMachineStateTabComponent;
    let fixture: ComponentFixture<TuringMachineStateTabComponent>;
    let toasterService: ToasterService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TuringMachineStateTabComponent],
            imports: [
                AgGridModule.withComponents([]),
                MatIconModule,
                MatDialogModule,
                MatToolbarModule,
                ToasterModule.forRoot()],
            providers: [
                ToasterService,
                {provide: MatDialog, useValue: null},
                {provide: MachineStateValidator, useClass: MockMachineStateValidator}]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TuringMachineStateTabComponent);
        component = fixture.componentInstance;
        toasterService = fixture.debugElement.injector.get(ToasterService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
