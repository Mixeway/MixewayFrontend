import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {ProjectInfo} from '../../../@core/Model/ProjectInfo';

@Component({
  selector: 'ngx-project-risk-chart',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class ProjectRiskChartComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  @Input()
  projectInfo: ProjectInfo;
  grade: string;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    if (this.projectInfo.risk === 0) {
      this.grade = 'A+';
    } else if (this.projectInfo.risk < 20) {
      this.grade = 'A';
    } else if (this.projectInfo.risk < 40) {
      this.grade = 'B';
    } else if (this.projectInfo.risk < 70) {
      this.grade = 'C';
    } else {
      this.grade = 'D';
    }

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        series: [
          {
            type: 'gauge',
            axisLine: {
              lineStyle: {
                width: 30,
                color: [
                  [0.2, '#6de22f'],
                  [0.4, '#1ca3dc'],
                  [0.7, '#dc6322'],
                  [1, '#ee0711'],
                ],
              },
            },
            pointer: {
              itemStyle: {
                color: 'auto',
              },
            },
            axisTick: {
              distance: -30,
              length: 8,
              lineStyle: {
                color: '#fff',
                width: 2,
              },
            },
            splitLine: {
              distance: -30,
              length: 30,
              lineStyle: {
                color: '#fff',
                width: 4,
              },
            },
            detail: {
              valueAnimation: true,
              formatter: 'Grade \n' + this.grade,
              color: 'auto',
              fontWeight: 'bold',
              fontSize: '35',
            },
            data: [
              {
                value: this.projectInfo.risk,
              },
            ],
          },
        ],
      };

    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
