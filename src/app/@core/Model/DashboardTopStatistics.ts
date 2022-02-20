import {Vulnerability} from './Vulnerability';

export class DashboardTopStatistics {
  statisticCard: StatisticCard;
  projectVulnerabilityList: Vulnerability[];
}
export class StatisticCard {
  projects: number;
  scanRunning: number;
  scanInQueue: number;
  vulnerabilities: number;
}
