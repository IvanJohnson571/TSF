import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { CaptionService } from 'src/app/services/captionService';
import { CommonService } from 'src/app/services/commonService';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-admin-login-dialog',
  templateUrl: './admin-login-dialog.component.html',
  styleUrls: ['./admin-login-dialog.component.scss']
})
export class AdminLoginDialogComponent {

  formGroup: FormGroup;
  token: string | undefined;
  failed: boolean = false;
  passVisibility: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AdminLoginDialogComponent>,
    public captions: CaptionService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private authService: AuthService,
    public notifications: NotificationService
  ) {

    this.token = undefined;

    this.formGroup = this.formBuilder.group({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'captcha': new FormControl(null, Validators.required),
    });

  }

  ngOnInit(): void {
  }

  userLogin() {

    if (this.formGroup.valid) {

      let authData = {
        name: this.formGroup.get("username").value,
        pass: this.formGroup.get("password").value
      }

      this.authService.login(authData);

      if (this.authService.user.token) {
        this.notifications.openSnackBarSuccess(this.captions.captionServiceList['LoginOK']);
        this.dialogRef.close();

      } else {

        this.failed = true;

      }

    }

  }

  switchVisibility() {

    if (this.passVisibility) {
      this.passVisibility = false;
    } else {
      this.passVisibility = true;
    }

  }

}
