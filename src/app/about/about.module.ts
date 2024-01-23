import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { AboutComponent } from './about.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

@NgModule({
    declarations: [
        AboutComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        NgxGalleryModule
    ],
    exports: [
        
    ]
})
export class AboutModule {}