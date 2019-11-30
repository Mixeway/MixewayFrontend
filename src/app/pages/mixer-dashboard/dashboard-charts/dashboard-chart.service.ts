import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class DashboardChartService {

  constructor(private httpClient: HttpClient) { }

  public get(url: string): Observable<any> {
    return this.httpClient.get(url);
  }
}
