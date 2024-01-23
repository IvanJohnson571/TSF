import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacebookComponent } from './facebook.component';
import { SharedModule } from 'src/app/shared-module/shared.module';

@NgModule({
    declarations: [
        FacebookComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        FacebookComponent
    ]
})
export class FacebookModule {}