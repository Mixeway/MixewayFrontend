import {Vulnerability} from './Vulnerability';

export class DashboardTopStatistics {
  statisticCard: StatisticCard;
  projectVulnerabilityList: Vulnerability[];
}
export class StatisticCard {
  projects: number;
  assets: number;
  webApps: number;
  repos: number;
  vulnerabilities: number;
}
