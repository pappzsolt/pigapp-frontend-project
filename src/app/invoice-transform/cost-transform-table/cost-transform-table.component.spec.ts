import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostTransformTableComponent } from './cost-transform-table.component';

describe('CostTransformTableComponent', () => {
  let component: CostTransformTableComponent;
  let fixture: ComponentFixture<CostTransformTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostTransformTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostTransformTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
