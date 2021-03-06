import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {UserProfile} from '../Model/UserProfile';
import {Status} from '../Model/Status';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(environment.backend + '/profile')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  changePassword(passwordForm): Observable<string> {
    return this.http.patch<string>(environment.backend + '/profile', passwordForm)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  regenerateCicdApiKey(): Observable<Status> {
    return this.http.get<Status>(environment.backend + '/profile/apikey/cicd')
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
