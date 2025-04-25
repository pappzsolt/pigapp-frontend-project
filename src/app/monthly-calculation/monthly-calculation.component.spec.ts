import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyCalculationComponent } from './monthly-calculation.component';

describe('MonthlyCalculationComponent', () => {
  let component: MonthlyCalculationComponent;
  let fixture: ComponentFixture<MonthlyCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyCalculationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MonthlyCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
