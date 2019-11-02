import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationTwoStackInitTabComponent } from './calculation-two-stack-init-tab.component';

describe('CalculationTwoStackInitTabComponent', () => {
  let component: CalculationTwoStackInitTabComponent;
  let fixture: ComponentFixture<CalculationTwoStackInitTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculationTwoStackInitTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationTwoStackInitTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
