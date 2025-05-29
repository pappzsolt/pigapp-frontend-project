import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostFilterComponent } from './cost-filter.component';

describe('CostFilterComponent', () => {
  let component: CostFilterComponent;
  let fixture: ComponentFixture<CostFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CostFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
