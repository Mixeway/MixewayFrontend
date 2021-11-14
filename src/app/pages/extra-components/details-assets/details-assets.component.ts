import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import { ProgressInfo, StatsAssetsData } from '../../../@core/data/stats-asset';
import { takeWhile } from 'rxjs/operators';
import {StatsAssetService} from '../../../@core/service/stats-asset.service';
import {MixewayStatistics} from '../../../@core/Model/MixewayStatistics';
import {StatisticCard} from '../../../@core/Model/DashboardTopStatistics';

@Component({
  selector: 'ngx-details-assets',
  styleUrls: ['./details-assets.component.scss'],
  templateUrl: './details-assets.component.html',
})
export class DetailsAssetsComponent implements OnDestroy, OnChanges {

  private alive = true;
  @Input() statistics: StatisticCard = new StatisticCard();
  progressInfoData: ProgressInfo[];
  assetPercent: number = 0;
  webPercent: number = 0;
  codePercent: number = 0;

  constructor(private statsProgressBarService: StatsAssetService) {
    this.statistics.projects = 0;
    this.statistics.assets = 0;
    this.statistics.webApps = 0;
    this.statistics.repos = 0;
    this.statistics.vulnerabilities = 0;
    this.statsProgressBarService.getProgressInfoData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.progressInfoData = data;
      });
  }

  ngOnDestroy() {
    this.alive = true;
  }

  ngOnChanges() {
    const a = this.statistics?.assets /
      (this.statistics?.assets + this.statistics?.repos + this.statistics?.webApps);
    this.assetPercent =  Math.round(a * 100);
    const w = this.statistics?.webApps /
      (this.statistics?.assets + this.statistics?.repos + this.statistics?.webApps);
    this.webPercent =  Math.round(w * 100 );
    const c = this.statistics?.repos /
      (this.statistics?.assets + this.statistics?.repos + this.statistics?.webApps);
    this.codePercent =  Math.round(c * 100);
  }
}
