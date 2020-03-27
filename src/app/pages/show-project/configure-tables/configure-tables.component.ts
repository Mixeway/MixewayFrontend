import {Component, Input, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ProjectConstants} from '../../../@core/constants/ProjectConstants';
import {ScannerType} from '../../../@core/Model/Scanner';
import {ShowProjectService} from '../../../@core/service/ShowProjectService';
import {RoutingDomain} from '../../../@core/Model/RoutingDomain';

@Component({
  selector: 'ngx-configure-tables',
  templateUrl: './configure-tables.component.html',
  styleUrls: ['./configure-tables.component.scss'],
})
export class ConfigureTablesComponent implements OnInit {
  settings: any;
  @Input() scannerTypes: ScannerType[];
  source: LocalDataSource = new LocalDataSource();
  constants: ProjectConstants = new ProjectConstants();
  routingDomains: RoutingDomain[];
  constructor(private showProjectService: ShowProjectService) {
    this.loadRoutingDomains();
  }
  loadRoutingDomains() {
    return this.showProjectService.getRoutingDomains().subscribe(data => {
      this.routingDomains = data;
    });
  }
  ngOnInit() {
  }
}
