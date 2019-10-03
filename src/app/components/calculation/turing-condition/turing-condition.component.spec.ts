import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuringConditionComponent } from './turing-condition.component';

describe('TuringConditionComponent', () => {
  let component: TuringConditionComponent;
  let fixture: ComponentFixture<TuringConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuringConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuringConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
