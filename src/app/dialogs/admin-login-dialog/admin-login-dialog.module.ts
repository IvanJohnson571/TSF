import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginDialogComponent } from './admin-login-dialog.component';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminLoginDialogComponent
  ],
  imports: [
    CommonModule,
    //SharedModule,
    //ReactiveFormsModule
  ],
  exports: [
    //FormsModule,
    //ReactiveFormsModule
  ]
})
export class AdminLoginDialogModule { }
