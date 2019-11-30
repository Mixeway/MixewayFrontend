import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {BarChartValues2} from '../Model/BarChartValues2';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class VulnsService {
  constructor(private http: HttpClient, private router: Router) {
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
      ).catch((error: any) => {
        if (error.status === 403) {
          this.redirectToDashboard();
          return throwError('403');
        }
      });
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
