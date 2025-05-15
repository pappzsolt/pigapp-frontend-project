import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashflowTableComponent } from './cashflow-table.component';

describe('CashflowTableComponent', () => {
  let component: CashflowTableComponent;
  let fixture: ComponentFixture<CashflowTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashflowTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashflowTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
