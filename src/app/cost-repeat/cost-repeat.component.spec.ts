import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostRepeatComponent } from './cost-repeat.component';

describe('CostRepeatComponent', () => {
  let component: CostRepeatComponent;
  let fixture: ComponentFixture<CostRepeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostRepeatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CostRepeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
