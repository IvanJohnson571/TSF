import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HallsComponent } from './halls.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { SharedModule } from 'src/app/shared-module/shared.module';

@NgModule({
  declarations: [
    HallsComponent
  ],
  imports: [
    CommonModule,
    NgxGalleryModule,
    SharedModule,
  ]
})
export class HallsModule { }
