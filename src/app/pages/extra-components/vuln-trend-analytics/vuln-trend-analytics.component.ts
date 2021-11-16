import {Component, Input, OnDestroy} from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NbThemeService } from '@nebular/theme';
import { OutlineData } from '../../../@core/data/trend-analytics';
import { forkJoin } from 'rxjs';
import {TrendDataService} from '../../../@core/service/trend-data.service';
import {DashboardService} from '../../../@core/service/DashboardService';
import {AllVulnTrendData} from '../../../@core/Model/AllVulnTrendData';


@Component({
  selector: 'ngx-dashboard-vuln-trend-analytics',
  styleUrls: ['./vuln-trend-analytics.component.scss'],
  templateUrl: './vuln-trend-analytics.component.html',
})
export class VulnTrendAnalyticsComponent implements OnDestroy {
  private alive = true;
  @Input() trendResponse: AllVulnTrendData[];
  @Input() sourceData: any;
  @Input() trendType: string;
  @Input() pieTitle: string;
  pieChartValue: number;
  chartLegend: {iconColor: string; title: string}[];
  visitorsAnalyticsData: { innerLine: number[]; outerLine: OutlineData[]; };

  constructor(private themeService: NbThemeService,
              private visitorsAnalyticsChartService: TrendDataService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive));

    forkJoin(
      this.visitorsAnalyticsChartService.getInnerLineChartData(),
      this.visitorsAnalyticsChartService.getOutlineLineChartData(),
      this.visitorsAnalyticsChartService.getPieChartData(),
    )
      .pipe(takeWhile(() => this.alive))
      .subscribe(([innerLine, outerLine, pieChartValue]: [number[], OutlineData[], number]) => {
        this.visitorsAnalyticsData = {
          innerLine: innerLine,
          outerLine: outerLine,
        };

        this.pieChartValue = pieChartValue;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
