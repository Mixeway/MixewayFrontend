import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {CiOperations} from '../Model/CiOperations';
import {CiResult} from '../Model/CiResult';
import {AllVulnTrendData} from '../Model/AllVulnTrendData';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CiOpeerationsService {
  constructor(private http: HttpClient, private router: Router) {
  }

  getTableData(): Observable<CiOperations[]> {
    return this.http.get<CiOperations[]>(environment.backend + '/cicd/data')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getResults(): Observable<CiResult> {
    return this.http.get<CiResult>(environment.backend + '/cicd/result')
      .pipe(
        retry(1),
      ).catch((error: any) => {
        if (error.status === 403) {
          this.redirectToDashboard();
          return throwError('403');
        }
      });
  }

  getTrends(): Observable<AllVulnTrendData[]> {
    return this.http.get<AllVulnTrendData[]>(environment.backend + '/cicd/trend')
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
  private redirectToDashboard() {
    this.router.navigate(['/auth/login']);

  }
}
