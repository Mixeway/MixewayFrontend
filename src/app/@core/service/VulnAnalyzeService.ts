import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {Vulnerabilities} from '../Model/VulnAnalyze';

@Injectable({
  providedIn: 'root',
})
export class VulnAnalyzeService {
  constructor(private http: HttpClient) {
  }

  getInfraVulns(): Observable<Vulnerabilities> {
    return this.http.get<Vulnerabilities>(environment.backend + '/vulnerabilities/networkScanner')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  setGradeeForInfrastructureVuln(id: number, grade: number) {
    return this.http.patch<string>(environment.backend + '/vulnerabilities/networkScanner/' + id + '/' + grade, null)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getWebAppVulns(): Observable<Vulnerabilities> {
    return this.http.get<Vulnerabilities>(environment.backend + '/vulnerabilities/webApplicationScanner')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  setGradeeForWebAppVuln(id: number, grade: number) {
    return this.http.patch<string>(environment.backend + '/vulnerabilities/webApplicationScanner/' + id + '/' + grade,
      null)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getCodeVulns(): Observable<Vulnerabilities> {
    return this.http.get<Vulnerabilities>(environment.backend + '/vulnerabilities/codeScanner')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  setGradeForCodeVuln(id: number, grade: number) {
    return this.http.patch<string>(environment.backend + '/vulnerabilities/codeScanner/' + id + '/' + grade,
      null)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getOpenSourceVulns(): Observable<Vulnerabilities> {
    return this.http.get<Vulnerabilities>(environment.backend + '/vulnerabilities/packageScan')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  setGradeForOpenSourceVuln(id: number, grade: number) {
    return this.http.patch<string>(environment.backend + '/vulnerabilities/packageScan/' + id + '/' + grade,
      null)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  errorHandl(error) {
    if (error.status === 403) {
      window.location.href = '/pages/dashboard';
    }
    return throwError(error.status);
  }
}
