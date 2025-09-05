import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostRepeatWithSumComponent } from './cost-repeat-with-sum.component';

describe('CostRepeatWithSumComponent', () => {
  let component: CostRepeatWithSumComponent;
  let fixture: ComponentFixture<CostRepeatWithSumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostRepeatWithSumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostRepeatWithSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
