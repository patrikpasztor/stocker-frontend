import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddMoneyComponent } from './modal-add-money.component';

describe('ModalAddMoneyComponent', () => {
  let component: ModalAddMoneyComponent;
  let fixture: ComponentFixture<ModalAddMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
