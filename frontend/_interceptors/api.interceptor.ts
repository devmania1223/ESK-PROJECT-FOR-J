import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../_services';
import { tap } from 'rxjs/operators/tap';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'app/_services/loaderService';
import { ConfigService } from 'app/_services/settings.service';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  
  constructor(
    private auth: AuthenticationService,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private config: ConfigService) { }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    this.auth.setActivityTime();
    if (this.isRefreshingToken){
      req = req.clone({ setHeaders: { isRefreshToken: "true" }}) ;
    }
    return req.clone({ setHeaders: { Authorization: 'Bearer ' + token }})
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.indexOf('server') > -1) {

      if (!request.headers.has('Content-Type')) {
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
      }
      if (request.url.indexOf('/pdf') === -1) {
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
      } else {
        request = request.clone({ headers: request.headers.set('Accept', 'application/pdf') });
      }

      request = request.clone({ url: request.url.replace('server', this.config.getApiRoot()) });
      const token = this.auth.getToken();
      if (token) {
        //request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        request = this.addToken(request, token);
      }
    }

    return next.handle(request)
      .pipe(
        tap( // Log the result or error
          data => {
            this.loaderService.displayLoader(false);
          }
        )
      )
      .catch((response, caught) => {
        this.loaderService.displayLoader(false);
        console.log(response);

        if (response.error.status === 401) {
          if (response.error.message === "EXPIRED"){
            return this.handle401Error(request, next);
          }

          this.auth.logout();
          this.toastr.error("Prijavno sejo ni mogoče vzpostaviti.", 'Neavtoriziran dostop');
          return Observable.throw(response);
        }

        if (response.error.status === 409) { // CUSTOM ERROR
          this.toastr.info(response.error.message, 'Podatkovna napaka'); 
          return Observable.throw(response);
        }

        if (response.error.status === 500) {
          this.toastr.error('Interna strežniška napaka', 'Napaka');
          return Observable.throw(response);
        }

        this.toastr.error('Zgodila se je neznana napaka.', 'Napaka');
        return Observable.throw(response);
      });
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      console.log("refreshing token ...");
      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      return this.auth.refreshToken().switchMap(
        (newToken: string) => {
          if (newToken) {
            console.log("token refreshed...");
            this.tokenSubject.next(newToken);
            return next.handle(this.addToken(req, newToken));
          }
          console.log("token not refreshed...");
          // If we don't get a new token, we are in trouble so logout.
          this.auth.logout();
          return Observable.throw("Cannot refresh token.");
        })
        .catch(error => {
          // If there is an exception calling 'refreshToken', bad news so logout.
          console.log(error);
          this.auth.logout();
          return Observable.throw("An exception calling 'refreshToken'.");
        })
        .finally(() => {
          this.isRefreshingToken = false;
        });
    } else {
      return this.tokenSubject
        .filter(token => token != null)
        .take(1)
        .switchMap(token => {
          return next.handle(this.addToken(req, token));
        });
    }
  }
}
