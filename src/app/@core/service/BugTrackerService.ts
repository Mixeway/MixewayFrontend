import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {BugTracker, BugTrackerType} from '../Model/BugTracker';

@Injectable({
  providedIn: 'root',
})
export class BugTrackerService {
  constructor(private http: HttpClient) {}
  getBugTrackerTypes(): Observable<BugTrackerType[]> {
    return this.http.get<BugTrackerType[]>(environment.backend + '/show/project/getbugtrackertypes')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getBugTrackers(id: number): Observable<BugTracker[]> {
    return this.http.get<BugTracker[]>(environment.backend + '/show/project/' + id + '/getbugtrackers')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  saveBugTracker(id: number, bugTracker: BugTracker): Observable<string> {
    return this.http.put<string>(environment.backend + '/show/project/' + id + '/getbugtrackers',
      bugTracker)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  deleteBugTracker(id: number, idBug: number): Observable<string> {
    return this.http.delete<string>(environment.backend + '/show/project/' + id + '/getbugtrackers/' + idBug)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  issueTicket(id: number, vulnType: string, vulnId: number): Observable<string> {
  return this.http.put<string>(environment.backend + '/show/project/' + id + '/issueticket/' + vulnType + '/' + vulnId,
    null)
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
