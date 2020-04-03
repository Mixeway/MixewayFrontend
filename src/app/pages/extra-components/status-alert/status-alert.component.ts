import {Component, Input, OnInit} from '@angular/core';
import {ScannerType} from '../../../@core/Model/Scanner';
import {ProjectConstants} from '../../../@core/constants/ProjectConstants';

@Component({
  selector: 'ngx-status-alert',
  templateUrl: './status-alert.component.html',
  styleUrls: ['./status-alert.component.scss'],
})
export class StatusAlertComponent implements OnInit {
  @Input() scannerTypes: ScannerType[];
  @Input() statusFor: string;
  @Input() dashboard: boolean = false;
  status: string;
  toolTipText: string;
  icon: string;
  constants: ProjectConstants = new ProjectConstants();
  statusText: string;
  constructor() {
    this.createStatus();
  }

  ngOnInit() {
    this.createStatus();
  }

  private createStatus() {
    switch (this.statusFor) {
      case this.constants.SCANNER_INFRA: {
        if (this.scannerTypes.filter(st => (
          st.category === this.constants.SCANNER_TYPE_CATEGORY_INFRA)).length > 0) {
          this.status = 'success';
          if (this.dashboard) {
            this.statusText = 'Network scanner: configured';
          } else {
            this.statusText = 'Scanner Status: OK';
          }
          this.toolTipText = 'Integration with Infrastracture scanner is configured properly';
          this.icon = 'checkmark-circle-2-outline';
        } else {
          this.status = 'danger';
          if (this.dashboard) {
            this.statusText = 'Network scanner: Not configured';
          } else {
            this.statusText = 'Scanner Status: Not OK';
          }
          this.toolTipText = 'Integration with Infrastracture scanner is not configured properly. Please review configuration in Admin Zone.';
          this.icon = 'alert-circle-outline';
        }
        break;
      }
      case this.constants.SCANNER_WEB: {
        if (this.scannerTypes.filter(st => (
          st.category === this.constants.SCANNER_TYPE_CATEGORY_WEB)).length > 0) {
          this.status = 'success';
          if (this.dashboard) {
            this.statusText = 'WebApplication scanner: configured';
          } else {
            this.statusText = 'Scanner Status: OK';
          }
          this.toolTipText = 'Integration with WebApplication scanner is configured properly';
          this.icon = 'checkmark-circle-2-outline';
        } else {
          this.status = 'danger';
          if (this.dashboard) {
            this.statusText = 'WebApplication scanner: Not configured';
          } else {
            this.statusText = 'Scanner Status: Not OK';
          }
          this.toolTipText = 'Integration with WebApplication scanner is not configured properly. Please review configuration in Admin Zone.';
          this.icon = 'alert-circle-outline';
        }
        break;
      }
      case this.constants.SCANNER_CODE: {
        if (this.scannerTypes.filter(st => (
          st.category === this.constants.SCANNER_TYPE_CATEGORY_CODE)).length > 0) {
          this.status = 'success';
          if (this.dashboard) {
            this.statusText = 'SAST scanner: configured';
          } else {
            this.statusText = 'Scanner Status: OK';
          }
          this.toolTipText = 'Integration with SAST scanner is configured properly';
          this.icon = 'checkmark-circle-2-outline';
        } else {
          this.status = 'danger';
          if (this.dashboard) {
            this.statusText = 'SAST scanner: Not configured';
          } else {
            this.statusText = 'Scanner Status: Not OK';
          }
          this.toolTipText = 'Integration with SAST scanner is not configured properly. Please review configuration in Admin Zone.';
          this.icon = 'alert-circle-outline';
        }
        break;
      }
    }
  }
}
