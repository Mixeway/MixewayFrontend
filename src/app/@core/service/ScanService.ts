import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {BarChartValues2} from '../Model/BarChartValues2';
import {SecurityScan} from '../Model/SecurityScan';

@Injectable({
  providedIn: 'root',
})
export class ScanService {
  constructor(private http: HttpClient) {
  }

  getScansRunning(): Observable<SecurityScan[]> {
    return this.http.get<SecurityScan[]>(environment.backend + '/scanmanage/running/scans')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getInQueueScans(): Observable<SecurityScan[]> {
    return this.http.get<SecurityScan[]>(environment.backend + '/scanmanage/inqueue/scans')
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
