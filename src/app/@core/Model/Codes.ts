import {Project} from './Asset';

export class Codes {
  codeAutoScan: boolean;
  codeModels: Code[];
}
export class Code {
  id: number;
  codeProject: CodeProject;
  risk: number;
  running: boolean;
}
export class CodeProject {
  id: number;
  codeGroup: CodeGroup;
  name: string;
  dTrackUuid: string;
  versionId: number;
  branch: string;
}
export class CodeGroup {
  name: string;
  id: number;
  project: Project;
}
