import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashflowItemComponent } from './cashflow-item.component';

describe('CashflowItemComponent', () => {
  let component: CashflowItemComponent;
  let fixture: ComponentFixture<CashflowItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashflowItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashflowItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
