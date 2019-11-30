import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {ShowProjectService} from '../../../@core/service/ShowProjectService';
import {ActivatedRoute, Router} from '@angular/router';
import {Severities} from '../../../@core/Model/Severities';
import {ProjectConstants} from '../../../@core/constants/ProjectConstants';

@Component({
  selector: 'ngx-vuln-trend-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class VulnTrendPieComponent implements OnDestroy {
  options: any = {};
  themeSubscription: any;
  _entityId: number;
  severities: Severities;
  constants: ProjectConstants = new ProjectConstants();

  constructor(private theme: NbThemeService, private showProjectService: ShowProjectService,
              private _route: ActivatedRoute, private router: Router) {
    this._entityId = +this._route.snapshot.paramMap.get('projectid');
    if (!this._entityId) {
      this.router.navigate(['/pages/dashboard']);
    }
    this.loadSeveritiesChart();
  }
  loadSeveritiesChart() {
    return this.showProjectService.getSeverityChart(this._entityId).subscribe(data => {
      this.severities = data;
      this.drawChart();
    });
  }

  drawChart() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [ colors.successLight, colors.primaryLight, colors.warningLight, colors.dangerLight ].reverse(),
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Low', 'Medium', 'High', 'Critic'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: this.constants.PROJECT_CHARTS_SEVERITY_TITLE,
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              {
                'name': 'Critic',
                'value': this.severities.Critical,
              },
              {
                'name': 'High',
                'value': this.severities.High,
              },
              {
                'name': 'Medium',
                'value': this.severities.Medium,
              },
              {
                'name': 'Low',
                'value': this.severities.Low,
              },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
  }
}
