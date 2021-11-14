import {Component, OnInit} from '@angular/core';
import {DashboardConstants} from '../../@core/constants/DashboardConstants';
import {ShowProjectService} from '../../@core/service/ShowProjectService';
import {ScannerType} from '../../@core/Model/Scanner';
import {ProjectConstants} from '../../@core/constants/ProjectConstants';
import {DashboardTopStatistics} from '../../@core/Model/DashboardTopStatistics';
import {DashboardService} from '../../@core/service/DashboardService';
import {AllVulnTrendData} from '../../@core/Model/AllVulnTrendData';

@Component({
  selector: 'ngx-mixer-dashboard',
  templateUrl: './mixer-dashboard.component.html',
  styleUrls: ['./mixer-dashboard.component.scss'],
})
export class MixerDashboardComponent implements OnInit {
  scannerTypes: ScannerType[];
  trendResponse: AllVulnTrendData[];
  constants: DashboardConstants = new DashboardConstants();
  constantsProject: ProjectConstants = new ProjectConstants();
  rootStatistics: DashboardTopStatistics = new DashboardTopStatistics();
  constructor( private showProjectService: ShowProjectService,
               private dashboardService: DashboardService) {
    this.loadScannerTypes();
    this.loadTrendData();
  }

  ngOnInit() {
    this.loadStatistics();
  }
  loadTrendData() {
    return this.dashboardService.getTrendData().subscribe(data => {
      this.trendResponse = data.reverse();
    });
  }

  loadScannerTypes() {
    return this.showProjectService.getPossibleScanners().subscribe(data => {
      this.scannerTypes = data;
    });
  }
  loadStatistics() {
    return this.dashboardService.getRootStatistics().subscribe(data => {
      this.rootStatistics = data;
    });
  }
}
