import {AfterViewInit, Component, OnInit} from '@angular/core';
import {VulnsService} from '../../@core/service/VulnsService';
import {NbThemeService} from '@nebular/theme';
import {BarChartValues2} from '../../@core/Model/BarChartValues2';
import {VulnsConstants} from '../../@core/constants/VulnsConstants';

@Component({
  selector: 'ngx-vulns',
  templateUrl: './vulns.component.html',
  styleUrls: ['./vulns.component.scss'],
})
export class VulnsComponent implements OnInit, AfterViewInit {
  showingInfra: boolean = true;
  showingWebApps: boolean = false;
  showingCodes: boolean = false;
  showingOpenSource: boolean = false;
  themeSubscription: any;
  optionsVulns: any;
  optionsTargets: any;
  vulns: BarChartValues2[];
  targets: BarChartValues2[];
  constants: VulnsConstants = new VulnsConstants();
  vulnsSource: any;
  targetSource: any;
  vulnsSettings = {
    actions: false,
    columns: {
      namee: {
        title: 'Vulnerability name',
        filter: false,
      },
      value: {
        title: 'Occurrences',
        filter: false,
      },
    },
  };
  targetSettings = {
    actions: false,
    columns: {
      namee: {
        title: 'Target name',
        filter: false,
      },
      value: {
        title: 'Occurrences',
        filter: false,
      },
    },

  };

  constructor(private vulnsService: VulnsService, private theme: NbThemeService) {
    this.loadInfraTargets();
    this.loadInfraVulns();
  }
  loadCodeVulns() {
    return this.vulnsService.getCodeVulns().subscribe(data => {
      this.vulns = data;
      this.drawVulnsChart();
    });
  }
  loadCodeTargets() {
    return this.vulnsService.getCodeTargets().subscribe(data => {
      this.targets = data;
      this.drawTargetsChart();
    });
  }
  loadInfraVulns() {
    return this.vulnsService.getInfraVulns().subscribe(data => {
      this.vulns = data;
      this.drawVulnsChart();
    });
  }
  loadInfraTargets() {
    return this.vulnsService.getInfraTargets().subscribe(data => {
      this.targets = data;
      this.drawTargetsChart();
    });
  }
  loadWebVulns() {
    return this.vulnsService.getWebVulns().subscribe(data => {
      this.vulns = data;
      this.drawVulnsChart();
    });
  }
  loadWebApps() {
    return this.vulnsService.getWebTargets().subscribe(data => {
      this.targets = data;
      this.drawTargetsChart();
    });
  }
  loadOpenSourceVulns() {
    return this.vulnsService.getOpenSourceVulns().subscribe(data => {
      this.vulns = data;
      this.drawVulnsChart();
    });
  }
  loadOpenSourceVulnsForCodeProject() {
    return this.vulnsService.getOpenSourceVulnsForCodeProject().subscribe(data => {
      this.targets = data;
      this.drawTargetsChart();
    });
  }

  ngOnInit() {
  }

  showInfra() {
    this.showingInfra = true;
    this.showingCodes = false;
    this.showingWebApps = false;
    this.showingOpenSource = false;
    this.loadInfraTargets();
    this.loadInfraVulns();
  }

  showWebApp() {
    this.showingInfra = false;
    this.showingCodes = false;
    this.showingWebApps = true;
    this.showingOpenSource = false;
    this.loadWebApps();
    this.loadWebVulns();
  }

  showCode() {
    this.showingInfra = false;
    this.showingCodes = true;
    this.showingWebApps = false;
    this.showingOpenSource = false;
    this.loadCodeTargets();
    this.loadCodeVulns();
  }
  showOpenSource() {
    this.showingInfra = false;
    this.showingCodes = false;
    this.showingWebApps = false;
    this.showingOpenSource = true;
    this.loadOpenSourceVulns();
    this.loadOpenSourceVulnsForCodeProject();
  }
  ngAfterViewInit() {
  }
  drawTargetsChart() {
    this.targetSource = this.targets;
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;
      this.optionsTargets = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: this.targets.map(function (a) {
              return a.namee;
            }),
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: this.constants.VULNS_PERPRO_NUMBERS,
            type: 'bar',
            barWidth: '60%',
            data: this.targets.map(function (a) {
              return a.value;
            }),
          },
        ],
      };
    });
  }
  drawVulnsChart() {
    this.vulnsSource = this.vulns;
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;
      this.optionsVulns = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: this.vulns.map(function(a) {return a.namee; }),
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: this.constants.VULNS_PERVULN_NUMBERS,
            type: 'bar',
            barWidth: '60%',
            data: this.vulns.map(function(a) {return a.value; }),
          },
        ],
      };
    });
  }


}
