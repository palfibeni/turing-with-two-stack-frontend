import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationDifferenceTabComponent } from './calculation-difference-tab.component';

describe('CalculationDifferenceTabComponent', () => {
  let component: CalculationDifferenceTabComponent;
  let fixture: ComponentFixture<CalculationDifferenceTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculationDifferenceTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationDifferenceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
