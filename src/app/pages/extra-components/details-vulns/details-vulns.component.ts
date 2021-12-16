import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, ViewChildren} from '@angular/core';
import { ProgressInfo, StatsAssetsData } from '../../../@core/data/stats-asset';
import { takeWhile } from 'rxjs/operators';
import {StatsAssetService} from '../../../@core/service/stats-asset.service';
import {Vulnerability} from '../../../@core/Model/Vulnerability';

@Component({
  selector: 'ngx-details-vulns',
  styleUrls: ['./details-vulns.component.scss'],
  templateUrl: './details-vulns.component.html',
})
export class DetailsVulnsComponent implements OnDestroy {

  private alive = true;
  progressInfoData: ProgressInfo[];
  @ViewChild('vuln') vulnName: any;
  @ViewChildren('severity') vulnSeverity: any;
  @Input() vulns: Vulnerability[];

  constructor(private statsProgressBarService: StatsAssetService) {
    this.statsProgressBarService.getProgressInfoData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.progressInfoData = data;
      });
  }

  ngOnDestroy() {
    this.alive = true;
  }
}
