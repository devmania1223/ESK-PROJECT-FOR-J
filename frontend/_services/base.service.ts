import { Observable, Subscriber } from 'rxjs/Rx';

export abstract class BaseService {
  constructor() {
  }

  protected handleError(error: any) {
    const applicationError = error.headers ? error.headers.get('Application-Error') :  null;

    // either applicationError in header or model error in body
    if (applicationError) {
      return Observable.throw(applicationError);
    }

    let modelStateErrors = '';
    const serverError = error;

    if (!serverError.type) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }

    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
    return Observable.throw(modelStateErrors || 'Server error');
  }

  public list(params: any): Observable<any> {
    console.log('HTTP GET: Implementation is missing!');
    return Observable.create((observer: Subscriber<any>) => {
      observer.next({});
      observer.complete();
    });
  }

  public find(params: any): Observable<any> {
    console.log('HTTP GET: Implementation is missing!');
    return Observable.create((observer: Subscriber<any>) => {
      observer.next({});
      observer.complete();
    });
  }
  public get(item: any): Observable<any> {
    console.log('HTTP GET: Implementation is missing!');
    return Observable.create((observer: Subscriber<any>) => {
      observer.next({});
      observer.complete();
    });
  }
  public post(item: any): Observable<any> {
    console.log('HTTP POST: Implementation is missing!');
    return Observable.create((observer: Subscriber<any>) => {
      observer.next({});
      observer.complete();
    });
  }
  public put(item: any): Observable<any> {
    console.log('HTTP PUT: Implementation is missing!');
    return Observable.create((observer: Subscriber<any>) => {
      observer.next({});
      observer.complete();
    });
  }
  public delete(item: any): Observable<boolean> {
    console.log('HTTP DELETE: Implementation is missing!');
    return Observable.create((observer: Subscriber<any>) => {
      observer.next({});
      observer.complete();
    });
  }
}
