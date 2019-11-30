import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../@core/service/DashboardService';
// @ts-ignore
import {SearchRequest} from '../../@core/Model/SearchRequest';
import {ActivatedRoute} from '@angular/router';
import {SearchConstants} from '../../@core/constants/SearchConstants';
import {SearchResponse} from '../../@core/Model/SearchResponse';

@Component({
  selector: 'ngx-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchingFor: string = '';
  searchResponse: SearchResponse = new SearchResponse();
  constants: SearchConstants = new SearchConstants();
  constructor(private dashboardService: DashboardService,
              private _route: ActivatedRoute) {
    this.searchingFor = this._route.snapshot.paramMap.get('search');
    this.search();
  }

  ngOnInit() {

  }
  search() {
    const request: SearchRequest = {};
    request.search = this.searchingFor;
    return this.dashboardService.search(request).subscribe(data => {
      this.searchResponse = data;
    });
  }

}
