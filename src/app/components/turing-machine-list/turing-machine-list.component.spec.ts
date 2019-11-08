import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TuringMachineListComponent} from './turing-machine-list.component';
import {MatDialogModule, MatIconModule, MatToolbarModule} from "@angular/material";
import {ToasterModule, ToasterService} from "angular2-toaster";
import {AgGridModule} from 'ag-grid-angular';
import {TuringMachineService} from "../../service/turing-machine.service";
import {MockTuringMachineService} from "../../testing/mock-turing-machine.service";
import {Router} from "@angular/router";

describe('TuringMachineListComponent', () => {
    let component: TuringMachineListComponent;
    let fixture: ComponentFixture<TuringMachineListComponent>;
    let toasterService: ToasterService;
    let turingMachineService: TuringMachineService;

    const router = jasmine.createSpyObj('Router', {
        'navigate': ''
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TuringMachineListComponent],
            imports: [
                AgGridModule.withComponents([]),
                MatIconModule,
                MatDialogModule,
                MatToolbarModule,
                ToasterModule.forRoot()],
            providers: [
                {provide: Router, useValue: router},
                {provide: ToasterService, useValue: toasterService},
                {provide: TuringMachineService, useClass: MockTuringMachineService}]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TuringMachineListComponent);
        component = fixture.componentInstance;
        toasterService = fixture.debugElement.injector.get(ToasterService);
        turingMachineService = fixture.debugElement.injector.get(TuringMachineService);
        spyOn(MockTuringMachineService.prototype, 'getTuringMachines').and.callThrough();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
