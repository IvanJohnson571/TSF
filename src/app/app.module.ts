import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "./shared-module/shared.module";
import { MatTabsModule } from '@angular/material/tabs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
//import { AgmCoreModule } from '@agm/core';
import { LightgalleryModule } from 'lightgallery/angular/13';
import { NgxLoaderModule } from '@tusharghoshbd/ngx-loader';
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "./app-routing.module";
import { RootComponent } from './root/root.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MapComponent } from './services/icons-temp/map/map.component';
import { SuccessEmailComponent } from './dialogs/success-email/success-email.component';
import { ErrorMessageComponent } from './dialogs/error-message/error-message.component';
import { environment } from '../environments/environment';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { RequestCountHttpInterceptor } from './services/loader.interceptor';
import { PartyComponent } from './services/icons-temp/party/party.component';
import { HallsModule } from "./halls/halls.module";
import { FooterModule } from "./footer/footer.module";
import { ContactsModule } from "./contacts/contacts.module";
import { AboutModule } from "./about/about.module";
import { NgxLoadingModule } from "ngx-loading";
import { NgxSpinnerModule } from "ngx-spinner";
import { AdminLoginDialogComponent } from "./dialogs/admin-login-dialog/admin-login-dialog.component";
import { AudioVideoModule } from "./audio-video/audio-video.module";
import { WarningDialogComponent } from './dialogs/warning-dialog/warning-dialog.component';
import { CreateNewProfileDialogComponent } from './dialogs/create-new-profile-dialog/create-new-profile-dialog.component';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RootComponent,
    MapComponent,
    SuccessEmailComponent,
    ErrorMessageComponent,
    AdminLoginDialogComponent,
    PageNotFoundComponent,
    PartyComponent,
    WarningDialogComponent,
    CreateNewProfileDialogComponent,
    AdminLoginComponent,
  ],
  imports: [
    HallsModule,
    FooterModule,
    ContactsModule,
    AudioVideoModule,
    AboutModule,
    NgxSpinnerModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    NgHcaptchaModule.forRoot({
      siteKey: environment.hcaptcha.siteKey,
      //languageCode: environment.hcaptcha.languageCode // optional, will default to browser language
    }),
    NgxLoadingModule.forRoot({}),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatTabsModule,
    NgxGalleryModule,
    MatDatepickerModule,
    MatNativeDateModule,
    LightgalleryModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestCountHttpInterceptor,
      multi: true,
    },
    { provide: 'environment', useValue: environment },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
