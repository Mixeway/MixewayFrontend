import { Component, OnInit } from '@angular/core';
import {DashboardTopStatistics} from '../../@core/Model/DashboardTopStatistics';
import {DashboardService} from '../../@core/service/DashboardService';
import {ScanService} from '../../@core/service/ScanService';
import {SecurityScan} from '../../@core/Model/SecurityScan';

@Component({
  selector: 'ngx-scans',
  templateUrl: './scans.component.html',
  styleUrls: ['./scans.component.scss'],
})
export class ScansComponent implements OnInit {
  rootStatistics: DashboardTopStatistics = new DashboardTopStatistics();
  runningScans: SecurityScan[];
  inQueueScans: SecurityScan[];
  tableSettings = {
    actions: false,
    columns: {
      project: {
        title: 'Project Name',
        filter: true,
        width: '20%',
      },
      scanType: {
        title: 'Scan Type',
        filter: true,
        width: '25%',
      },
      scope: {
        title: 'Scan scope',
        filter: true,
        width: '55%',
      },
    },
  };
  constructor(private dashboardService: DashboardService, private scanService: ScanService) { }

  ngOnInit(): void {
    this.loadStatistics();
    this.loadRunningScans();
    this.loadInQueueScans();
  }
  loadStatistics() {
    return this.dashboardService.getRootStatistics().subscribe(data => {
      this.rootStatistics = data;
    });
  }

  loadRunningScans() {
    return this.scanService.getScansRunning().subscribe(data => {
      this.runningScans = data;
    });
  }
  loadInQueueScans() {
    return this.scanService.getInQueueScans().subscribe(data => {
      this.inQueueScans = data;
    });
  }
}
