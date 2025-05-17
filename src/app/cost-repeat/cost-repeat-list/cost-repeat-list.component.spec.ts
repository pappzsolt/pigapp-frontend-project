import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostRepeatListComponent } from './cost-repeat-list.component';

describe('CostRepeatListComponent', () => {
  let component: CostRepeatListComponent;
  let fixture: ComponentFixture<CostRepeatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostRepeatListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostRepeatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
