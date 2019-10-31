import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuringMachineCharacterTabComponent } from './turing-machine-character-tab.component';

describe('TuringMachineCharacterTabComponent', () => {
  let component: TuringMachineCharacterTabComponent;
  let fixture: ComponentFixture<TuringMachineCharacterTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuringMachineCharacterTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuringMachineCharacterTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
