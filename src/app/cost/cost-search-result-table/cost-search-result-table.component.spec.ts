import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostSearchResultTableComponent } from './cost-search-result-table.component';

describe('CostSearchResultTableComponent', () => {
  let component: CostSearchResultTableComponent;
  let fixture: ComponentFixture<CostSearchResultTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostSearchResultTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CostSearchResultTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
