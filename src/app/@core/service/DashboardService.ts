import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AllVulnTrendData } from '../Model/AllVulnTrendData';
import { environment } from '../../../environments/environment';
import {AllSourceDataChart} from '../Model/AllSourceDataChart';
import {Project} from '../Model/Project';
import {SessionOwner} from '../Model/SessionOwner';
import {Router} from '@angular/router';
// @ts-ignore
import {SearchResponse} from '../Model/SearchResponse';


@Injectable({
  providedIn: 'root',
})
export class DashboardService {


  constructor(private http: HttpClient, private router: Router) {
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // GET
  search(search): Observable<SearchResponse> {
    return this.http.post<SearchResponse>(environment.backend + '/dashboard/search', search, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getSessionOwner(): Observable<SessionOwner> {
    return this.http.get<SessionOwner>(environment.backend + '/dashboard/userinfo')
      .pipe(
        retry(1),
      ).catch((error: any) => {
        if (error.status === 403) {
          this.redirectToDashboard();
          return throwError('403');
        }
      });
  }
  getTrendData(): Observable<AllVulnTrendData[]> {
    return this.http.get<AllVulnTrendData[]>(environment.backend + '/dashboard/getvulntrenddata')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getSourceTrendData(): Observable<AllSourceDataChart> {
    return this.http.get<AllSourceDataChart>(environment.backend + '/dashboard/getsourcetrenddata')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(environment.backend + '/dashboard/projects')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  deleteProject(id): Observable<null> {
    return this.http.delete<null>(environment.backend + '/dashboard/projects/' + id)
      .pipe(
        retry(1),
        catchError(this.showErrorOnDelete),
      );
  }
  addProject(name, description, ciid): Observable<null> {
    return this.http.put<null>(environment.backend + '/dashboard/projects/' + name + '/' + description + '/'
      + ciid, null)
      .pipe(
        retry(1),
        catchError(this.showErrorOnDelete),
      );
  }
  editProject(id, project): Observable<null> {
    return this.http.patch<null>(environment.backend + '/dashboard/projects/' + id, project)
      .pipe(
        retry(1),
        catchError(this.showErrorOnDelete),
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
