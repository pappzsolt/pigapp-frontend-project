import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCostTableRowComponent } from './auto-cost-table-row.component';

describe('AutoCostTableRowComponent', () => {
  let component: AutoCostTableRowComponent;
  let fixture: ComponentFixture<AutoCostTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoCostTableRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoCostTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
