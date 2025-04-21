import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowGroupsComponent } from './cash-flow-groups.component';

describe('CashFlowGroupsComponent', () => {
  let component: CashFlowGroupsComponent;
  let fixture: ComponentFixture<CashFlowGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashFlowGroupsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CashFlowGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
