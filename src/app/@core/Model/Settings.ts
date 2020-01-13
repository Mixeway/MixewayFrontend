export class Settings {
  initialized: boolean;
  smtpAuth: boolean;
  smtpTls: boolean;
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  passwordAuth: string;
  certificateAuth: boolean;
  masterApiKey: string;
  infraAutoCron: string;
  webAppAutoCron: string;
  codeAutoCron: string;
}
