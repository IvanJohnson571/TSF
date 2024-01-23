import { Component, OnDestroy, OnInit, ViewChild, HostListener, OnChanges } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Subscription, forkJoin } from "rxjs";
import { MatSidenav } from '@angular/material/sidenav';
import { LoaderService } from './services/loader.service';
import { RequesterService } from './services/requester.service';
import { ListsService } from './services/lists.service';
import { environment } from "src/environments/environment";
import { CaptionService } from "./services/captionService";
import { CommonService } from "./services/commonService";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy, OnChanges {

  activeLink: string;
  @ViewChild('sidenav') sidenav: MatSidenav;
  scrWidth: number;
  menuItemsList: any[] = [];
  private subscriptions: Subscription = new Subscription();
  show: boolean = true;
  fullScreen = this.loader.fullScreen;
  template = ``;
  isLoading: boolean;
  url: string = environment.mainUrl;
  secondpath: string = environment.imagesSecondPath;
  lang: string = null;
  menuIsSticky: boolean = true;
  isAuthenticated: boolean = false;
  userName: string = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public loader: LoaderService,
    private requester: RequesterService,
    public listWrapper: ListsService,
    public captions: CaptionService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) {

    this.show = true;

    if (!sessionStorage.language) {
      sessionStorage.setItem('language', JSON.stringify("BG"));
      this.commonService.languageSwitch.next(JSON.parse(sessionStorage.getItem('language')));

    } else {
      this.commonService.languageSwitch.next(JSON.parse(sessionStorage.getItem('language')));

    }

    this.getAllData();

  }

  ngOnInit() {

    if (localStorage.getItem("userId") && localStorage.getItem("token") && localStorage.getItem("expiration") && localStorage.getItem("user_name")) {
      this.authService.loggedIn.next(true);

      if (localStorage.getItem("expirationInSeconds")) {
        let expiration = localStorage.getItem("expirationInSeconds");
        const now = new Date();

        const expirationDate = new Date(
          now.getTime() + +expiration * 1000
        );

        localStorage.setItem("expiration", expirationDate.toISOString());
        this.authService.setAuthTimer(+expiration);

      }

      this.authService.user.token = localStorage.getItem("token");
      this.authService.user.userId = localStorage.getItem("userId");
      this.authService.user.user_name = localStorage.getItem("user_name");
      this.userName = this.authService.user.user_name;

    }

    this.lang = this.commonService.languageSwitch.value;
    this.show = true;
    this.getScreenSize();
    this.activeLink = this.getActiveLink();

    const routerEventsSubscription = this.router.events.subscribe((event: any) => {

      if (event instanceof NavigationEnd) {
        this.activeLink = this.getActiveLink();

      }

    });
    this.subscriptions.add(routerEventsSubscription);

    const methodSub = this.loader.methodsLoaded.subscribe(loaded => {

      if (loaded) {
        this.show = false;

      }

    });
    this.subscriptions.add(methodSub);

    const loadingSub = this.loader.isLoading.subscribe(loading => {

      this.isLoading = loading;

      if (loading) {
        this.spinner.show();

      } else {
        this.spinner.hide();

      }


    });
    this.subscriptions.add(loadingSub);

    const langSwitchSub = this.commonService.languageSwitch.subscribe(language => {
      this.lang = language;
    });
    this.subscriptions.add(langSwitchSub);

    const routeSub = this.router.events.subscribe(language => {

      let currentRoute = this.router.url.split('/')[1]

      if (currentRoute == 'Halls' || currentRoute == 'About%20Us') {
        this.menuIsSticky = false;

      } else {
        this.menuIsSticky = true;

      }

    });
    this.subscriptions.add(routeSub);

    const loggedInSubs = this.authService.loggedIn.subscribe(logged => {

      this.isAuthenticated = logged;

      if (this.isAuthenticated) {
        this.userName = this.authService.user.user_name;
        //console.log('userName: ', this.userName);
      }

    });
    this.subscriptions.add(loggedInSubs);

  }

  ngOnChanges() {
    this.getScreenSize();

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();

  }

  @HostListener('window:resize') getScreenSize(event?) {

    this.scrWidth = window.innerWidth;

  }

  //Methods REGION START
  getMenuItemsList() {

    let collection: string = 'menuItems';

    this.requester.get(collection).subscribe(
      (response: any) => {

        if (response) {
          this.menuItemsList = response.body.data;

        }

      }
    );

  }

  videoList() {

    let collection: string = 'video';

    this.requester.get(collection).subscribe(
      (response: any) => {

        if (response) {
          this.listWrapper.videoList.next(response.body.data);

        }

      }
    );

  }

  getRootServices(lang: 'EN' | 'BG') {
    this.requester.getRootServices("BG").subscribe((result: any) => {

      if (result) {
        this.listWrapper.rootServicesList.next(result.body.data);
        this.loader.show.next(false);
        this.loader.methodsLoaded.next(true);
        this.show = false;

      }

    });

  }

  //Methods REGION END

  getAllData() {

    this.show = true;

    forkJoin([
      this.switchLanguages(this.commonService.languageSwitch.value),
      this.getMenuItemsList(),
      this.videoList(),
    ]);

    this.loader.methodsLoaded.next(true);

  }

  getActiveLink = () => {

    if (this.activatedRoute.snapshot.firstChild) {
      return this.activatedRoute.snapshot.firstChild.routeConfig.path.split('/')[0];

    } else {
      return null

    }

  }

  clickHandler() {

    this.sidenav.close();

  }

  switchLanguages(lang: 'EN' | 'BG') {

    this.getRootServices(lang);

    this.requester.getCaptionServices(lang).subscribe((result: any) => {

      if (result) {
        this.captions.captionServiceList = result.body.data;
        this.loader.show.next(false);

      }

    });

  }

}
