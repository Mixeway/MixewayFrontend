export class Assets {
  autoInfraScan: boolean;
  assets: Asset[];
}

export class Asset {
  assetId: number;
  hostname: string;
  ipAddress: string;
  routingDomain: string;
  risk: number;
  running: boolean;
  project: Project;
  webAppAutoDiscver: boolean;
}
export class Project {
  id: number;
  name: string;
  enableVulnManage: boolean;
}
