import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuringMachineListComponent } from './turing-machine-list.component';

describe('TuringMachineListComponent', () => {
  let component: TuringMachineListComponent;
  let fixture: ComponentFixture<TuringMachineListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuringMachineListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuringMachineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
