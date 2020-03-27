import {Project} from './Asset';

export class WebApps {
  webAppAutoScan: boolean;
  webAppModels: WebApp[];
}
export class WebApp {
  id: number;
  url: string;
  publicScan: boolean;
  risk: number;
  running: boolean;
  project: Project;
  inQueue: boolean;
}
