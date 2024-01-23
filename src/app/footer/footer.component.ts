import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { CaptionService } from '../services/captionService';
import { LoaderService } from '../services/loader.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AdminLoginDialogComponent } from '../dialogs/admin-login-dialog/admin-login-dialog.component';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { CreateNewProfileDialogComponent } from '../dialogs/create-new-profile-dialog/create-new-profile-dialog.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  scrWidth: number;
  currentYear: number = new Date().getFullYear();
  private subscriptions: Subscription = new Subscription();
  show: boolean = false;
  isLoading: boolean = false;
  isAuthenticated: boolean = false;

  constructor(
    public captions: CaptionService,
    public loader: LoaderService,
    public dialog: MatDialog,
    private authService: AuthService,
    public notifications: NotificationService,
    public router: Router
  ) { }

  ngOnInit(): void {

    this.scrWidth = window.innerWidth;

    const methodSub = this.loader.show.subscribe(loaded => {

      if (loaded) {
        this.show = loaded;

      }

    });
    this.subscriptions.add(methodSub);

    const isLoadingSub = this.loader.isLoading.subscribe(loaded => {

      this.isLoading = loaded;

    });
    this.subscriptions.add(isLoadingSub);

    const loggedInSubs = this.authService.loggedIn.subscribe(logged => {

      this.isAuthenticated = logged;

    });
    this.subscriptions.add(loggedInSubs);

  }

  ngOnDestroy(): void {

    this.subscriptions.unsubscribe();

  }

  goToFB() {

    window.open('https://www.facebook.com/profile.php?id=100066747517811', '_blank');

  }

  goToDeveloperPage() {
    window.open('https://www.linkedin.com/in/ivan-ivanov-458992170/', '_blank');
  }

  @HostListener('window:resize') getScreenSize(event?) {

    this.scrWidth = window.innerWidth;

  }

  adminLogin() {

    this.router.navigate(["/Admin-LogIn"]);

    //const dialogRef = this.dialog.open(AdminLoginDialogComponent, {
    //  //width: '35rem',
    //  autoFocus: false,
    //  data: {}
    //})
    //dialogRef.afterClosed().subscribe(result => {

    //});
  }

  adminLogOut() {

    this.authService.logout(true);
    this.notifications.openSnackBarSuccess(this.captions.captionServiceList['LogOutSuccess']);
    this.router.navigate(["/"]);
    this.scrollTop();

  }

  scrollTop() {

    if (document.querySelector('.toolbar-primary')) {
      document.querySelector('.toolbar-primary').scrollIntoView({ behavior: 'smooth', block: 'end' });

    }

  };

  createNewAdmin() {

    const dialogRef = this.dialog.open(CreateNewProfileDialogComponent, {
      //width: '35rem',
      autoFocus: false,
      data: {}
    })
    dialogRef.afterClosed().subscribe(result => {

    });

  }

}
