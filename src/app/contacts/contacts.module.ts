import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { ContactsComponent } from './contacts.component';
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
    declarations: [
        ContactsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        NgHcaptchaModule,
        GoogleMapsModule

    ],
    exports: [

    ]
})
export class ContactsModule {}