import {Project} from './Asset';
import {RoutingDomain} from './RoutingDomain';

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
  routingDomain: RoutingDomain;
}
