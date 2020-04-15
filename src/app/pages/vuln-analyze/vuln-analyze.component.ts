import { Component, OnInit } from '@angular/core';
import {VulnAnalyzeService} from '../../@core/service/VulnAnalyzeService';
import {VulnAnalyze} from '../../@core/Model/VulnAnalyze';

@Component({
  selector: 'ngx-vuln-analyze',
  templateUrl: './vuln-analyze.component.html',
  styleUrls: ['./vuln-analyze.component.scss'],
})
export class VulnAnalyzeComponent implements OnInit {
  webVulns: VulnAnalyze[];
  codeVulns: VulnAnalyze[];
  infraVulns: VulnAnalyze[];
  osVulns: VulnAnalyze[];
  settings: any;
  infraSelected: any;
  webSelected: any;
  codeSelected: any;
  OSSelected: any;

  constructor(private vulnAnaluzeService: VulnAnalyzeService) {
    this.setSettings();
  }

  ngOnInit(): void {
    this.getVulnsCode();
    this.getVulnsInfra();
    this.getVulnsWeb();
    this.getVulnsOS();
  }
  getVulnsInfra() {
    return this.vulnAnaluzeService.getInfraVulns().subscribe(data => {
      this.infraVulns = data.vulnerabilities.filter(vuln => vuln.grade === -1);
    });
  }
  getVulnsWeb() {
    return this.vulnAnaluzeService.getWebAppVulns().subscribe(data => {
      this.webVulns = data.vulnerabilities.filter(vuln => vuln.grade === -1);
    });
  }
  getVulnsCode() {
    return this.vulnAnaluzeService.getCodeVulns().subscribe(data => {
      this.codeVulns = data.vulnerabilities.filter(vuln => vuln.grade === -1);
    });
  }
  getVulnsOS() {
    return this.vulnAnaluzeService.getOpenSourceVulns().subscribe(data => {
      this.osVulns = data.vulnerabilities.filter(vuln => vuln.grade === -1);
    });
  }
  setSettings() {
    this.settings = {
      selectMode: 'multi',
      mode: 'external',
      actions: false,
      pager: {
        display: true,
        perPage: 100,
      },
      columns: {
        source: {
          title: 'Source',
          valuePrepareFunction: (cell, row) => ((row.ipAddress ? row.ipAddress : '') + ' ' +
          (row.baseURL ? row.baseURL : '') + ' ' +
          (row.packetName ? row.packetName : '') + ' ' +
          (row.project ? row.project : '' )),
          type: 'string',
          width: '20%',
        },
        vulnerabilityName: {
          title: 'Vuln Name',
          type: 'string',
          width: '40%',
        },
        severity: {
          title: 'Severity',
          type: 'string',
          width: '15%',
        },
        grade: {
          title: 'Grade',
          type: 'string',
          width: '15%',
        },
        dateCreated: {
          title: 'DateCreated',
          type: 'date',
          width: '15%',
        },
      },
    };
  }

  refreshInfra() {
    this.getVulnsInfra();
  }

  confirmInfra() {
    for (const v of this.infraSelected) {
      this.vulnAnaluzeService.setGradeeForInfrastructureVuln(v.id, 1).subscribe(() => {
        });
    }
   this.getVulnsInfra();
  }

  denyInfra() {
    for (const v of this.infraSelected) {
      this.vulnAnaluzeService.setGradeeForInfrastructureVuln(v.id, 0).subscribe(() => {
      });
    }
    this.getVulnsInfra();
  }

  onInfraVulnSelect(event) {
    this.infraSelected = event.selected;
  }
  onWebVulnSelect(event) {
    this.webSelected = event.selected;
  }
  onCodeVulnSelect(event) {
    this.codeSelected = event.selected;
  }
  onOSVulnSelect(event) {
    this.OSSelected = event.selected;
  }

  refreshWeb() {
    this.getVulnsWeb();
  }

  confirmWeb() {
    for (const v of this.webSelected) {
      this.vulnAnaluzeService.setGradeeForWebAppVuln(v.id, 1).subscribe(() => {
      });
    }
    this.getVulnsWeb();
  }

  denyWeb() {
    for (const v of this.webSelected) {
      this.vulnAnaluzeService.setGradeeForWebAppVuln(v.id, 0).subscribe(() => {
      });
    }
    this.getVulnsWeb();
  }

  refreshCode() {
    this.getVulnsCode();
  }

  confirmCode() {
    for (const v of this.codeSelected) {
      this.vulnAnaluzeService.setGradeForCodeVuln(v.id, 1).subscribe(() => {
      });
    }
    this.getVulnsCode();
  }

  denyCode() {
    for (const v of this.codeSelected) {
      this.vulnAnaluzeService.setGradeForCodeVuln(v.id, 10).subscribe(() => {
      });
    }
    this.getVulnsCode();
  }

  refreshOS() {
    this.getVulnsOS();
  }

  confirmOS() {
    for (const v of this.OSSelected) {
      this.vulnAnaluzeService.setGradeForOpenSourceVuln(v.id, 1).subscribe(() => {
      });
    }
    this.getVulnsOS();
  }

  denyOS() {
    for (const v of this.OSSelected) {
      this.vulnAnaluzeService.setGradeForOpenSourceVuln(v.id, 0).subscribe(() => {
      });
    }
    this.getVulnsOS();
  }
}
