export class VulnStat {
  name: string;
  occurances: number;
}
export class ProjectStat {
  name: string;
  risk: number;
  vulnerabilities: number;
}
export class DashboardStat {
  critical: number;
  medium: number;
  low: number;
  projectStats: ProjectStat[];
  vulnStats: VulnStat[];
}
