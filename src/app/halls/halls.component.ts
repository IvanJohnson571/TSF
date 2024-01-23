import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { BeforeSlideDetail, SlideItemLoadDetail } from 'lightgallery/lg-events';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RequesterService } from '../services/requester.service';
import { LoaderService } from '../services/loader.service';
import { ListsService } from '../services/lists.service';
import { environment } from 'src/environments/environment';
import { CaptionService } from '../services/captionService';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { mimeType } from '../services/mime-type.validator';
import { NotificationService } from '../services/notification.service';
import { CommonService } from '../services/commonService';
import { WarningDialogComponent } from '../dialogs/warning-dialog/warning-dialog.component';

@Component({
  selector: 'app-halls',
  templateUrl: './halls.component.html',
  styleUrls: ['./halls.component.scss'],
})
export class HallsComponent implements OnInit, OnDestroy {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  galleryImagesTwo: NgxGalleryImage[];
  hallOne: boolean = false;
  hallTwo: boolean = false;
  scrWidth: number;
  galleryHeight: string = '400px';
  isLoading: boolean = false;
  subscriptions: Subscription = new Subscription();
  isAuthenticated: boolean = false;
  formHallOne: FormGroup;
  formHallTwo: FormGroup;
  imagePreviewHallOne: string;
  imagePreviewHallTwo: string;
  updateFirstHallText: boolean = false;
  updateSecondHallText: boolean = false;
  firstHall_Description: FormControl = new FormControl(null);
  secondHall_Description: FormControl = new FormControl(null);
  firstHallDescriptionText: string = null;
  secondHallDescriptionText: string = null;
  hallsData: any = null;

