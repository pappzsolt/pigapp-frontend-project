import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCostComponent } from './auto-cost.component';

describe('AutoCostComponent', () => {
  let component: AutoCostComponent;
  let fixture: ComponentFixture<AutoCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoCostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
