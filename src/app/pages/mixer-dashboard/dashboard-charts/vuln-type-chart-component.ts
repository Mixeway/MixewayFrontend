import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {AllSourceDataChart} from '../../../@core/Model/AllSourceDataChart';
import {DashboardService} from '../../../@core/service/DashboardService';
import {DashboardConstants} from '../../../@core/constants/DashboardConstants';

@Component({
  selector: 'ngx-vuln-type-chart-pie',
  template: `
    <chart type="pie" [data]="data" [options]="options"></chart>
  `,
})
export class VulnTypeChartComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;
  sourcesData: AllSourceDataChart;
  constants: DashboardConstants = new DashboardConstants();

  constructor(private theme: NbThemeService, private dashboardService: DashboardService) {
    this.loadSourceData();
  }
  loadSourceData() {
    return this.dashboardService.getSourceTrendData().subscribe(data => {
      this.sourcesData = data;
      this.drawChart();
    });
  }

  ngOnDestroy(): void {
  }
  drawChart() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: [this.constants.DASHBOARD_CHART_SOURCE_AUDIT,
          this.constants.DASHBOARD_CHART_SOURCE_WEBAPP,
          this.constants.DASHBOARD_CHART_SOURCE_INFRA,
          this.constants.DASHBOARD_CHART_SOURCE_CODE,
          this.constants.DASHBOARD_CHART_SOURCE_OPENSOURCE],
        datasets: [{
          data: [this.sourcesData.audit, this.sourcesData.webApp, this.sourcesData.infra, this.sourcesData.code,
            this.sourcesData.soft],
          backgroundColor: [colors.primaryLight, colors.infoLight, colors.successLight, '#DF7401', '#3E24DD'],
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
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
