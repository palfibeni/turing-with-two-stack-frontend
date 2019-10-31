import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuringMachineStateTabComponent } from './turing-machine-state-tab.component';

describe('TuringMachineStateTabComponent', () => {
  let component: TuringMachineStateTabComponent;
  let fixture: ComponentFixture<TuringMachineStateTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuringMachineStateTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuringMachineStateTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
