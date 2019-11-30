import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import {User} from '../Model/User';
import {environment} from '../../../environments/environment';
// @ts-ignore
import {StatusEntity} from '../Model/StatusEntity';


@Injectable({
  providedIn: 'root',
})
export class AuthService {


  constructor(private http: HttpClient) {
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // GET
  login(form): Observable<User[]> {
    return this.http.post<User[]>(environment.passwordSource, form)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  initialize(init): Observable<string> {
    return this.http.post<string>(environment.auth + '/init'  , init)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  status(): Observable<StatusEntity> {
    return this.http.get<StatusEntity>(environment.auth + '/status')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
