import {Project} from './Project';

export class User {
  id: number;
  commonName: string;
  permisions: string;
  lastLoggedDate: Date;
  lastLoggedIp: string;
  enabled: boolean;
  logins: number;
  failedLogins: number;
  projects: Project[];
}
