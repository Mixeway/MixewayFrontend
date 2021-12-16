import { Observable } from 'rxjs';

export interface ProgressInfo {
  title: string;
  value: number;
  activeProgress: number;
  description: string;
}

export abstract class StatsVulnData {
  abstract getProgressInfoData(): Observable<ProgressInfo[]>;
}
