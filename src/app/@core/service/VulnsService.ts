import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {BarChartValues2} from '../Model/BarChartValues2';

@Injectable({
  providedIn: 'root',
})
export class VulnsService {
  constructor(private http: HttpClient) {
  }

  getCodeVulns(): Observable<BarChartValues2[]> {
    return this.http.get<BarChartValues2[]>(environment.backend + '/vulns/codevulns')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getCodeTargets(): Observable<BarChartValues2[]> {
    return this.http.get<BarChartValues2[]>(environment.backend + '/vulns/codeprojects')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }

  getInfraVulns(): Observable<BarChartValues2[]> {
    return this.http.get<BarChartValues2[]>(environment.backend + '/vulns/infravulns')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }

  getInfraTargets(): Observable<BarChartValues2[]> {
    return this.http.get<BarChartValues2[]>(environment.backend + '/vulns/infraintfs')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }

  getWebVulns(): Observable<BarChartValues2[]> {
    return this.http.get<BarChartValues2[]>(environment.backend + '/vulns/webvulns')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }

  getWebTargets(): Observable<BarChartValues2[]> {
    return this.http.get<BarChartValues2[]>(environment.backend + '/vulns/webapps')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getOpenSourceVulns(): Observable<BarChartValues2[]> {
    return this.http.get<BarChartValues2[]>(environment.backend + '/vulns/opensource')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getOpenSourceVulnsForCodeProject(): Observable<BarChartValues2[]> {
    return this.http.get<BarChartValues2[]>(environment.backend + '/vulns/opensourceforcode')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getGlobalStatistics(): Observable<GlobalStatistic[]> {
    return this.http.get<GlobalStatistic[]>(environment.backend + '/vulns/global/statistic')
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
