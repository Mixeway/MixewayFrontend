export class User {
  id: number;
  commonName: string;
  permissions: string;
  lastLoggedDate: Date;
  lastLoggedIp: string;
  enabled: boolean;
  logins: number;
  failedLogins: number;
}
