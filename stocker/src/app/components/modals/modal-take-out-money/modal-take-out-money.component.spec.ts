import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTakeOutMoneyComponent } from './modal-take-out-money.component';

describe('ModalTakeOutMoneyComponent', () => {
  let component: ModalTakeOutMoneyComponent;
  let fixture: ComponentFixture<ModalTakeOutMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTakeOutMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTakeOutMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
