import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessEmailComponent } from './success-email.component';

describe('SuccessEmailComponent', () => {
  let component: SuccessEmailComponent;
  let fixture: ComponentFixture<SuccessEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
