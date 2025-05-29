import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostListTableComponent } from './cost-list-table.component';

describe('CostListTableComponent', () => {
  let component: CostListTableComponent;
  let fixture: ComponentFixture<CostListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostListTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CostListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
