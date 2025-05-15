import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferMessageComponent } from './transfer-message.component';

describe('TransferMessageComponent', () => {
  let component: TransferMessageComponent;
  let fixture: ComponentFixture<TransferMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransferMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
