import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessEmailComponent } from './success-email.component';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { CloseModule } from 'src/app/services/icons-temp/close/close.module';
import { CloseComponent } from 'src/app/services/icons-temp/close/close.component';


@NgModule({
    declarations: [
        SuccessEmailComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CloseComponent
    ]
})
export class SuccessEmailModule {}