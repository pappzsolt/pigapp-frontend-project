import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostGroupSummaryComponent } from './cost-group-summary.component';

describe('CostGroupSummaryComponent', () => {
  let component: CostGroupSummaryComponent;
  let fixture: ComponentFixture<CostGroupSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostGroupSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CostGroupSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
