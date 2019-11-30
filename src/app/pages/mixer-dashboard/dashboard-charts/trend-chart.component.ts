import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  NbThemeService,
  NbColorHelper,
} from '@nebular/theme';
import {DashboardService} from '../../../@core/service/DashboardService';
import {AllVulnTrendData} from '../../../@core/Model/AllVulnTrendData';
import {DashboardConstants} from '../../../@core/constants/DashboardConstants';

@Component({
  selector: 'ngx-trend-chart-line',
  template: `
    <chart type="line" [data]="data" [options]="options" *ngIf="trendResponse.length > 0"></chart>
    <nb-alert status="info" *ngIf="trendResponse.length == 0">{{constants.DASHBOARD_CHART_TREND_NODATA}}</nb-alert>
  `,
})
export class TrendChartComponent implements OnDestroy, OnInit {
  data: any;
  options: any;
  themeSubscription: any;
  trendResponse: AllVulnTrendData[] = [];
  index = 1;
  constants: DashboardConstants = new DashboardConstants();

  constructor(private theme: NbThemeService,
               private dashboardService: DashboardService) {
    this.loadTrendData();
  }

  ngOnDestroy(): void {
  }
  loadTrendData() {
    return this.dashboardService.getTrendData().subscribe(data => {
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
          label: this.constants.DASHBOARD_CHART_TREND_VULNS,
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
