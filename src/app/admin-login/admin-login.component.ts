import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CaptionService } from 'src/app/services/captionService';
import { CommonService } from 'src/app/services/commonService';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  formGroup: FormGroup;
  token: string | undefined;
  failed: boolean = false;
  passVisibility: boolean = false;
  scrWidth: number;

  constructor(
    public captions: CaptionService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private authService: AuthService,
    public notifications: NotificationService,
    private router: Router,
  ) {

    this.token = undefined;

    this.formGroup = this.formBuilder.group({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'captcha': new FormControl(null, Validators.required),
    });

  }

  ngOnInit(): void {
    this.scrWidth = window.innerWidth;

    document.querySelector('.orange-line').scrollIntoView({ behavior: 'smooth', block: 'end' });

  }

  @HostListener('window:resize') getScreenSize(event?) {

    this.scrWidth = window.innerWidth;

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
        this.router.navigate(["/Main"]);

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
