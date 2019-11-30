import { Component, OnInit } from '@angular/core';
import {ProjectConstants} from '../../../@core/constants/ProjectConstants';

@Component({
  selector: 'ngx-show-project-details-chart',
  templateUrl: './show-project-details-chart.component.html',
  styleUrls: ['./show-project-details-chart.component.scss'],
})
export class ShowProjectDetailsChartComponent implements OnInit {
  constants: ProjectConstants = new ProjectConstants();
  constructor() { }

  ngOnInit() {
  }

}
