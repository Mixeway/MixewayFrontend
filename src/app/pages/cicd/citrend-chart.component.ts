import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  NbThemeService,
  NbColorHelper,
} from '@nebular/theme';
import {CiOpeerationsService} from '../../@core/service/CiOpeerationsService';
import {AllVulnTrendData} from '../../@core/Model/AllVulnTrendData';
import {CicdConstants} from '../../@core/constants/CicdConstants';

@Component({
  selector: 'ngx-citrend-chart-line',
  template: `
    <chart *ngIf="trendResponse?.length > 0" type="line" [data]="data" [options]="options"></chart>
    <nb-alert status="info" *ngIf="trendResponse?.length == 0">
        {{constants.CICD_CHART_NODATA}}</nb-alert>
  `,
})
export class CitrendChartComponent implements OnDestroy, OnInit {
  data: any;
  options: any;
  themeSubscription: any;
  trendResponse: AllVulnTrendData[] = [];
  index = 1;
  constants: CicdConstants = new CicdConstants();

  constructor(private theme: NbThemeService,
               private ciOperationsService: CiOpeerationsService) {
    this.loadTrendData();
  }

  ngOnDestroy(): void {
  }
  loadTrendData() {
    return this.ciOperationsService.getTrends().subscribe(data => {
      this.trendResponse = data.reverse();
      this.drawChart();
    });
  }
  setData(data) {
    this.trendResponse = data;
  }
  ngOnInit(): void {

  }
  drawChart() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: this.trendResponse.map(function(item) {
          return item.date;
        }),
        datasets: [{
          data: this.trendResponse.map(function(item) {
            return item.value;
          }),
          label: this.constants.CICD_CHART_TREND_TITLE,
          backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
          borderColor: colors.primary,
        },
        ],
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }
}
