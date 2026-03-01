import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostPastListComponent } from './cost-past-list.component';

describe('CostPastListComponent', () => {
  let component: CostPastListComponent;
  let fixture: ComponentFixture<CostPastListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostPastListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostPastListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
