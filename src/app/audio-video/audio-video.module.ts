import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { AudioVideoComponent } from './audio-video.component';
import { YouTubePlayerModule } from "@angular/youtube-player";

@NgModule({
  declarations: [
    AudioVideoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    YouTubePlayerModule
  ],
  exports: [

  ]
})
export class AudioVideoModule { }
