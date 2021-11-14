import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { delay, takeWhile } from 'rxjs/operators';
import { LayoutService } from '../../../../@core/utils';
import {DashboardService} from '../../../../@core/service/DashboardService';
import {AllSourceDataChart} from '../../../../@core/Model/AllSourceDataChart';


@Component({
  selector: 'ngx-vuln-trend-statistics',
  styleUrls: ['./vuln-trend-statistics.component.scss'],
  templateUrl: './vuln-trend-statistics.component.html',
})
export class VulnTrendStatisticsComponent implements AfterViewInit, OnDestroy {

  private alive = true;

  @Input() value: number;

  option: any = {};
  chartLegend: { iconColor: string; title: string }[];
  echartsIntance: any;
  sourcesData: AllSourceDataChart;
  chartData: any = [];

  constructor(private theme: NbThemeService,
              private layoutService: LayoutService,
              private dashboardService: DashboardService) {
    this.layoutService.onSafeChangeLayoutSize()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe(() => this.resizeChart());
    this.loadSourceData();
  }

  loadSourceData() {
    return this.dashboardService.getSourceTrendData().subscribe(data => {
      if (data != null) {
        this.sourcesData = data;
        this.chartData.push({value: data.code, name: 'Source Code'});
        this.chartData.push({value: data.soft, name: 'OpenSource'});
        this.chartData.push({value: data.audit, name: 'CIS Benchmark'});
        this.chartData.push({value: data.infra, name: 'Infrastructure'});
        this.chartData.push({value: data.webApp, name: 'Web Application'});
      }
    });
  }
  ngAfterViewInit() {
    this.theme.getJsTheme()
      .pipe(
        takeWhile(() => this.alive),
        delay(1),
      )
      .subscribe(config => {
        const variables: any = config.variables;
        const colors = config.variables;
        const visitorsPieLegend: any = config.variables.visitorsPieLegend;

        this.setOptions(variables, colors);
    });
  }

  setOptions(variables, colors) {
    const visitorsPie: any = variables.visitorsPie;
    this.option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orientation: 'horizontal',
      },
      series: [
        {
          name: 'Came from:',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
            opacity: 1,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: this.chartData,
        },
      ],
    };
  }

  onChartInit(echarts) {
    this.echartsIntance = echarts;
  }

  resizeChart() {
    if (this.echartsIntance) {
      this.echartsIntance.resize();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
