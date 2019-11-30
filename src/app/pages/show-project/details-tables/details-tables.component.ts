import {Component, OnInit} from '@angular/core';
import {AlertColorComponent} from '../../extra-components/alert-color.component';
import {NewIconComponent} from '../../extra-components/new-icon.component';
import {DescriptionToggleComponent} from '../../extra-components/description-toggle.component';
import {AuditResultColorComponent} from '../../extra-components/audit-result-color.component';
import {ShowProjectService} from '../../../@core/service/ShowProjectService';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AnalysisColorComponent} from '../../extra-components/analysis-color.component';
import {Angular5Csv} from 'angular5-csv/dist/Angular5-csv';
import {ProjectConstants} from '../../../@core/constants/ProjectConstants';
import {BugTracker} from '../../../@core/Model/BugTracker';
import {BugTrackerService} from '../../../@core/service/BugTrackerService';
import {BugComponent} from '../../extra-components/bug-component';


@Component({
  selector: 'ngx-details-tables',
  templateUrl: './details-tables.component.html',
  styleUrls: ['./details-tables.component.scss'],
  entryComponents: [AlertColorComponent, NewIconComponent, DescriptionToggleComponent, AuditResultColorComponent,
    AnalysisColorComponent, BugComponent],
})
export class DetailsTablesComponent implements OnInit {
  webAppSettings: any;
  webAppSource: any;
  webAppTabShow: boolean = false;
  webAppNewVulns: boolean = false;
  auditSettings: any;
  auditSource: any;
  auditTabShow: boolean = false;
  auditNewVulns: boolean = false;
  infraSettings: any;
  infraTabShow: boolean = false;
  infraNewVulns: boolean = false;
  codeSettings: any;
  codeSource: any;
  codeTabShow: boolean = false;
  codeNewVulns: boolean = false;
  softSettings: any;
  softSource: any;
  softTabShow: boolean = false;
  softNewVulns: boolean = false;
  infraSource: any;
  _entityId: number;
  role: string;
  bugTrackers: BugTracker[];
  activeTab: number;
  constants: ProjectConstants = new ProjectConstants();
  constructor( private showProjectService: ShowProjectService, private _route: ActivatedRoute, private router: Router,
               private cookieService: CookieService, private bugTrackerService: BugTrackerService) {
    this.role = this.cookieService.get('role');
    this._entityId = +this._route.snapshot.paramMap.get('projectid');
    if (!this._entityId) {
      this.router.navigate(['/pages/dashboard']);
    }
    this.loadBugTrackers();

    this.loadInfraVulns();
    this.loadWebApps();
    this.loadCodeVulns();
    this.loadAudit();
    this.loadSoftVulns();
  }
  loadAudit() {
    return this.showProjectService.getAuditVulns(this._entityId).subscribe(data => {
      this.auditSource = data;
      if (data.length > 0) {
        this.auditTabShow = true;
      }
      if (data.filter(audit => audit.status.name === this.constants.PROJECT_DETAILS_STATUS_NEW).length > 0) {
        this.auditNewVulns = true;
      }
    });
  }
  loadBugTrackers() {
    return this.bugTrackerService.getBugTrackers(this._entityId).subscribe(data => {
      this.bugTrackers = data;
      this.createTableSettings();
    });
  }
  loadInfraVulns() {
    return this.showProjectService.getInfraVulns(this._entityId).subscribe(data => {
      this.infraSource = data.map(e => ({...e, type: 'infra'}));
      if (data.length > 0) {
        this.infraTabShow = true;
      }
      if (data.filter(infra => infra.status.name === this.constants.PROJECT_DETAILS_STATUS_NEW).length > 0) {
        this.infraNewVulns = true;
      }
    });
  }
  loadWebApps() {
    return this.showProjectService.getWebAppVulns(this._entityId).subscribe(data => {
      this.webAppSource = data.map(e => ({...e, type: 'webapp'}));
      if (data.length > 0) {
        this.webAppTabShow = true;
      }
      if (data.filter(webApp => webApp.status.name === this.constants.PROJECT_DETAILS_STATUS_NEW).length > 0) {
        this.webAppNewVulns = true;
      }
    });
  }
  loadSoftVulns() {
    return this.showProjectService.getSoftVulns(this._entityId).subscribe(data => {
      this.softSource = data.map(e => ({...e, type: 'opensource'}));
      if (data.length > 0 ) {
        this.softTabShow = true;
      }
      if (data.filter(soft => soft.status.name === this.constants.PROJECT_DETAILS_STATUS_NEW).length > 0) {
        this.softNewVulns = true;
      }
    });
  }
  loadCodeVulns() {
    return this.showProjectService.getCodeVulns(this._entityId).subscribe(data => {
      this.codeSource = data.map(e => ({...e, type: 'code'}));
      if (data.length > 0) {
        this.codeTabShow = true;
      }
      if (data.filter(code => code.status.name === this.constants.PROJECT_DETAILS_STATUS_NEW).length > 0) {
        this.codeNewVulns = true;
      }
    });
  }

