import { Component } from '@angular/core';
import {DashboardConstants} from '../../@core/constants/DashboardConstants';
import {ShowProjectService} from '../../@core/service/ShowProjectService';
import {ScannerType} from '../../@core/Model/Scanner';
import {ProjectConstants} from '../../@core/constants/ProjectConstants';

@Component({
  selector: 'ngx-mixer-dashboard',
  templateUrl: './mixer-dashboard.component.html',
  styleUrls: ['./mixer-dashboard.component.scss'],
})
export class MixerDashboardComponent {
  scannerTypes: ScannerType[];
  constants: DashboardConstants = new DashboardConstants();
  constantsProject: ProjectConstants = new ProjectConstants();
  constructor( private showProjectService: ShowProjectService) {
    this.loadScannerTypes();
  }
  loadScannerTypes() {
    return this.showProjectService.getPossibleScanners().subscribe(data => {
      this.scannerTypes = data;
    });
  }
}
