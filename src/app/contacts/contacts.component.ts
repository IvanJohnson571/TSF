import { Component, OnInit, AfterViewInit, HostListener, ViewChild, ElementRef, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SearchCountryField, CountryISO } from "ngx-intl-tel-input";
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ReCaptcha2Component } from 'ngx-captcha';
import { Subscription } from 'rxjs';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

import { SuccessEmailComponent } from '../dialogs/success-email/success-email.component';
import { ErrorMessageComponent } from '../dialogs/error-message/error-message.component';
import { RequesterService } from '../services/requester.service';
import { LoaderService } from '../services/loader.service';
import { IconsService } from '../services/icons.service';
import { EmailResponse } from '../models/common';
import { CaptionService } from '../services/captionService';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonService } from '../services/commonService';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  @ViewChild('langInput') langInput: ElementRef;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Bulgaria];
  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;
  latitude = 42.424186752475826;
  longitude = 25.629136254294522;
  iconsLoaded: boolean = false;
  subscription: Subscription = new Subscription;
  scrWidth: number;
  formGroup: FormGroup;
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'en';
  public theme: 'light' | 'dark' = 'light';
  public type: 'image' | 'audio';
  emailValidator: string = "^\\w+([-+.]\\w+)*@[A-Za-z0-9]+([- A-Za-z0-9]+)*(\\.([A-Za-z]+)){1,}$";
  token: string | undefined;
  separateDialCode: boolean = true;
  customPlaceholder: string = '888 123 456';
  dotsImage: string = environment.mainUrl + 'images/icons/dot.png';
  subscriptions: Subscription = new Subscription();
  isLoading: boolean = false;
  contactPhone: string = null;
  mailContact: string = null;
  loading = false;
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  mapZoom = 18;
  mapCenter: google.maps.LatLng;
  isAuthenticated: boolean = false;
  updateMode: boolean = false;
  address: string = null;
  updatePhone: boolean = false;
  updateMail: boolean = false;
  updateContactTextandMapData: boolean = false;
  contactText: string = null;
  textMap: string = "textMap";

  location_data: FormControl = new FormControl(null);
  phone_data: FormControl = new FormControl(null);
  mail_data: FormControl = new FormControl(null);
  queryFormControl: FormControl = new FormControl(null);
  latitude_form: FormControl = new FormControl(null);
  longitude_form: FormControl = new FormControl(null);
  contactsData: any = null;

  mapOptions: google.maps.MapOptions = {
    center: {
      lat: 42.424186752475826,
      lng: 25.629136254294522
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    streetViewControl: true,
    maxZoom: 20,
    minZoom: 4,
  };

  markerInfoContent = '';
  markerOptions: google.maps.MarkerOptions = {
    draggable: true,
    animation: google.maps.Animation.DROP,
  };

  constructor(
    private iconService: IconsService,
    private formBuilder: FormBuilder,
    private requester: RequesterService,
    public loader: LoaderService,
    public dialog: MatDialog,
    public captions: CaptionService,
    private authService: AuthService,
    private router: Router,
    private commonService: CommonService,
    private http: HttpClient,
    public notifications: NotificationService

  ) {

    this.formGroup = this.formBuilder.group({
      'name': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.pattern(this.emailValidator)]),
      'subject': new FormControl(null),
      'message': new FormControl(null, Validators.required),
      'captcha': new FormControl(null, Validators.required),
    });

    this.getContactsData();

    this.token = undefined;

    const loggedInSubs = this.authService.loggedIn.subscribe(logged => {

      this.isAuthenticated = logged;

    });
    this.subscriptions.add(loggedInSubs);

  }

  openInfoWindow(marker: MapMarker) {
    // this is called when the marker is clicked.
    this.infoWindow.open(marker);
  }

  getCurrentLocation() {
    // this method gets the current location and updates the map.
  }

  ngOnInit() {

    this.scrWidth = window.innerWidth;
    this.iconService.registerSvgIcons();

    const iconSub = this.iconService.iconsLoaded.subscribe(
      loaded => {
        if (loaded) {
          this.iconsLoaded = loaded;

        }

      })
    this.subscription.add(iconSub);

    const isLoadingSub = this.loader.isLoading.subscribe(loaded => {

      this.isLoading = loaded;

    });
    this.subscriptions.add(isLoadingSub);

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ngAfterViewInit() {
    this.iconService.registerSvgIcons();

  }

  onChoseLocation(event) {

  }

  navigateGoogleMaps() {

    window.open('https://www.google.com/maps/place/%D1%83%D0%BB.+%E2%80%9E%D0%94%D0%B8%D0%BC%D0%B8%D1%82%D1%8A%D1%80+%D0%9D%D0%B0%D1%83%D0%BC%D0%BE%D0%B2%E2%80%9C+43,+6000+%D0%A1%D1%82%D0%B0%D1%80%D0%B0+%D0%97%D0%B0%D0%B3%D0%BE%D1%80%D0%B0+%D0%A6%D0%B5%D0%BD%D1%82%D1%8A%D1%80,+%D0%A1%D1%82%D0%B0%D1%80%D0%B0+%D0%97%D0%B0%D0%B3%D0%BE%D1%80%D0%B0/@42.4240036,25.6262531,17z/data=!3m1!4b1!4m6!3m5!1s0x40a8699c35e4a0ad:0xfcd4c77919db7ff8!8m2!3d42.4239997!4d25.628828!16s%2Fg%2F11csp45gp0?hl=bg-BG&entry=ttu', '_blank');

  }

  @HostListener('window:resize') getScreenSize(event?) {

    this.scrWidth = window.innerWidth;

  }

  onScroll(ev) {

    //console.log(ev);

  }

  getContactsData() {

    this.commonService.languageSwitch.value
    let collection: string = 'contactsData';

    this.requester.get(collection).subscribe(
      (response: any) => {

        if (response) {
          this.contactsData = response.body.data[0];

          if (this.commonService.languageSwitch.value == "BG") {
            this.address = this.contactsData.locationStringBG;
            this.contactText = this.contactsData.contactString["BG"];

          } else {
            this.address = this.contactsData.locationString['EN'];
            this.contactText = this.contactsData.contactString["EN"];

          }

          this.contactPhone = this.contactsData.phone;
          this.mailContact = this.contactsData.email;
          this.mapOptions.center.lat = +this.contactsData.mapData["lat"];
          this.mapOptions.center.lng = +this.contactsData.mapData["lng"];

        }

      }
    );

  }

  sendEmail() {

    if (this.formGroup.valid) {

      let params = {
        name: this.formGroup.controls['name'].value,
        phone: this.formGroup.controls['phone'].value,
        email: this.formGroup.controls['email'].value,
        subject: this.formGroup.controls['subject'].value,
        message: this.formGroup.controls['message'].value,
      }

      this.requester.sendMail(params).subscribe(
        (response: HttpResponse<EmailResponse>) => {

          if (response.body.success) {

            this.formGroup.reset();

            const dialogRef = this.dialog.open(SuccessEmailComponent, {
              width: '35rem',
              autoFocus: false,
              data: {}
            })
            dialogRef.afterClosed().subscribe(result => {

            });

            this.loader.show.next(false);

          }

        },
        (error: any) => {

          this.formGroup.reset();

          const dialogRef = this.dialog.open(ErrorMessageComponent, {
            width: '35rem',
            autoFocus: false,
            data: {}
          })
          dialogRef.afterClosed().subscribe(result => {

          });

          this.loader.show.next(false);

        })

    }

  }

  changeLocation(text) {
    this.updateMode = true;
    this.location_data.setValue(text);

  }

  changePhone(text) {
    this.updatePhone = true;
    this.phone_data.setValue(text);

  }

  closeUpdate() {
    this.updateMode = false;

  }

  closeUpdatePhone() {
    this.updatePhone = false;

  }

  closeUpdateMail() {
    this.updateMail = false;

  }

  save(type?: string) {

    let apiName: string = null;
    let data = null;

    if (type == this.captions.captionServiceList['Location']) {
      this.updateMode = false;
      apiName = "address";
      data = this.location_data.value;

    }
    if (type == this.captions.captionServiceList['Telephone']) {
      this.updatePhone = false;
      apiName = "telephone";
      data = this.phone_data.value;

    }

    if (type == this.captions.captionServiceList['Email']) {
      this.updateMail = false;
      apiName = "mail";
      data = this.mail_data.value;

    }

    if (type == this.textMap) {
      this.updateContactTextandMapData = false;
      apiName = "textMap";

      data = {
        contactString: {
          BG: null,
          EN: null
        },
        mapData: {
          lat: this.latitude_form.value,
          lng: this.longitude_form.value
        }
      }

      if (this.commonService.languageSwitch.value == "BG") {
        data.contactString.BG = this.queryFormControl.value;
        data.contactString.EN = this.contactsData.contactString["EN"];

      }

      if (this.commonService.languageSwitch.value == "EN") {
        data.contactString.EN = this.queryFormControl.value;
        data.contactString.BG = this.contactsData.contactString["BG"];

      }

    }

    let authData = {
      lang: this.commonService.languageSwitch.value,
      updatedAddress: data,
      id: this.contactsData.id
    }

    this.http
      .post<{ token: string; expiresIn: number; userId: string; user_name: string }>(
        environment.mainUrl + "api/update/" + apiName, authData
      )
      .subscribe(
        (response: any) => {

          if (response.changed) {
            this.getContactsData();
            this.notifications.openSnackBarSuccess(this.captions.captionServiceList['DataHasBeenChanged']);

          }


        }, error => {
          this.notifications.openSnackBarFailure(this.captions.captionServiceList['SomethingWentWrong']);

        }
      )

    this.router.navigate(["/Contacts"]);

  }

  changeEmail(text: string) {
    this.updateMail = true;
    this.mail_data.setValue(text);

  }

  closeUpdateQueryandMap() {
    this.updateContactTextandMapData = false;

  }

  changeMapLocation(text) {
    this.updateContactTextandMapData = true;
    this.queryFormControl.setValue(text);
    this.latitude_form.setValue(this.contactsData.mapData["lat"]);
    this.longitude_form.setValue(this.contactsData.mapData["lng"]);

  }

  goToFB() {

    window.open('https://www.facebook.com/profile.php?id=100066747517811', '_blank');

  }

}
