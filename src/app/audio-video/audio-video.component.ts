import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { RequesterService } from '../services/requester.service';
import { AudioDataModel, AudioDataResponse, videoListModel } from '../models/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { CaptionService } from '../services/captionService';
import { ListsService } from '../services/lists.service';
import { Subscription } from 'rxjs';
import { CommonService } from '../services/commonService';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audio-video',
  templateUrl: './audio-video.component.html',
  styleUrls: ['./audio-video.component.scss']
})
export class AudioVideoComponent implements OnInit, OnDestroy {

  height: number = 250;
  width: number = 500;
  audioList: AudioDataModel[] = [];
  audioListLoaded: boolean = false;
  audioWidth: string = '500px';
  audioHeight: string = '150px';
  backAudioColor: string = '#f15d16';
  backAudioColorBl: string = '#000000';
  windowWidth: number = window.innerWidth;
  videoList: videoListModel[] = [];
  subscription: Subscription = new Subscription;
  language: string = 'BG';
  dotsImage: string = environment.mainUrl + 'images/icons/dot.png';
  videoIDImage: string = environment.mainUrl + 'images/videoID.png';
  isAuthenticated: boolean = false;
  addVideoForm: FormGroup;

  constructor(
    private requester: RequesterService,
    public loader: LoaderService,
    public captions: CaptionService,
    private lists: ListsService,
    private commonSerice: CommonService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public notifications: NotificationService,
    private router: Router,
  ) {

    this.addVideoForm = this.formBuilder.group({
      'nameBG': new FormControl(null, Validators.required),
      'nameEN': new FormControl(null, Validators.required),
      'videoID': new FormControl(null, Validators.required),
    });

  }

  ngOnInit(): void {

    this.windowWidth = window.innerWidth;
    //this.getAudioData();
    this.getVideoList();

    if (this.windowWidth <= this.width) {
      this.width = window.innerWidth;
    }

    const videoSub = this.lists.videoList.subscribe(
      data => {
        if (data) {
          this.videoList = data;

        }

      })
    this.subscription.add(videoSub);

    const langSub = this.commonSerice.languageSwitch.subscribe(
      language => {
        if (language) {
          this.language = language;

        }

      })
    this.subscription.add(langSub);

    const loggedInSubs = this.authService.loggedIn.subscribe(logged => {

      this.isAuthenticated = logged;

    });
    this.subscription.add(loggedInSubs);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

  @HostListener('window:resize') getScreenSize(event?) {

    this.windowWidth = window.innerWidth;

    if (window.innerWidth < 1200) {
      this.height = 200;
      this.width = 400;

    }

    if (window.innerWidth >= 1200) {
      this.height = 250;
      this.width = 500;

    }

    if (this.windowWidth <= this.width) {
      this.width = window.innerWidth;
    }

    let audioWidthToNumber: number = +this.audioWidth;

    if (this.windowWidth <= audioWidthToNumber) {

      this.audioWidth = this.windowWidth.toString();

    }

  }

  getAudioData() {

    this.requester.getAudioData().subscribe(

      (response: HttpResponse<AudioDataResponse>) => {

        if (response.body.success) {
          this.audioList = response.body.data;
          this.audioListLoaded = true;
          this.loader.show.next(false);

        }

      });

  }

  addVideo() {

    let data = {
      nameBG: this.addVideoForm.get("nameBG").value,
      videoId: this.addVideoForm.get("videoID").value,
      nameEN: this.addVideoForm.get("nameEN").value,
    }

    this.http
      .post<any>(
        environment.mainUrl + "api/update/addVideo", data
      )
      .subscribe(
        (response: any) => {

          if (response.changed) {
            this.addVideoForm.reset();
            this.addVideoForm.markAllAsTouched();
            this.addVideoForm.markAsPristine();
            this.getVideoList();
            this.notifications.openSnackBarSuccess(this.captions.captionServiceList['VideoAddedSuccessfully']);

          }


        }, error => {
          this.notifications.openSnackBarFailure(this.captions.captionServiceList['SomethingWentWrong']);

        })

  }

  getVideoList() {

    let collection: string = 'video';

    this.requester.get(collection).subscribe(
      (response: any) => {

        if (response) {
          this.videoList = response.body.data;

        }

      }

    );

  }

  removeVideo(video: videoListModel) {

    let data = {
      nameBG: video.nameBG,
      videoId: video.videoId,
      nameEN: video.nameEN,
    }

    this.http.post<any>(environment.mainUrl + "api/update/deleteVideo", data)
      .subscribe(
        (response: any) => {

          if (response.changed) {
            this.getVideoList();
            this.notifications.openSnackBarSuccess(this.captions.captionServiceList['VideoDeleted']);

          }

        }, error => {
          this.notifications.openSnackBarFailure(this.captions.captionServiceList['SomethingWentWrong']);

        })

  }

}
