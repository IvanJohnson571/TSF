import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RootComponent } from "./root/root.component";
import { HallsComponent } from "./halls/halls.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { AboutComponent } from "./about/about.component";
import { AudioVideoComponent } from './audio-video/audio-video.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminLoginComponent } from "./admin-login/admin-login.component";

const routes: Routes = [
  { path: 'Main', component: RootComponent },
  { path: '', component: RootComponent },
  { path: 'Halls', component: HallsComponent },
  { path: 'Contacts', component: ContactsComponent },
  { path: 'About Us', component: AboutComponent },
  { path: 'Media', component: AudioVideoComponent },
  { path: 'Admin-LogIn', component: AdminLoginComponent },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