  constructor(
    private requester: RequesterService,
    public loader: LoaderService,
    public listWrapper: ListsService,
    public captions: CaptionService,
    private authService: AuthService,
    public notifications: NotificationService,
    private http: HttpClient,
    public dialog: MatDialog,
    private commonService: CommonService,
  ) {

    this.galleryOne();
    this.galleryTwo();
    this.getHallsData();

  }

  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;

  };

  onSlideItemLoad = (detail: SlideItemLoadDetail): void => {
    const { index, delay = 200, isFirstSlide } = detail;

  };

  ngOnInit() {

    this.scrWidth = window.innerWidth;

    const isLoadingSub = this.loader.isLoading.subscribe(loaded => {

      this.isLoading = loaded;

    });
    this.subscriptions.add(isLoadingSub);

    const loggedInSubs = this.authService.loggedIn.subscribe(logged => {

      this.isAuthenticated = logged;

    });
    this.subscriptions.add(loggedInSubs);

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        imageAnimation: NgxGalleryAnimation.Slide,
        thumbnails: false,
        lazyLoading: true,
        imageSwipe: true,
        thumbnailsSwipe: true,
        previewSwipe: true

      },

      {
        breakpoint: 800,
        width: '100%',
        height: '280px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
        imageSwipe: true,
        thumbnailsSwipe: true,
        previewSwipe: true

      },

      {
        breakpoint: 400,
        preview: true,
        imageSwipe: true,
        thumbnailsSwipe: true,
        previewSwipe: true

      }
    ];

    this.galleryHeightDefinition();

    this.formHallOne = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });

    this.formHallTwo = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });

  }

  ngOnDestroy() {

    this.subscriptions.unsubscribe();
    this.galleryImages = null;
    this.galleryImagesTwo = null;

  }

  galleryOne() {

    let collection: string = 'hallOne';

    this.requester.get(collection).subscribe(
      (response: any) => {

        if (response) {
          this.galleryImages = null;
          this.hallOne = true;
          this.galleryImages = response.body.data;
          this.transformImageUrl(this.galleryImages);

        }

      }
    );

  }

  galleryTwo() {

    let collection = 'hallTwo';

    this.requester.get(collection).subscribe(
      (response: any) => {

        if (response) {
          this.galleryImagesTwo = null;
          this.hallTwo = true;
          this.galleryImagesTwo = response.body.data;
          this.transformImageUrl(this.galleryImagesTwo);

        }

      }
    );

  }

  getHallsData() {

    let collection: string = 'halls';

    this.requester.get(collection).subscribe(
      (response: any) => {

        if (response.ok) {
          this.hallsData = response.body.data[0];

          if (this.commonService.languageSwitch.value == "BG") {
            this.firstHallDescriptionText = this.hallsData.hallOne[0].DescriptionBG;
            this.secondHallDescriptionText = this.hallsData.hallTwo[0].DescriptionBG;

          } else {
            this.firstHallDescriptionText = this.hallsData.hallOne[0].DescriptionEN;
            this.secondHallDescriptionText = this.hallsData.hallTwo[0].DescriptionEN;


          }

        }

      }
    );

  }

  transformImageUrl(galleryImages: NgxGalleryImage[]) {

    for (let i = 0; i < galleryImages.length; i++) {

      let primalImageBig = galleryImages[i].big;
      let primalImageMedium = galleryImages[i].medium;
      let primalImageSmall = galleryImages[i].small;

      galleryImages[i].big = environment.mainUrl + environment.imagesGalleryPath + primalImageBig;
      galleryImages[i].medium = environment.mainUrl + environment.imagesGalleryPath + primalImageMedium;
      galleryImages[i].small = environment.mainUrl + environment.imagesGalleryPath + primalImageSmall;

    }

  }

  @HostListener('window:resize') getScreenSize(event?) {

    this.scrWidth = window.innerWidth;

    this.galleryHeightDefinition();

  }

  galleryHeightDefinition() {

    if (this.scrWidth < 1200) {
      this.galleryOptions[0].height = '280px';
      this.galleryOptions[1].height = '280px';

    }
    if (this.scrWidth >= 1200) {
      this.galleryOptions[0].height = '400px';
      this.galleryOptions[1].height = '400px';

    }

  }

  onImagePicked(event: Event) {

    const file = (event.target as HTMLInputElement).files[0];
    this.formHallOne.patchValue({ image: file });
    this.formHallOne.get("image").updateValueAndValidity();
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreviewHallOne = reader.result as string;
    };
    reader.readAsDataURL(file);

  }

  onImagePickedHallTwo(event: Event) {

    const file = (event.target as HTMLInputElement).files[0];
    this.formHallTwo.patchValue({ image: file });
    this.formHallTwo.get("image").updateValueAndValidity();
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreviewHallTwo = reader.result as string;
    };
    reader.readAsDataURL(file);

  }

  removeImage(imageData, hallTarget: string) {

    let imageArr = imageData.big.split("/")
    let originalImageName: string = imageArr[imageArr.length - 1];
    imageData.originalImageName = originalImageName;

    const dialogRef = this.dialog.open(WarningDialogComponent, {
      autoFocus: false,
      data: {
        imageData,
        delete_target: hallTarget
      }
    })
    dialogRef.afterClosed().subscribe(result => {

      if (hallTarget == 'deleteImageHallTwo') {
        this.galleryTwo();

      }
      if (hallTarget == 'deleteImageHallOne') {
        this.galleryOne();

      }

    });

  }

  onSaveImage(hall: string) {

    let form: File;

    if (hall == 'HallOne') {
      form = this.formHallOne.value.image
    }
    if (hall == 'HallTwo') {
      form = this.formHallTwo.value.image;

    }

    this.addPicture(form, hall);

    this.formHallOne.reset();
    this.formHallTwo.reset();

  }

  addPicture(image: File, hall: string) {

    const postData = new FormData();
    postData.append("image", image);

    this.http.post<any>(environment.mainUrl + "api/update/addImage" + hall, postData).subscribe(
      (responseData: any) => {

        if (responseData) {
          if (hall == "HallOne") {
            this.galleryOne();

          } else if (hall == "HallTwo") {
            this.galleryTwo();
          }
          this.notifications.openSnackBarSuccess(this.captions.captionServiceList['PhotoAdded']);

        }

      }, error => {
        this.sendError(error);
        this.notifications.openSnackBarFailure(this.captions.captionServiceList['SomethingWentWrong']);

      }
    );
  }

  sendError(data) {

    this.http.post<any>(environment.mainUrl + "api/update/addError", data).subscribe(
      (response: any) => {

        //console.log('response: ', response);

      }, error => {
        //console.log('error: ', error);

      }
    );

  }

  cancel(hall: string) {

    if (hall == "hallOne") {
      this.imagePreviewHallOne = null;

    }
    if (hall == "hallTwo") {
      this.imagePreviewHallTwo = null;

    }

  }

  allowUpdateHallOneText(text) {

    this.updateFirstHallText = true;
    this.firstHall_Description.setValue(text);

  }

  allowUpdateHallTwoText(text) {

    this.updateSecondHallText = true;
    this.secondHall_Description.setValue(text);

  }

  saveHallOneDesc() {

    let apiName: string = "hallOneData";
    let DescriptionBG: string = null;
    let DescriptionEN: string = null;

    if (this.commonService.languageSwitch.value == "BG") {
      DescriptionBG = this.firstHall_Description.value;
      DescriptionEN = this.hallsData.hallOne[0].DescriptionEN;

    } else {
      DescriptionEN = this.firstHall_Description.value;
      DescriptionBG = this.hallsData.hallOne[0].DescriptionBG;

    }

    let data = {
      id: this.hallsData._id,
      lang: this.commonService.languageSwitch.value,
      hallOne: [
        {
          DescriptionBG: DescriptionBG,
          DescriptionEN: DescriptionEN
        }
      ]
    }

    this.http
      .post<{ token: string; expiresIn: number; userId: string; user_name: string }>(
        environment.mainUrl + "api/update/" + apiName, data
      )
      .subscribe(
        (response: any) => {

          if (response.changed) {
            this.notifications.openSnackBarSuccess(this.captions.captionServiceList['ChangesSuccessfully']);
            this.updateFirstHallText = false;
            this.getHallsData();

          }


        }, error => {
          this.notifications.openSnackBarFailure(this.captions.captionServiceList['SomethingWentWrong']);

        }
      )

  }

  saveHallTwoDesc() {

    let apiName: string = "hallTwoData";
    let DescriptionBG: string = null;
    let DescriptionEN: string = null;

    if (this.commonService.languageSwitch.value == "BG") {
      DescriptionBG = this.secondHall_Description.value;
      DescriptionEN = this.hallsData.hallTwo[0].DescriptionEN;

    } else {
      DescriptionEN = this.secondHall_Description.value;
      DescriptionBG = this.hallsData.hallTwo[0].DescriptionBG;

    }

    let data = {
      id: this.hallsData._id,
      lang: this.commonService.languageSwitch.value,
      hallTwo: [
        {
          DescriptionBG: DescriptionBG,
          DescriptionEN: DescriptionEN
        }
      ]
    }

    this.http
      .post<{ token: string; expiresIn: number; userId: string; user_name: string }>(
        environment.mainUrl + "api/update/" + apiName, data
      )
      .subscribe(
        (response: any) => {

          if (response.changed) {
            this.notifications.openSnackBarSuccess(this.captions.captionServiceList['ChangesSuccessfully']);
            this.updateSecondHallText = false;
            this.getHallsData();

          }


        }, error => {
          this.notifications.openSnackBarFailure(this.captions.captionServiceList['SomethingWentWrong']);

        }
      )

  }

}
