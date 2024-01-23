import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { CloseComponent } from './close.component';

@NgModule({
    declarations: [
        CloseComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        CloseComponent
    ]
})
export class CloseModule {}