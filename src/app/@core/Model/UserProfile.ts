export class UserProfile {
  username: string;
  projects: number;
  vulns: number;
  password: string;
  passwordAuthEnabled: boolean;
  constructor(username: string = '', projects: number = 0, vulns: number = 0,
              password: string = '', passwordAuthEnabled: boolean = false) {
    this.username = username;
    this.projects = projects;
    this.vulns = vulns;
    this.password = password;
    this.passwordAuthEnabled = passwordAuthEnabled;
  }
}
