import { Component, OnInit } from '@angular/core';
import {AdminConstants} from '../../../@core/constants/AdminConstants';

@Component({
  selector: 'ngx-scan-strategy',
  templateUrl: './scan-strategy.component.html',
  styleUrls: ['./scan-strategy.component.scss'],
})
export class ScanStrategyComponent implements OnInit {
  constants: AdminConstants = new AdminConstants();
  constructor() { }

  ngOnInit() {
  }

}
