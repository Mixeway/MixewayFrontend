export class VulnAnalyze {
  vulnerabilityName: string;
  type: string;
  severity: string;
  description: string;
  ipAddress: string;
  port: string;
  ipProtocol: string;
  baseURL: string;
  location: string;
  project: string;
  analysis: string;
  hostname: string;
  hostType: string;
  requirementCode: string;
  requirement: string;
  packetName: string;
  dateCreated: string;
  ciid: string;
  grade: number;
}
export class Vulnerabilities {
  vulnerabilities: VulnAnalyze[];
}
