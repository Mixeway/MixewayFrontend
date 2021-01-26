import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from '../Model/User';
import {environment} from '../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {CisRequirement, Vuln} from '../Model/Vulnerability';

@Injectable({
  providedIn: 'root',
})
export class KnowlegeBaseService {


  constructor(private http: HttpClient) {
  }

  // GET
  getVulnerabilities(): Observable<Vuln[]> {
    // @ts-ignore
    return this.http.get<Vuln[]>(environment.backend + '/vulns/vulnerabilities', {observe:  'response'} )
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getRequirements(): Observable<CisRequirement[]> {
    // @ts-ignore
    return this.http.get<CisRequirement[]>(environment.backend + '/vulns/cisrequirements', {observe:  'response'} )
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  editVulnSeverity(id: number, severity: string): Observable<Vuln[]> {
    // @ts-ignore
    return this.http.get<Vuln[]>(environment.backend + '/vulns/vulnerabilities/' + id + '/' + severity,
      {observe:  'response'} )
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  editRequirementSeverity(id: number, severity: string): Observable<CisRequirement[]> {
    // @ts-ignore
    return this.http.get<CisRequirement[]>(environment.backend + '/vulns/cisrequirements/' + id + '/' + severity,
      {observe:  'response'} )
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
