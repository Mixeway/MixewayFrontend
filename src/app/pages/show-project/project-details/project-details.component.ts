import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProjectStats} from '../../../@core/Model/ProjectStats';
import {ProjectInfo} from '../../../@core/Model/ProjectInfo';
import {delay} from 'rxjs/operators';
import {NbThemeService} from '@nebular/theme';


@Component({
  selector: 'ngx-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
  options: any;
  grade: any;
  gradeColor: any;
  @Input()
  projectStats: ProjectStats;
  @Input()
  projectInfo: ProjectInfo;
  option: any = {};
  private value = 0;
  themeSubscription: any;
  @Input('chartValue')
  set chartValue(value: number) {
    this.value = value;

    if (this.option.series) {
      this.option.series[0].data[0].value = value;
      this.option.series[0].data[1].value = 100 - value;
      this.option.series[1].data[0].value = value;
    }
  }

  constructor(private theme: NbThemeService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    if (this.projectInfo.risk === 0) {
      this.grade = 'A+';
      this.gradeColor = '#88f151';
    } else if (this.projectInfo.risk < 20) {
      this.grade = 'A';
      this.gradeColor = '#31730f';
    } else if (this.projectInfo.risk < 40) {
      this.grade = 'B';
      this.gradeColor = '#ead680';
    } else if (this.projectInfo.risk < 70) {
      this.grade = 'C';
      this.gradeColor = '#f3751d';
    } else {
      this.grade = 'D';
      this.gradeColor = '#ee0711';
    }
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {
      const solarTheme: any = config.variables.solar;

      this.option = Object.assign({}, {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        series: [
          {
            name: ' ',
            clockWise: true,
            hoverAnimation: false,
            type: 'pie',
            center: ['45%', '50%'],
            radius: solarTheme.radius,
            data: [
              {
                value: this.value,
                name: ' ',
                label: {
                  normal: {
                    position: 'center',
                    formatter: this.grade + '\n grade',
                    textStyle: {
                      fontSize: '20',
                      fontFamily: config.variables.fontSecondary,
                      fontWeight: '600',
                      color: this.gradeColor,
                    },
                  },
                },
                tooltip: {
                  show: false,
                },
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: solarTheme.gradientLeft,
                      },
                      {
                        offset: 1,
                        color: solarTheme.gradientRight,
                      },
                    ]),
                    shadowColor: solarTheme.shadowColor,
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    shadowOffsetY: 3,
                  },
                },
                hoverAnimation: false,
              },
              {
                value: 100 - this.value,
                name: ' ',
                tooltip: {
                  show: false,
                },
                label: {
                  normal: {
                    position: 'inner',
                  },
                },
                itemStyle: {
                  normal: {
                    color: solarTheme.secondSeriesFill,
                  },
                },
              },
            ],
          },
          {
            name: ' ',
            clockWise: true,
            hoverAnimation: false,
            type: 'pie',
            center: ['45%', '50%'],
            radius: solarTheme.radius,
            data: [
              {
                value: this.value,
                name: ' ',
                label: {
                  normal: {
                    position: 'inner',
                    show: false,
                  },
                },
                tooltip: {
                  show: false,
                },
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: solarTheme.gradientLeft,
                      },
                      {
                        offset: 1,
                        color: solarTheme.gradientRight,
                      },
                    ]),
                    shadowColor: solarTheme.shadowColor,
                    shadowBlur: 7,
                  },
                },
                hoverAnimation: false,
              },
              {
                value: 28,
                name: ' ',
                tooltip: {
                  show: false,
                },
                label: {
                  normal: {
                    position: 'inner',
                  },
                },
                itemStyle: {
                  normal: {
                    color: 'none',
                  },
                },
              },
            ],
          },
        ],
      });
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

}
