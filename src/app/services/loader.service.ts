import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  show = new BehaviorSubject<boolean>(false);
  methodsLoaded = new BehaviorSubject<boolean>(false);
  fullScreen = true;
  template = ``;
  private loaderIgnoredUrlPartList: any[] = [];
  public isLoading = new BehaviorSubject(false);

  constructor() { }



  onClickDefault() {

    this.fullScreen = true;
    this.template = ``

  }

  isLoadingIgnoredUrl(url) {

    if (this.loaderIgnoredUrlPartList.some(part => url.includes(part))) {
      return true;

    }

    return false;

  }

  stopLoading(requests: any[]) {

    if (requests.length === 0) {
      this.isLoading.next(false);

    }

  }

  startLoading() {

    this.isLoading.next(true);
    
  }

}
