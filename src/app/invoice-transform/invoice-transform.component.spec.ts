import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTransformComponent } from './invoice-transform.component';

describe('InvoiceTransformComponent', () => {
  let component: InvoiceTransformComponent;
  let fixture: ComponentFixture<InvoiceTransformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceTransformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceTransformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
