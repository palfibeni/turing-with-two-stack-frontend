import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoStackConditionComponent } from './two-stack-condition.component';

describe('TwoStackConditionComponent', () => {
  let component: TwoStackConditionComponent;
  let fixture: ComponentFixture<TwoStackConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoStackConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoStackConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
