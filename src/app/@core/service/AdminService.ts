import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {retry, catchError, timeout} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {User} from '../Model/User';
import {Scanner, ScannerType} from '../Model/Scanner';
import {Settings} from '../Model/Settings';
import {Project} from '../Model/Project';
import {WebAppScanStrategy} from '../Model/WebAppScanStrategy';
import {SecurityGateway} from '../Model/SecurityGateway';
import {Status} from '../Model/Status';

@Injectable({
  providedIn: 'root',
})
export class AdminService {


  constructor(private http: HttpClient) {
  }

  // GET
  getUsers(): Observable<User[]> {
    // @ts-ignore
    return this.http.get<User[]>(environment.backend + '/admin/users', {observe:  'response'} )
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getScanners(): Observable<Scanner[]> {
    return this.http.get<Scanner[]>(environment.backend + '/admin/scanners')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getScannerTypes(): Observable<ScannerType[]> {
    return this.http.get<ScannerType[]>(environment.backend + '/admin/scanertypes')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  addUser(user): Observable<Status> {
    return this.http.put<Status>(environment.backend + '/admin/user/add', user)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  enableUser(id): Observable<string> {
    return this.http.put<string>(environment.backend + '/admin/user/' + id + '/enable', null)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  disableUser(id): Observable<string> {
    return this.http.put<string>(environment.backend + '/admin/user/' + id + '/disable', null)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  addScanner(scanner): Observable<string> {
    return this.http.put<string>(environment.backend + '/admin/scanner/add', scanner)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  deleteScanner(id): Observable<string> {
    return this.http.delete<string>(environment.backend + '/admin/scanner/' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  testScanner(id): Observable<string> {
    return this.http.put<string>(environment.backend + '/admin/scanner/' + id + '/test', null)
      .pipe(
        retry(0),
        timeout(3000),
        catchError(this.errorHandl),
      );
  }
  addRfw(id, rfw): Observable<string> {
    return this.http.put<string>(environment.backend + '/admin/scanner/' + id + '/addrfw', rfw)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  changePassword(id, passwordForm): Observable<string> {
    return this.http.patch<string>(environment.backend + '/admin/user/' + id , passwordForm)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getSettings(): Observable<Settings> {
    return this.http.get<Settings>(environment.backend + '/admin/settings/' )
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  updateSmtp(settings): Observable<string> {
    return this.http.put<string>(environment.backend + '/admin/settings/smtp', settings)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  updateAuth(settings): Observable<string> {
    return this.http.put<string>(environment.backend + '/admin/settings/auth', settings)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  generateApiKey(): Observable<string> {
    return this.http.put<string>(environment.backend + '/admin/settings/apikey/generate', null)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  removeApiKey(): Observable<string> {
    return this.http.delete<string>(environment.backend + '/admin/settings/apikey')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  createRoutingDomain(routingDomain): Observable<string> {
    return this.http.put<string>(environment.backend + '/admin/settings/routingdomain', routingDomain)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  deleteRoutingDomain(id): Observable<string> {
    return this.http.delete<string>(environment.backend + '/admin/settings/routingdomain/' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  createProxy(proxy): Observable<string> {
    return this.http.put<string>(environment.backend + '/admin/settings/proxy', proxy)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  deleteProxy(id): Observable<string> {
    return this.http.delete<string>(environment.backend + '/admin/settings/proxy/' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  updateInfraCron(expression): Observable<string> {
    return this.http.patch<string>(environment.backend + '/admin/settings/infracron', expression)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  updateWebAppCron(expression): Observable<string> {
    return this.http.patch<string>(environment.backend + '/admin/settings/webappcron', expression)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  updateCodeCron(expression): Observable<string> {
    return this.http.patch<string>(environment.backend + '/admin/settings/codecron', expression)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  updateTrendCron(expression): Observable<string> {
    return this.http.patch<string>(environment.backend + '/admin/settings/trendcron', expression)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(environment.backend + '/admin/projects')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  editWebAppScanStrategy(form): Observable<string> {
    return this.http.patch<string>(environment.backend + '/admin/settings/webappscanstrategy' , form)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getWebAppScanStrategy(): Observable<WebAppScanStrategy> {
    return this.http.get<WebAppScanStrategy>(environment.backend + '/admin/settings/webappscanstrategy')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  editVulnAuditorSettings(settings): Observable<string> {
    return this.http.post<string>(environment.backend + '/admin/settings/vulnauditor' , settings)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  updateVulnAuditor(vulnauditor): Observable<string> {
    return this.http.post<string>(environment.backend + '/admin/settings/vulnauditor', vulnauditor)
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
  getSecurityGateway(): Observable<SecurityGateway> {
    return this.http.get<SecurityGateway>(environment.backend + '/admin/settings/securitygateway')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  updateSecurityGateway(securityGateway): Observable<string> {
    return this.http.post<string>(environment.backend + '/admin/settings/securitygateway', securityGateway)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }

}
