import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  galleryOneList = new BehaviorSubject<any>(null);
  galleryTwoList = new BehaviorSubject<any>(null);
  rootServicesList = new BehaviorSubject<any>(null);
  videoList = new BehaviorSubject<any>(null);
  aboutList = new BehaviorSubject<any>(null);
  
  constructor() { }
}