  ngOnInit() {
  }
  createTableSettings() {
    const that = this;
    const bugTracking = {
      title: this.constants.PROJECT_ISSUE_TICKET,
      type: 'custom',
      width: '15%',
      renderComponent: BugComponent,
      onComponentInitFunction(instance) {
        instance.refresh.subscribe((row) => {
          if (row.type === 'infra') {
            that.loadInfraVulns();
          } else if (row.type === 'webapp') {
            that.loadWebApps();
          } else if (row.type === 'code') {
            that.loadCodeVulns();
          } else {
            that.loadSoftVulns();
          }
        });
      },
    };
    this.infraSettings = {
      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      columns: {
        status: {
          title: ' ',
          type: 'custom',
          renderComponent: NewIconComponent,
          filter: false,
          width: '10%',
        },
        intf: {
          title: this.constants.PROJECT_DETAILS_LOCATION,
          valuePrepareFunction: (cell, row) => (row.intf.privateip === row.intf.asset.name ? row.intf.privateip :
            row.intf.asset.name + ' (' + row.intf.privateip + ')'),
          filterFunction: (intf?: any, search?: string) => {
            return intf.privateip.indexOf(search) > -1 || intf.asset.name.indexOf(search) > -1;
          },
          type: 'string',
          width: '20%',
        },
        name: {
          title: this.constants.PROJECT_DETAILS_NAME,
          type: 'string',
          width: '40%',
        },
        threat: {
          title: this.constants.PROJECT_DETAILS_SEVERITY,
          type: 'custom',
          width: '15%',
          renderComponent: AlertColorComponent,
        },
        inserted: {
          title: this.constants.PROJECT_DETAILS_LASTSEEN,
          type: 'date',
          width: '15%',
        },
        ...(this.bugTrackers.filter(bt => bt.vulns === 'infra').length > 0 ? {bug: bugTracking} : {}),
      },
    };
    this.softSettings = {
      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      columns: {
        status: {
          title: ' ',
          type: 'custom',
          renderComponent: NewIconComponent,
          filter: false,
          width: '10%',
        },
        intf: {
          title: this.constants.PROJECT_DETAILS_LOCATION,
          valuePrepareFunction: (cell, row) => row.codeProject.name + ' - ' +
            row.softwarePacketVulnerability.softwarepacket.name,
          type: 'string',
          width: '20%',
        },
        name: {
          title: this.constants.PROJECT_DETAILS_NAME,
          valuePrepareFunction: (cell, row) => row.softwarePacketVulnerability.name,
          type: 'string',
          width: '40%',
        },
        threat: {
          title: this.constants.PROJECT_DETAILS_SEVERITY,
          valuePrepareFunction: (cell, row) => row.softwarePacketVulnerability.severity,
          type: 'custom',
          width: '15%',
          renderComponent: AlertColorComponent,
        },
        inserted: {
          title: this.constants.PROJECT_DETAILS_LASTSEEN,
          valuePrepareFunction: (cell, row) => row.softwarePacketVulnerability.inserted,
          type: 'date',
          width: '15%',
        },
        ...(this.bugTrackers.filter(bt => bt.vulns === 'opensource').length > 0 ? {bug: bugTracking} : {}),
      },
    };
    this.codeSettings = {
      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      columns: {
        status: {
          title: ' ',
          type: 'custom',
          renderComponent: NewIconComponent,
          filter: false,
          width: '10%',
        },
        project: {
          title: this.constants.PROJECT_DETAILS_PROJECT,
          valuePrepareFunction: (cell, row) => (row.codeProject ? row.codeProject.name + '[' +
            row.codeProject.codeGroup.name + ']' : row.codeGroup.name),
          type: 'string',
          width: '20%',
        },
        filePath: {
          title: this.constants.PROJECT_DETAILS_LOCATION,
          type: 'string',
          width: '20%',
        },
        name: {
          title: this.constants.PROJECT_DETAILS_NAME,
          type: 'string',
          width: '40%',
        },
        severity: {
          title: this.constants.PROJECT_DETAILS_SEVERITY,
          type: 'custom',
          width: '15%',
          renderComponent: AlertColorComponent,
        },
        analysis: {
          title: this.constants.PROJECT_DETAILS_ANALYSIS,
          type: 'custom',
          width: '15%',
          renderComponent: AnalysisColorComponent,
        },
        inserted: {
          title: this.constants.PROJECT_DETAILS_LASTSEEN,
          type: 'date',
          width: '15%',
        },
        ...(this.bugTrackers.filter(bt => bt.vulns === 'code').length > 0 ? {bug: bugTracking} : {}),
      },
    };
    this.webAppSettings = {
      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      columns: {
        status: {
          title: ' ',
          type: 'custom',
          renderComponent: NewIconComponent,
          filter: false,
          width: '10%',
        },
        location: {
          title: this.constants.PROJECT_DETAILS_LOCATION,
          type: 'string',
          width: '20%',
        },
        name: {
          title: this.constants.PROJECT_DETAILS_NAME,
          type: 'string',
          width: '40%',
        },
        severity: {
          title: this.constants.PROJECT_DETAILS_SEVERITY,
          type: 'custom',
          width: '15%',
          renderComponent: AlertColorComponent,
        },
        webApp: {
          title: this.constants.PROJECT_DETAILS_LASTSEEN,
          valuePrepareFunction: (webApp) => {
            return webApp.lastExecuted;
          },
          filterFunction: (webApp?: any, search?: string) => {
            return webApp.lastExecuted.indexOf(search) > -1;
          },
          type: 'date',
          width: '15%',
        },
        ...(this.bugTrackers.filter(bt => bt.vulns === 'webapp').length > 0 ? {bug: bugTracking} : {}),
      },
    };
    this.auditSettings = {
      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      columns: {
        nodeName: {
          title: this.constants.PROJECT_DETAILS_NODE,
          valuePrepareFunction: (cell, row) => row.node.name,
          type: 'string',
          width: '10%',
        },
        nodeType: {
          title: this.constants.PROJECT_DETAILS_TYPE,
          valuePrepareFunction: (cell, row) => row.node.type,
          type: 'string',
          width: '20%',
        },
        reqCode: {
          title: this.constants.PROJECT_DETAILS_CODE,
          valuePrepareFunction: (cell, row) => row.requirement.code,
          type: 'string',
          width: '5%',
        },
        reqName: {
          title: this.constants.PROJECT_DETAILS_REQUIREMENT,
          valuePrepareFunction: (cell, row) => row.requirement.name,
          type: 'string',
          width: '40%',
        },
        score: {
          title: this.constants.PROJECT_DETAILS_SCORE,
          type: 'custom',
          renderComponent: AuditResultColorComponent,
          width: '10%',
        },
        updated: {
          title: this.constants.PROJECT_DETAILS_LASTSEEN,
          type: 'date',
          width: '15%',
        },
      },
    };
  }
  downloadCSV() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      headers: [
        this.constants.PROJECT_DETAILS_LOCATION,
        this.constants.PROJECT_DETAILS_NAME,
        this.constants.PROJECT_DETAILS_DESCRIPTION,
        this.constants.PROJECT_DETAILS_SEVERITY,
        this.constants.PROJECT_DETAILS_LASTSEEN,
      ],
    };
    if (this.activeTab === 1) {
      new Angular5Csv(this.getExportedValuesForInfra(), 'report', options);
    } else if (this.activeTab === 2) {
      new Angular5Csv(this.getExportedValuesForWeb(), 'report', options);
    } else if (this.activeTab === 3) {
      new Angular5Csv(this.getExportedValuesForCode(), 'report', options);
    }
  }
  getExportedValuesForInfra() {
    const data = [];
    for (const row of this.infraSource){
      data.push({
          interf: row.intf.privateip + '(' + row.intf.asset.name + ')',
          vulnName: row.name,
          desc: row.description.replace(/(\r\n|\n|\r)/gm, ''),
          severity: row.threat,
          inserted: row.inserted,
        });
    }
    return data;
  }
  getExportedValuesForCode() {
    const data = [];
    for (const row of this.codeSource){
      data.push({
        interf: row.codeGroup.name + '(' + row.filePath + ')',
        vulnName: row.name,
        desc: 'Analysis is: ' + row.analysis,
        severity: row.severity,
        inserted: row.inserted,
      });
    }
    return data;
  }
  getExportedValuesForWeb() {
    const data = [];
    for (const row of this.webAppSource){
      data.push({
        interf: row.webApp.url,
        vulnName: row.name,
        desc: row.description.replace(/(\r\n|\n|\r)/gm, ''),
        severity: row.severity,
        inserted: row.webApp.lastExecuted,
      });
    }
    return data;
  }

  onChangeTab($event: any) {
    if ($event.tabTitle.startsWith('Infra')) {
      this.activeTab = 1;
    } else if ($event.tabTitle.startsWith('Web')) {
      this.activeTab = 2;
    } else if ($event.tabTitle.startsWith('Kod')) {
      this.activeTab = 3;
    }
  }
}
