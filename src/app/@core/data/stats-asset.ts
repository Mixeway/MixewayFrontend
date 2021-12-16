import { Observable } from 'rxjs';

export interface ProgressInfo {
  title: string;
  value: number;
  activeProgress: number;
  description: string;
}

export abstract class StatsAssetsData {
  abstract getProgressInfoData(): Observable<ProgressInfo[]>;
}
