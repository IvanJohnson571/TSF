import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CaptionService } from 'src/app/services/captionService';
import { CommonService } from 'src/app/services/commonService';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-create-new-profile-dialog',
  templateUrl: './create-new-profile-dialog.component.html',
  styleUrls: ['./create-new-profile-dialog.component.scss']
})
export class CreateNewProfileDialogComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  passVisibility: boolean = false;
  passRepeatVisibility: boolean = false;
  subscriptions = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<CreateNewProfileDialogComponent>,
    public captions: CaptionService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private authService: AuthService,
    public notifications: NotificationService
  ) {

    this.formGroup = this.formBuilder.group({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'repeat_password': new FormControl(null, Validators.required),
      //'captcha': new FormControl(null, Validators.required),
    });

    const loggedInSubs = this.authService.userCreated.subscribe(created => {

      if (created) {
        this.dialogRef.close();
      }

    });
    this.subscriptions.add(loggedInSubs);

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {

    this.authService.userCreated.next(false);
    this.subscriptions.unsubscribe()

  }

  CreateUser() {

    if (this.formGroup.value.password == this.formGroup.value.repeat_password && this.formGroup.valid) {
      this.authService.createUser(this.formGroup.value.username, this.formGroup.value.password);

    }

  }

  switchVisibility() {

    if (this.passVisibility) {
      this.passVisibility = false;
    } else {
      this.passVisibility = true;
    }

  }

  switchRepeatVisibility() {

    if (this.passRepeatVisibility) {
      this.passRepeatVisibility = false;
    } else {
      this.passRepeatVisibility = true;
    }

  }

}
