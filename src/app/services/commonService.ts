import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

    languageSwitch = new BehaviorSubject<"EN" | "BG">("BG");
    emailValidator: string = "^\\w+([-+.]\\w+)*@[A-Za-z0-9]+([- A-Za-z0-9]+)*(\\.([A-Za-z]+)){1,}$";

  constructor() { }

}