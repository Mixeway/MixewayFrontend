import { Component } from '@angular/core';
import {DashboardConstants} from '../../@core/constants/DashboardConstants';

@Component({
  selector: 'ngx-mixer-dashboard',
  templateUrl: './mixer-dashboard.component.html',
  styleUrls: ['./mixer-dashboard.component.scss'],
})
export class MixerDashboardComponent {
  constants: DashboardConstants = new DashboardConstants();
}
