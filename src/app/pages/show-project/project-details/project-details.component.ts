import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProjectStats} from '../../../@core/Model/ProjectStats';
import {ProjectInfo} from '../../../@core/Model/ProjectInfo';
import {delay} from 'rxjs/operators';
import {NbThemeService} from '@nebular/theme';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'ngx-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  options: any;
  grade: any = 'A';
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
      if (this.option.series[0].data[1]) {
        this.option.series[0].data[1].value = 100 - value;
      }
      if (this.option.series[1]) {
        this.option.series[1].data[0].value = value;
      }

    }
  }

  constructor(private theme: NbThemeService, private cdr: ChangeDetectorRef) {
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();

  }

  ngOnInit(): void {
    this.drawOptions();
    this.calculateGrade();
    this.cdr.detectChanges();
  }

  calculateGrade() {
    if (this.projectInfo?.risk === 0) {
      this.grade = 'A+';
      this.gradeColor = '#88f151';
    } else if (this.projectInfo?.risk < 20) {
      this.grade = 'A';
      this.gradeColor = '#31730f';
    } else if (this.projectInfo?.risk < 40) {
      this.grade = 'B';
      this.gradeColor = '#ead680';
    } else if (this.projectInfo?.risk < 70) {
      this.grade = 'C';
      this.gradeColor = '#f3751d';
    } else {
      this.grade = 'D';
      this.gradeColor = '#ee0711';
    }
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
  drawOptions() {
    this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {
      const solarTheme: any = config.variables.solar;
      this.option = {
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            center: ['50%', '95%'],
            radius: '190%',
            min: 0,
            max: 1,
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [0.25, '#7CFFB2'],
                  [0.5, '#58D9F9'],
                  [0.75, '#FDDD60'],
                  [1, '#FF6E76'],
                ],
              },
            },
            pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '42%',
              width: 10,
              offsetCenter: [0, '-60%'],
              itemStyle: {
                color: 'auto',
              },
            },
            axisTick: {
              length: 12,
              lineStyle: {
                color: 'auto',
                width: 2,
              },
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: 'auto',
                width: 5,
              },
            },
            axisLabel: {
              color: '#464646',
              fontSize: 12,
              distance: -60,
              rotate: 'tangential',
              formatter: function (value: number) {
                if (value === 0.875) {
                  return '';
                } else if (value === 0.625) {
                  return '';
                } else if (value === 0.375) {
                  return '';
                } else if (value === 0.125) {
                  return '';
                }
                return '';
              },
            },
            title: {
              offsetCenter: [0, '-35%'],
              fontSize: 12,
            },
            detail: {
              fontSize: 30,
              offsetCenter: [0, '-35%'],
              valueAnimation: true,
              formatter: function (value: number) {
                return Math.round(value * 100) + '';
              },
              color: 'inherit',
            },
            data: [
              {
                value: (this.projectInfo.risk / 100) ,
                name: 'Threat Rating: ' + this.grade ,
              },
            ],
          },
        ],
      };
    });
  }

}
