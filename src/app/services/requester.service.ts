import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';
import { NotificationService } from './notification.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true
};

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class RequesterService {

  constructor(
    private http: HttpClient,
    public loader: LoaderService,
    public notifications: NotificationService
  ) { }

  showError(response) {

    if (response.status == 401) {
      window.location.href = '/login';
      return;
    }

  }

  public getGallery() {
    this.loader.show.next(true);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
    });

    headers = null;

    return this.http.get(environment.mainUrl + "api/hallOne",
      {
        headers: headers,
        observe: 'response',
        withCredentials: false
      });

  }

  public get(collection: string) {

    this.loader.show.next(true);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    });

    headers = null;

    return this.http.get(environment.mainUrl + "api/" + collection,
      {
        headers: headers,
        observe: 'response',
        withCredentials: false
      });

  }

  public getAudioData() {
    this.loader.show.next(true);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
    });

    headers = null;

    return this.http.get(environment.mainUrl + "api/audio",
      {
        headers: headers,
        observe: 'response',
        withCredentials: false
      });

  }

  public getGalleryTwo() {
    this.loader.show.next(true);

    let headers = null;

    return this.http.get(environment.mainUrl + "api/hallTwo",
      {
        headers: headers,
        observe: 'response',
        withCredentials: false
      });

  }

  public getRootServices(lang: "EN" | "BG") {

    this.loader.show.next(true);
    let headers = null;

    return this.http.get(environment.mainUrl + "api/rootServices/" + lang,
      {
        headers: headers,
        observe: 'response',
        withCredentials: false
      });

  }

  public getCaptionServices(lang) {

    this.loader.show.next(true);
    let headers = null;

    return this.http.get(environment.mainUrl + "api/captionServices/" + lang,
      {
        headers: headers,
        observe: 'response',
        withCredentials: false
      });

  }

  public sendMail(data) {
    this.loader.show.next(true);

    let headers = null;

    return this.http.get(environment.mainUrl + "api/sendMail" + this.parseQueryString(data),
      {
        headers: headers,
        observe: 'response',
        withCredentials: false
      });

  }

  private parseQueryString(model) {
    let qsParams = [];
    for (let prop in model) {
      if (model[prop] != null && model[prop] != undefined) {
        if (model[prop] instanceof Date)
          model[prop] = model[prop].toISOString()

        qsParams.push(prop + '=' + model[prop]);
      }
    }
    if (qsParams.length)
      return '?' + qsParams.join('&');

    return '';
  }

  changeContacts(lang: string, adress: string, id) {

    let authData = {
      lang: lang,
      updatedAddress: adress,
      id: id
    }

    this.http
      .post<{ token: string; expiresIn: number; userId: string; user_name: string }>(
        environment.mainUrl + "api/update/address", authData
      )
      .subscribe(
        (response: any) => {

          if (response.changed) {
            this.notifications.openSnackBarSuccess("Данните бяха променени.");

          }


        }, error => {
        }
      )

  }

}
