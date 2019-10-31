import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuringMachineRuleTabComponent } from './turing-machine-rule-tab.component';

describe('TuringMachineRuleTabComponent', () => {
  let component: TuringMachineRuleTabComponent;
  let fixture: ComponentFixture<TuringMachineRuleTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuringMachineRuleTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuringMachineRuleTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
