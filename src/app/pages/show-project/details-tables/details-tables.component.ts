import {Component, OnInit} from '@angular/core';
import {AlertColorComponent} from '../../extra-components/alert-color.component';
import {DetailsComponent} from '../../extra-components/details-component';
import {DescriptionToggleComponent} from '../../extra-components/description-toggle.component';
import {AuditResultColorComponent} from '../../extra-components/audit-result-color.component';
import {ShowProjectService} from '../../../@core/service/ShowProjectService';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AnalysisColorComponent} from '../../extra-components/analysis-color.component';
import {Angular5Csv} from 'angular5-csv/dist/Angular5-csv';
import {ProjectConstants} from '../../../@core/constants/ProjectConstants';
import {BugComponent} from '../../extra-components/bug-component';
import {Vulnerability} from '../../../@core/Model/Vulnerability';
import {LocalDataSource} from 'ng2-smart-table';
import {VulnerabilitySourceComponent} from '../../extra-components/vulnerability-source-component';
import {StatusComponent} from '../../extra-components/status-component';


@Component({
  selector: 'ngx-details-tables',
  templateUrl: './details-tables.component.html',
  styleUrls: ['./details-tables.component.scss'],
  entryComponents: [AlertColorComponent, DetailsComponent, DescriptionToggleComponent, AuditResultColorComponent,
    AnalysisColorComponent, BugComponent, VulnerabilitySourceComponent, StatusComponent],
})
export class DetailsTablesComponent implements OnInit {
  source: LocalDataSource;
  types: string[];
  vulnerabilities: Vulnerability[];
  vulnerabilitiesPojo: any = [];
  vulnerabilitiesSettings: any;
  _entityId: number;
  role: string;
  constants: ProjectConstants = new ProjectConstants();
  constructor( private showProjectService: ShowProjectService, private _route: ActivatedRoute, private router: Router,
               private cookieService: CookieService) {
    this.role = this.cookieService.get('role');
    this._entityId = +this._route.snapshot.paramMap.get('projectid');
    if (!this._entityId) {
      this.router.navigate(['/pages/dashboard']);
    }
    this.createTableSettings();
    this.loadVulns();
    this.loadAudit();
  }
  loadAudit() {
    return this.showProjectService.getAuditVulns(this._entityId).subscribe(data => {
    });
  }
  loadVulns() {
    return this.showProjectService.getVulnerabilities(this._entityId).subscribe(data => {
      this.vulnerabilities = data;
      for (const vulnerability of data) {
        const vuln = {
          projectId: this._entityId,
          id: vulnerability.id,
          name: vulnerability.vulnerability.name,
          location: vulnerability.location,
          severity: vulnerability.severity,
          grade: vulnerability.grade,
          status: vulnerability.status.name,
          analysis: vulnerability.analysis,
          inserted: vulnerability.inserted,
          source: vulnerability.vulnerabilitySource.name,
        };
        this.vulnerabilitiesPojo.push(vuln);
        this.source = new LocalDataSource(this.vulnerabilitiesPojo);
      }
    });
  }
  ngOnInit() {
  }
  createTableSettings() {
    this.vulnerabilitiesSettings = {
      actions: false,
      columns: {
        details: {
          title: ' ',
          type: 'custom',
          renderComponent: DetailsComponent,
          filter: false,
          width: '5%',
        },
        status: {
          title: 'Status',
          type: 'custom',
          renderComponent: StatusComponent,
          width: '5%',
          filter: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: [
                {value: 'New', title: 'New'},
                {value: 'Existing', title: 'Existing'},
              ],
            },
          },
        },
        source: {
          title: 'Source',
          type: 'custom',
          renderComponent: VulnerabilitySourceComponent,
          width: '5%',
          filter: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: [
                {value: 'Network', title: 'Network'},
                {value: 'SourceCode', title: 'SourceCode'},
                {value: 'WebApplication', title: 'WebApplication'},
                {value: 'OpenSource', title: 'OpenSource'},
              ],
            },
          },
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
          width: '10%',
          renderComponent: AlertColorComponent,
          sortDirection: 'desc',
          compareFunction: (direction: any, a: any, b: any) => {
            let first = 0;
            let second = 0;
            if (a.toLowerCase() === 'critical') {
              first = 4;
            } else if (a.toLowerCase() === 'high') {
              first = 3;
            } else if (a.toLowerCase() === 'medium') {
              first = 2;
            } else {
              first = 1;
            }
            if (b.toLowerCase() === 'critical') {
              second = 4;
            } else if (b.toLowerCase() === 'high') {
              second = 3;
            } else if (b.toLowerCase() === 'medium') {
              second = 2;
            } else {
              second = 1;
            }
            if (first < second) {
              return -1 * direction;
            }
            if (first > second) {
              return direction;
            }
            return 0;
          },
          filter: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: [
                {value: 'Critical', title: 'Critical'},
                {value: 'High', title: 'High'},
                {value: 'Medium', title: 'Medium'},
                {value: 'Low', title: 'Low'},
              ],
            },
          },
        },
        inserted: {
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
        this.constants.PROJECT_DETAILS_STATUS,
        this.constants.PROJECT_DETAILS_SEVERITY,
        this.constants.PROJECT_DETAILS_LASTSEEN,
      ],
    };
     new Angular5Csv(this.getExportedValues(), 'report', options);
  }

  getExportedValues() {
    const data = [];
    // @ts-ignore
    for (const row of this.source.getFilteredAndSorted().__zone_symbol__value) {
      data.push({
        interf: row.location,
        vulnName: row.name,
        status: row.status,
        severity: row.severity,
        inserted: row.inserted,
      });
    }
    return data;
  }
}
// @ts-ignore
