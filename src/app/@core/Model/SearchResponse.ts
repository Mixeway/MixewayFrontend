import {Asset} from './Asset';
import {WebApp} from './WebApps';
import {CodeProject} from './Codes';

export class SearchResponse {
  assets: Asset[];
  webApps: WebApp[];
  codeProjects: CodeProject[];
  vulns: Vuln[];
}
export class Vuln {
  name: string;
  projectId: number;
  location: string;
  source: string;
}
