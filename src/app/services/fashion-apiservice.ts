import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Fashion } from '../classes/Fashion';

@Injectable({ providedIn: 'root' })
export class FashionAPIService {
  constructor(private http: HttpClient) {}

  getFashions(): Observable<Fashion[]> {
    return this.http.get<Fashion[]>('/fashions').pipe(
      map(items => items.map(item => Object.assign(new Fashion(), item))),
      retry(3), catchError(this.handleError));
  }

  getFashion(id: string): Observable<Fashion> {
    return this.http.get<Fashion>('/fashions/' + (/^[a-f\d]{24}$/i.test(id) ? '' : 'slug/') + encodeURIComponent(id)).pipe(
      map(item => Object.assign(new Fashion(), item)),
      retry(3), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error?.message || error.message));
  }
}
