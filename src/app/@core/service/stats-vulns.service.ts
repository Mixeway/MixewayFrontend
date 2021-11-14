import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { ProgressInfo, StatsVulnData } from '../data/stats-vuln';
import {StatsAssetsData} from '../data/stats-asset';

@Injectable()
export class StatsVulnsService extends StatsAssetsData {
  private progressInfoData: ProgressInfo[] = [
    {
      title: 'Today’s Profit',
      value: 572900,
      activeProgress: 70,
      description: 'Better than last week (70%)',
    },
    {
      title: 'New Orders',
      value: 6378,
      activeProgress: 30,
      description: 'Better than last week (30%)',
    },
    {
      title: 'New Comments',
      value: 200,
      activeProgress: 55,
      description: 'Better than last week (55%)',
    },
  ];

  getProgressInfoData(): Observable<ProgressInfo[]> {
    return observableOf(this.progressInfoData);
  }
}
