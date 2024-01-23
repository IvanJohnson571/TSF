import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class IconsService {

  iconsLoaded = new BehaviorSubject<boolean>(false);

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) { }

  registerSvgIcons() {
    
    //this.addSvgIcon('map');
    //this.addSvgIcon('microphone');

    this.iconsLoaded.next(true);

  }

  isNullOrUndefined(value: any) {
    return value === undefined || value === null;
  }

  addSvgIcon(icon: string, viewBox: string = '0 0 1000 1000', altName: string = null) {

    this.matIconRegistry.addSvgIcon(
      this.isNullOrUndefined(altName) ? icon : altName,
      this.domSanitizer.bypassSecurityTrustResourceUrl(environment.iconsPath + icon + '.svg'),
      { viewBox: viewBox }
    );

  }

}
