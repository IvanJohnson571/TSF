import { Component, OnDestroy, OnInit, ViewChild, HostListener, OnChanges } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";
import { MatSidenav } from '@angular/material/sidenav';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, OnChanges  {

  activeLink: string;
  @ViewChild('sidenav') sidenav: MatSidenav;
  scrWidth: number;
  private subscriptions: Subscription = new Subscription();
  logo: string = environment.mainUrl + 'images/icons/logo.png';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  @HostListener('window:resize') getScreenSize(event?) {

    this.scrWidth = window.innerWidth;

  }

  ngOnChanges() {
    this.getScreenSize();
  }

  ngOnInit() {
    this.getScreenSize();

    this.activeLink = this.getActiveLink();


    const routerEventsSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.activeLink = this.getActiveLink();

      }
    });
    this.subscriptions.add(routerEventsSubscription);

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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

  showMenu() {
    let width = window.innerWidth;
  }

}
