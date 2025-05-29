import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostRepeatFormComponent } from './cost-repeat-form.component';

describe('CostRepeatFormComponent', () => {
  let component: CostRepeatFormComponent;
  let fixture: ComponentFixture<CostRepeatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostRepeatFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CostRepeatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
