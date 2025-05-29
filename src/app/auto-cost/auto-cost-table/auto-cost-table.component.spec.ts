import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCostTableComponent } from './auto-cost-table.component';

describe('AutoCostTableComponent', () => {
  let component: AutoCostTableComponent;
  let fixture: ComponentFixture<AutoCostTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoCostTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutoCostTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
