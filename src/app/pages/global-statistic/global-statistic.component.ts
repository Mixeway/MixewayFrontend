import { Component, OnInit } from '@angular/core';
import {Angular5Csv} from 'angular5-csv/dist/Angular5-csv';
import {VulnsService} from '../../@core/service/VulnsService';

@Component({
  selector: 'ngx-global-statistic',
  templateUrl: './global-statistic.component.html',
  styleUrls: ['./global-statistic.component.scss'],
})
export class GlobalStatisticComponent implements OnInit {
  option: any;
  vulnSettings: any;
  vulns: GlobalStatistic[] = [];
  combinedVulns: any = [];
  combinedVulnsLimited: any = [];
  constructor(private vulnService: VulnsService) {
    this.getData();
  }

  ngOnInit(): void {
  }
  prepareDataForChart() {
    for (const project of this.vulns) {
      this.combinedVulns.push(
        {
          name: project.project,
          vuln: project.scaVulns + project.codeVulns,
          sca: project.scaVulns,
          code: project.codeVulns,
        },
      );
    }
    this.combinedVulns.sort((a, b) => a.vuln < b.vuln);
    this.combinedVulnsLimited = this.combinedVulns.slice(0, 15);
    this.prepareOption();
  }
  getData() {

    return this.vulnService.getGlobalStatistics().subscribe(data => {
      this.vulns = data;
      this.prepareDataForChart();
    });
  }
  prepareOption() {
    this.option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['OpenSource', 'Source Code'],
      },
      xAxis: {
        data: this.combinedVulnsLimited.map(v => v.name),
      },
      yAxis: {},
      series: [
        {
          name: 'OpenSource',
          data: this.combinedVulnsLimited.map(v => v.sca),
          type: 'bar',
          stack: 'x',
          itemStyle: {color: '#2e89db'},
        },
        {
          name: 'Source Code',
          data: this.combinedVulnsLimited.map(v => v.code),
          type: 'bar',
          stack: 'x',
          itemStyle: {color: '#ce9517'},
        },
      ],
    };

    this.vulnSettings = {
      actions: false,
      columns: {
        project: {
          title: 'Project name',
          filter: false,
        },
        scaVulns: {
          title: 'OpenSource Vulns',
          filter: false,
        },
        codeVulns: {
          title: 'Source Code Vulns',
          filter: false,
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
        'Project',
        'Source Code Vulnerabilities',
        'OpenSource Vulnerabilities',
      ],
    };
    new Angular5Csv(this.vulns, 'report', options);
  }
}
