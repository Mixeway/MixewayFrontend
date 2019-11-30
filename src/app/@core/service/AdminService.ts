import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {retry, catchError, timeout} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {User} from '../Model/User';
import {Scanner, ScannerType} from '../Model/Scanner';
import {Router} from '@angular/router';
import {Settings} from '../Model/Settings';

@Injectable({
  providedIn: 'root',
})
export class AdminService {


  constructor(private http: HttpClient, private router: Router) {
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // GET
  getUsers(): Observable<User[]> {
    // @ts-ignore
    return this.http.get<User[]>(environment.backend + '/admin/users', {observe:  'response'} )
      .pipe(
        retry(1),
      ).catch((error: any) => {
        if (error.status === 403) {
          this.redirectToDashboard();
          return throwError('403');
        }
      });
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
  addUser(user): Observable<string> {
    return this.http.put<string>(environment.backend + '/admin/user/add', user)
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

  showErrorOnDelete() {
    return throwError(null);
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
