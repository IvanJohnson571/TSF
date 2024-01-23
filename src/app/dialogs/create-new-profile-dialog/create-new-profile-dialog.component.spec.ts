import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewProfileDialogComponent } from './create-new-profile-dialog.component';

describe('CreateNewProfileDialogComponent', () => {
  let component: CreateNewProfileDialogComponent;
  let fixture: ComponentFixture<CreateNewProfileDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewProfileDialogComponent]
    });
    fixture = TestBed.createComponent(CreateNewProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
