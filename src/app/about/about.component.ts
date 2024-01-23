import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CaptionService } from '../services/captionService';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { ListsService } from '../services/lists.service';
import { Subscription } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mimeType } from '../services/mime-type.validator';
import { NotificationService } from '../services/notification.service';
import { RequesterService } from '../services/requester.service';
import { AudioListModel } from '../models/common';
import { MatDialog } from '@angular/material/dialog';
import { WarningDialogComponent } from '../dialogs/warning-dialog/warning-dialog.component';
import { CommonService } from '../services/commonService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

  mainUrl = environment.mainUrl;
  backImage = "background-image: url(" + this.mainUrl + "images/Backs/juno.jpg);";
  scrWidth: number;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  subscription: Subscription = new Subscription();
  junoImage: string = environment.mainUrl + "images/Backs/juno.jpg";
  dotsImage: string = environment.mainUrl + 'images/icons/dot.png';
  subscriptions: Subscription = new Subscription();
  isLoading: boolean = false;
  isAuthenticated: boolean = false;
  public files: any[];
  form: FormGroup;
  imagePreview: string;
  updateMode: boolean = false;
  about_Description: FormControl = new FormControl(null);
  aboutDataList: any = null;
  aboutText: string = null;

  constructor(
    public captions: CaptionService,
    public listWrapper: ListsService,
    public loader: LoaderService,
    private authService: AuthService,
    private http: HttpClient,
    private notifications: NotificationService,
    private requester: RequesterService,
    public dialog: MatDialog,
    public commonService: CommonService,
    private router: Router,
  ) {

    this.files = [];
    this.getAboutGallery();
    this.getAboutData();

  }

  ngOnInit() {

    this.scrWidth = window.innerWidth;

    const isLoadingSub = this.loader.isLoading.subscribe(loaded => {

      this.isLoading = loaded;

    });
    this.subscriptions.add(isLoadingSub);

    const loggedInSubs = this.authService.loggedIn.subscribe(logged => {

      this.isAuthenticated = logged;

    });
    this.subscription.add(loggedInSubs);

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

    const listLoaded = this.listWrapper.aboutList.subscribe(results => {

      if (results) {
        this.galleryImages = results;
        this.transformImageUrl(this.galleryImages);

      }

    })
    this.subscription.add(listLoaded);

    this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });

  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();

  }

  transformImageUrl(galleryImages: NgxGalleryImage[]) {

    for (let i = 0; i < galleryImages.length; i++) {

      let primalImageBig = galleryImages[i].big;
      let primalImageMedium = galleryImages[i].medium;
      let primalImageSmall = galleryImages[i].small;

      galleryImages[i].big = environment.mainUrl + "images/about/" + primalImageBig;
      galleryImages[i].medium = environment.mainUrl + "images/about/" + primalImageMedium;
      galleryImages[i].small = environment.mainUrl + "images/about/" + primalImageSmall;

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

  removeImage(imageData: any) {

    let imageArr = imageData.big.split("/")
    let originalImageName: string = imageArr[imageArr.length - 1];
    imageData.originalImageName = originalImageName;

    const dialogRef = this.dialog.open(WarningDialogComponent, {
      autoFocus: false,
      data: {
        imageData,
        delete_target: "deleteImage"
      }
    })
    dialogRef.afterClosed().subscribe(result => {

      this.getAboutGallery();

    });

  }

  onImagePicked(event: Event) {

    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }

  onSaveImage() {

    this.addPicture(
      this.form.value.image
    );

    this.form.reset();

  }

  addPicture(image: File) {

    const postData = new FormData();
    postData.append("image", image);

    this.http.post<any>(environment.mainUrl + "api/update/addImage", postData).subscribe(
      (responseData: any) => {

        if (responseData) {
          this.getAboutGallery();
          this.notifications.openSnackBarSuccess(this.captions.captionServiceList['PhotoAdded']);

        }

      }, error => {
        this.notifications.openSnackBarFailure(this.captions.captionServiceList['SomethingWentWrong']);

      }
    );
  }

  getAboutGallery() {

    let collection = 'aboutImages'

    this.requester.get(collection).subscribe(
      (response: any) => {

        if (response) {
          this.listWrapper.aboutList.next(response.body.data);
          this.galleryImages = response.body.data;

        }

      }
    );

  }

  cancel() {

    this.imagePreview = "";

  }

  getAboutData() {

    let collection: string = 'aboutDescription';

    this.requester.get(collection).subscribe(
      (response: any) => {

        if (response.body.success) {
          this.aboutDataList = response.body.data[0];

          if (this.commonService.languageSwitch.value == "BG") {
            this.aboutText = this.aboutDataList.aboutDesc['BG'];

          } else {
            this.aboutText = this.aboutDataList.aboutDesc['EN'];

          }

        }

      }
    );

  }

  allowUpdate(aboutText: string) {

    this.updateMode = true;
    this.about_Description.setValue(aboutText);

  }

  save() {

    let apiName: string = "aboutDescription";
    let bgText: string = null;
    let enText: string = null;

    if (this.commonService.languageSwitch.value == "BG") {
      bgText = this.about_Description.value;
      enText = this.aboutDataList.aboutDesc['EN'];

    } else {
      enText = this.about_Description.value;
      bgText = this.aboutDataList.aboutDesc['BG'];

    }

    let data = {
      _id: this.aboutDataList._id,
      aboutDesc: {

        BG: bgText,
        EN: enText

      }
    }

    this.http
      .post<{ token: string; expiresIn: number; userId: string; user_name: string }>(
        environment.mainUrl + "api/update/" + apiName, data
      )
      .subscribe(
        (response: any) => {

          if (response.changed) {
            this.notifications.openSnackBarSuccess(this.captions.captionServiceList['ChangesSuccessfully']);
            this.updateMode = false;
            this.getAboutData();

          }


        }, error => {
          this.notifications.openSnackBarFailure(this.captions.captionServiceList['SomethingWentWrong']);

        }
      )

    this.router.navigate(["/About Us"]);

  }

}
