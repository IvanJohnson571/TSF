import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { Injectable } from '@angular/core';


@Injectable()
export class RequestCountHttpInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: LoaderService) { }

  removeRequest(request: HttpRequest<any>) {
    if (!this.loaderService.isLoadingIgnoredUrl(request.url)) {
      const i = this.requests.indexOf(request);
      if (i >= 0) {
        this.requests.splice(i, 1);
      }

      this.loaderService.stopLoading(this.requests)
    }
  }

  addRequest(request: HttpRequest<any>) {
    if (!this.loaderService.isLoadingIgnoredUrl(request.url)) {
      this.loaderService.startLoading();
      this.requests.push(request);
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.addRequest(request);

    return Observable.create(observer => {
      const subscription = next.handle(request)
        .subscribe(
        event => {
          if (event instanceof HttpResponse) {
              this.removeRequest(request);
            }

            observer.next(event);
          },
          error => {
            this.removeRequest(request);
            observer.error(error);
          },
          () => {
            this.removeRequest(request);
            observer.complete();
          });

      return () => {
        this.removeRequest(request);
        subscription.unsubscribe();
      }
    });
  }
}
