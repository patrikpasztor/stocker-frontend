import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSellComponent } from './modal-sell.component';

describe('ModalSellComponent', () => {
  let component: ModalSellComponent;
  let fixture: ComponentFixture<ModalSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
