import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {CiOperations} from '../Model/CiOperations';
import {CiResult} from '../Model/CiResult';
import {AllVulnTrendData} from '../Model/AllVulnTrendData';

@Injectable({
  providedIn: 'root',
})
export class CiOpeerationsService {
  constructor(private http: HttpClient) {
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
        catchError(this.errorHandl),
      );
  }

  getTrends(): Observable<AllVulnTrendData[]> {
    return this.http.get<AllVulnTrendData[]>(environment.backend + '/cicd/trend')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }

  errorHandl(error) {
    if (error.status === 403) {
      const expires = 'expires=' + new Date().toUTCString();
      document.cookie = `role=;Path=/;expires=${expires}`;
      window.location.reload();
    }
    return throwError(error.status);
  }
}
