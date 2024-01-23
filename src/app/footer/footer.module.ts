import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { SharedModule } from '../shared-module/shared.module';
import { FacebookModule } from '../services/icons-temp/facebook/facebook.module';

@NgModule({
    declarations: [
        FooterComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FacebookModule,
    ],
    exports: [
        FooterComponent
    ]
})
export class FooterModule {}