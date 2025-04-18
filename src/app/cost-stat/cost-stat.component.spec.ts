import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostStatComponent } from './cost-stat.component';

describe('CostStatComponent', () => {
  let component: CostStatComponent;
  let fixture: ComponentFixture<CostStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
