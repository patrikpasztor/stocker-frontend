import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWatchComponent } from './modal-watch.component';

describe('ModalWatchComponent', () => {
  let component: ModalWatchComponent;
  let fixture: ComponentFixture<ModalWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalWatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
