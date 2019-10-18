import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuringMachineJsonTabComponent } from './turing-machine-json-tab.component';

describe('TuringMachineJsonTabComponent', () => {
  let component: TuringMachineJsonTabComponent;
  let fixture: ComponentFixture<TuringMachineJsonTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuringMachineJsonTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuringMachineJsonTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
