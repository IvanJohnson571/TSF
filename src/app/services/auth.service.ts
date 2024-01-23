import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { AuthData } from '../models/auth-data.model';
import { environment } from 'src/environments/environment';
import { response } from 'express';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user';
import { NotificationService } from './notification.service';
import { CaptionService } from './captionService';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;
  private token: string;
  public tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();
  expiresInDate: number = null;
  loggedIn = new BehaviorSubject<boolean>(false);
  user = {
    expiresIn: this.expiresInDate,
    user_name: null,
    userId: null,
    token: null
  }
  userCreated = new BehaviorSubject<boolean>(false);
  timer = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    public notificationService: NotificationService,
    public captions: CaptionService,
  ) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(name: string, pass: string) {

    const authData: AuthData = { name: name, pass: pass };

    this.http.post(environment.mainUrl + "api/users/signup", authData)
      .subscribe((response: any) => {

        if (response.success) {
          this.notificationService.openSnackBarSuccess(response.message);
          this.userCreated.next(true);

        } else {
          this.notificationService.openSnackBarFailure(response.message);

        }

      }, (error: any) => {
        this.notificationService.openSnackBarFailure("Something went wrong!");

      });

  }

  login(authData: AuthData) {

    this.http
      .post<{ token: string; expiresIn: number; userId: string; user_name: string }>(
        environment.mainUrl + "api/users/login", authData
      )
      .subscribe(
        response => {

          const token = response.token;
          this.token = token;

          if (this.token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.loggedIn.next(true);
            this.userId = response.userId;
            this.user = response;
            this.expiresInDate = response.expiresIn;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate, this.userId, response.user_name, expiresInDuration);
            this.router.navigate(["/"]);

          }

        }, error => {
          this.authStatusListener.next(false);
        }
      )

  }

  saveAuthData(token: string, expirationDate: Date, userId: string, user_name, expiresInDuration: number) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("expirationInSeconds", expiresInDuration.toString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("user_name", user_name);
  }

  logout(sessionExpired: boolean) {

    this.token = null;
    this.isAuthenticated = false;
    this.loggedIn.next(false);
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();

    if (sessionExpired) {
      this.notificationService.openSnackBarFailure(this.captions.captionServiceList['SessionExpired']);

    }

    this.router.navigate(['/']);

  }

  public setAuthTimer(duration: number) {

    this.expiresInDate = duration;

    this.timer.next(setTimeout(() => {
      this.logout(true);
    }, duration * 1000))

  }

  clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("expirationInSeconds");
    localStorage.removeItem("userId");
    localStorage.removeItem("user_name");

  }

}
