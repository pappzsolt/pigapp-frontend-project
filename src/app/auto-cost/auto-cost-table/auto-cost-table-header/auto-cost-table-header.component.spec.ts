import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCostTableHeaderComponent } from './auto-cost-table-header.component';

describe('AutoCostTableHeaderComponent', () => {
  let component: AutoCostTableHeaderComponent;
  let fixture: ComponentFixture<AutoCostTableHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoCostTableHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoCostTableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
