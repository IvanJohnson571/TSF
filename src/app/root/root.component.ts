import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { LoaderService } from '../services/loader.service';
import { Subscription } from 'rxjs';
import { RequesterService } from '../services/requester.service';
import { ListsService } from '../services/lists.service';
import { environment } from 'src/environments/environment';
import { CaptionService } from '../services/captionService';
import { CommonService } from '../services/commonService';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit, OnDestroy {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  galleryImagesTwo: NgxGalleryImage[];
  scrHeight: number = window.innerHeight - 400;
  scrWidth: number;
  show: boolean = this.loader.show.getValue();
  subscriptions: Subscription = new Subscription();
  fullScreen = true;
  template = ``;
  rootServicesList: any[];
  url: string = environment.mainUrl;
  secondpath: string = environment.imagesSecondPath;
  bgFlag: string = this.url + "images/Flags/bulgaria-round.png"; // To be added through the DB!!!
  enFlag: string = this.url + "images/Flags/united-kingdom.png"; // To be added through the DB!!!
  urlMic = this.url + 'images/Backs/mic.jpg';
  isLoading: boolean = false;

  constructor(
    public loader: LoaderService,
    private requester: RequesterService,
    public listsWrapper: ListsService,
    public captions: CaptionService,
    private commonService: CommonService
  ) { }

  ngOnInit() {

    this.scrHeight = window.innerHeight - 400;
    this.scrWidth = window.innerWidth;

    const methodsLoadedSub = this.loader.methodsLoaded.subscribe(loaded => {

      this.show = loaded;

    });
    this.subscriptions.add(methodsLoadedSub);

    const isLoadingSub = this.loader.isLoading.subscribe(loaded => {

      this.isLoading = loaded;

    });
    this.subscriptions.add(isLoadingSub);

    const rootServicesListSub = this.listsWrapper.rootServicesList.subscribe(results => {

      if (results) {
        this.rootServicesList = results;

      }

    });
    this.subscriptions.add(rootServicesListSub);

    if (!sessionStorage.language) {
      sessionStorage.setItem('language', JSON.stringify("BG"));
      this.commonService.languageSwitch.next(JSON.parse(sessionStorage.getItem('language')));

    } else {
      this.commonService.languageSwitch.next(JSON.parse(sessionStorage.getItem('language')));

    }

    this.getRootServices(this.commonService.languageSwitch.value);

  }

  ngOnDestroy() {

    this.subscriptions.unsubscribe();

  }

  @HostListener('window:resize') getScreenSize(event?) {

    this.scrHeight = window.innerHeight - 400;
    this.scrWidth = window.innerWidth;

  }

  getRootServices(lang: "EN" | "BG") {

    this.requester.getRootServices(lang).subscribe((result: any) => {

      if (result) {
        this.rootServicesList = result.body.data;
        this.listsWrapper.rootServicesList.next(result.body.data);
        this.loader.show.next(false);

      }

    });

  }

  switchLanguages(lang: 'EN' | 'BG') {

    environment.hcaptcha.languageCode = lang.toLowerCase();
    this.getRootServices(lang);
    sessionStorage.setItem('language', JSON.stringify(lang));
    this.commonService.languageSwitch.next(JSON.parse(sessionStorage.getItem('language')));

    this.requester.getCaptionServices(lang).subscribe((result: any) => {

      if (result) {
        this.captions.captionServiceList = result.body.data;
        this.loader.show.next(false);

      }

    });

  }

}
