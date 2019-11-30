import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {CiResult} from '../../@core/Model/CiResult';
import {CiOpeerationsService} from '../../@core/service/CiOpeerationsService';
import {CicdConstants} from '../../@core/constants/CicdConstants';

@Component({
  selector: 'ngx-ciresult-chart-pie',
  template: `
    <chart *ngIf="sourcesData?.ok > 0 || sourcesData?.notOk > 0" type="pie" [data]="data" [options]="options"></chart>
    <nb-alert status="info" *ngIf="sourcesData?.ok == 0 && sourcesData?.notOk == 0">
        {{constants.CICD_CHART_NODATA}}</nb-alert>
  `,
})
export class CiresultChartComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;
  sourcesData: CiResult;
  constants: CicdConstants = new CicdConstants();

  constructor(private theme: NbThemeService, private ciOperationsService: CiOpeerationsService) {
    this.loadSourceData();
  }
  loadSourceData() {
    return this.ciOperationsService.getResults().subscribe(data => {
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
        labels: [this.constants.CICD_CHART_SUCCESS, this.constants.CICD_CHART_REJECTIONS],
        datasets: [{
          data: [this.sourcesData.ok, this.sourcesData.notOk],
          backgroundColor: [colors.successLight, '#e60000'],
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
